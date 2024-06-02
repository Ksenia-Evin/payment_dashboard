import React from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateRangePicker = (props) => {
    const { startDate, endDate, onChangeStartDate, onChangeEndDate }  = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Box sx={{ display: 'flex', gap: 10}}>
            <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onChangeStartDate}
            />
            <DatePicker
            label="End Date"
            value={endDate}
            onChange={onChangeEndDate}
            />
        </Box>
      </LocalizationProvider>
       
    );
};

export default DateRangePicker;
