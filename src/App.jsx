import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import CareerExplorer from './pages/CareerExplorer';
import CareerRoadmap from './pages/CareerRoadmap';
import Simulation from './pages/Simulation';
import Roadmap from './pages/Roadmap';
import Comparison from './pages/Comparison';
import AIMentor from './pages/AIMentor';
import FutureTrends from './pages/FutureTrends';
import UserDashboard from './pages/UserDashboard';

import AnimatedCursor from './components/AnimatedCursor';

function App() {
  return (
    <Router>
      <AnimatedCursor />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="explorer" element={<CareerExplorer />} />
          <Route path="simulation/:id" element={<Simulation />} />
          <Route path="career/:id" element={<CareerRoadmap />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="comparison" element={<Comparison />} />
          <Route path="mentor" element={<AIMentor />} />
          <Route path="trends" element={<FutureTrends />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
