import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <AppRoutes />
        
      </ModalProvider>
    </Router>
  );
};

export default App;
