// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VisualizerProvider } from './context/VisualizerContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';

const App = () => {
  return (
    <Router>
      <VisualizerProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visualizer" element={<Visualizer />} />
          </Routes>
        </MainLayout>
      </VisualizerProvider>
    </Router>
  );
};

export default App;