import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PGDetails from './pages/PGDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pg/:id" element={<PGDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;