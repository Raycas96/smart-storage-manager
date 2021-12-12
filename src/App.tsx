import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ItemView from './pages/ItemView';
import { themeOptions } from './utils/utility';

const App = () => (
  <div className="App">
    <Header />
    <ThemeProvider theme={themeOptions}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ItemView />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  </div>
);

export default App;
