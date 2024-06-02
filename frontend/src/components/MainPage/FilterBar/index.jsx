import React from 'react';
import { styled } from '@mui/system';
import { Box, Select, MenuItem } from '@mui/material';
import DateRangePicker from '../DateRangePicker';

const StyledSelect = styled(Select)({
    width: 200,
    height: 55
});
  

const FilterBar = (props) => {
    const {
        propertyNames,
        selectedProperty,
        onPropertyChange,
        storeNames,
        selectedStore,
        onStoreChange,
        startDate,
        onChangeStartDate,
        endDate,
        onChangeEndDate,
      } = props;

    return (
        <Box mt={4} sx={{ display: 'flex', gap: 10}}>
        <StyledSelect value={selectedProperty} onChange={onPropertyChange}>
            {propertyNames.map((propertyName, index) => (
                <MenuItem key={index} value={propertyName}>{propertyName}</MenuItem>
            ))}
        </StyledSelect>
        <StyledSelect value={selectedStore} onChange={onStoreChange}>
            {storeNames.map((storeName, index) => (
                <MenuItem key={index} value={storeName}>{storeName}</MenuItem>
            ))}
        </StyledSelect>
        <DateRangePicker 
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            />
        </Box>
    );
};

export default FilterBar;
