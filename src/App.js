import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ManuscriptCreatePage from './pages/ManuscriptCreatePage';
import ManuscriptEditPage from './pages/ManuscriptEditPage';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Routes>
          <Route path="/manuscripts/create" element={<ManuscriptCreatePage />} />
          <Route path="/manuscripts/edit/:bookId" element={<ManuscriptEditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
