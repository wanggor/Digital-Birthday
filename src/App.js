import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CelebrationScreen from './components/CelebrationScreen';
import BulbScreen from './components/BulbScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CelebrationScreen />} />
        <Route path="/bulbs" element={<BulbScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
