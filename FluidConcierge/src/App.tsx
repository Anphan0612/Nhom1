import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import PlanTrip from './pages/PlanTrip';
import Itinerary from './pages/Itinerary';
import Places from './pages/admin/Places';
import Users from './pages/admin/Users';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/itinerary/:id" element={<Itinerary />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="places" replace />} />
          <Route path="places" element={<Places />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
