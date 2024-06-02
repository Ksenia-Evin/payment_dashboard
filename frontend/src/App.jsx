import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Payment Schedule Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <MainPage />
    </div>
  );
};

export default App;