import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 페이지들 import
import ManuscriptCreatePage from './pages/ManuscriptCreatePage';
import ManuscriptEditPage from './pages/ManuscriptEditPage';
import MainPage from './pages/MainPage';
import PointChargePage from './pages/PointChargePage';
import BookRentalPage from './pages/BookRentalPage';
import AuthorRegisterPage from './pages/AuthorRegisterPage';
import SignupPage from './pages/SignupPage';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/charge" element={<PointChargePage />} />
        <Route path="/rent/:bookId" element={<BookRentalPage />} />
        <Route path="/register" element={<AuthorRegisterPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/manuscripts/create" element={<ManuscriptCreatePage />} />
        <Route path="/manuscripts/edit/:bookId" element={<ManuscriptEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
