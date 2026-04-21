import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import FilterOrders from '../pages/FilterOrders';
import Stats from '../pages/Stats';

export default function AppRouter() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Orders Routes */}
          <Route path="/order" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/filter" element={<FilterOrders />} />

          {/* Stats Route */}
          <Route path="/stats" element={<Stats />} />

          {/* Default Route */}
          <Route path="/" element={<Orders />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
