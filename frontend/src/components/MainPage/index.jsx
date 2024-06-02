import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import FilterBar from './FilterBar';
import PaymentChart from './PaymentChart';

const MainPage = () => {
  const [data, setData] = useState({});
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [storeNames, setStoreNames] = useState([]);
  const [startDate, setStartDate] = useState(dayjs('2021-01-01'));
  const [endDate, setEndDate] = useState(dayjs('2026-12-31'));
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get_dataset')
      .then(response => {
        setData(response.data);
        const defaultProperty = Object.keys(response.data)[0];
        setSelectedProperty(defaultProperty);
        const newStoreNames = Object.keys(response.data[defaultProperty]);
        setStoreNames(['all', ...newStoreNames]);
        setSelectedStore('all');
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handlePropertyChange = (event) => {
    const selectedProperty = event.target.value;
    setSelectedProperty(selectedProperty);
    setSelectedStore('all');
    setStoreNames(['all', ...Object.keys(data[selectedProperty])]);
  };

  const handleStoreChange = (event) => {
    const selectedStore = event.target.value;
    setSelectedStore(selectedStore);
  };

  useEffect(() => {
    let newPaymentsData = {};
    if (selectedStore === 'all') {
      Object.keys(data[selectedProperty] || {}).forEach(store => {
        data[selectedProperty][store].forEach(obj => {
          const paymentDate = dayjs(obj.payment_date).format('YYYY-MM-DD');
          if (!newPaymentsData[paymentDate]) {
            newPaymentsData[paymentDate] = { payment_date: paymentDate };
          }
          newPaymentsData[paymentDate][store] = obj.amount;
        });
      });
    } else {
      data[selectedProperty]?.[selectedStore]?.forEach(obj => {
        const paymentDate = dayjs(obj.payment_date).format('YYYY-MM-DD');
        if (!newPaymentsData[paymentDate]) {
          newPaymentsData[paymentDate] = { payment_date: paymentDate };
        }
        newPaymentsData[paymentDate][selectedStore] = obj.amount;
      });
    }
    
    const filteredPaymentsData = Object.values(newPaymentsData).filter(item => {
      const paymentDate = dayjs(item.payment_date);
      return paymentDate.isAfter(startDate.subtract(1, 'day')) && paymentDate.isBefore(endDate.add(1, 'day'));;
    });
    
    setPaymentsData(filteredPaymentsData);
  }, [data, selectedProperty, selectedStore, startDate, endDate]);

  return (
    <Container maxWidth="lg">
      <FilterBar
        propertyNames={Object.keys(data)}
        selectedProperty={selectedProperty}
        onPropertyChange={handlePropertyChange}
        storeNames={storeNames}
        selectedStore={selectedStore}
        onStoreChange={handleStoreChange}
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
      />
      <PaymentChart paymentsData={paymentsData} selectedStore={selectedStore} />
    </Container>
  );
};

export default MainPage;
