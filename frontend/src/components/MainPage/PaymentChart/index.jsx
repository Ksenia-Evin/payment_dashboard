import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const PaymentChart = ({ paymentsData, selectedStore }) => {
    const stores = selectedStore === 'all'
    ? Object.keys(paymentsData[0]|| {}).filter(key => key !== 'payment_date')
    : [selectedStore];

    const totalProfit = paymentsData.reduce((total, dataPoint) => {
        stores.forEach(store => {
          if (dataPoint[store]) {
            total[store] = (total[store] || 0) + dataPoint[store];
            total.total += dataPoint[store];
          }
        });
        return total;
    }, { total: 0 });

  return (
    <div>
        <div>
        <h3>Total Profit: {totalProfit.total}</h3>
        {stores.map((store, index) => (
            <div key={index}>
              <p>{store} Profit: {totalProfit[store]}</p>
            </div>
        ))}
        </div>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart
            data={paymentsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="payment_date" tickFormatter={(tick) => dayjs(tick).format('YYYY-MM-DD')} />
            <YAxis />
            <Tooltip labelFormatter={(label) => dayjs(label).format('YYYY-MM-DD')} />
            <Legend />
            {stores.map((store, index) => (
                <Line
                    key={index}
                    type="monotone"
                    dataKey={store}
                    name={store}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    activeDot={{ r: 8 }}
                />
            ))}
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default PaymentChart;
