import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Header from './components/Header';
import ValuesTab from './components/ValuesTab';

const App = () => (
    <div className="App">
        <Header />
        <ValuesTab />
    </div>
);

export default App;
