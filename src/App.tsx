import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, MemoryRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ValuesTab from './components/ValuesTab';

const App = () => (
    <div className="App h-100">
        <Header />
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<ValuesTab />} />
            </Routes>
        </MemoryRouter>
    </div>
);

export default App;
