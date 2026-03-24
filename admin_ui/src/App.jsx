import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';

const SidebarItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className="nav-item w-100 mb-2">
      <Link to={to} className={`nav-link align-middle px-3 ${isActive ? 'bg-primary text-white active' : 'text-secondary'}`}>
        <Icon size={20} className="me-2" /> <span className="d-none d-sm-inline">{label}</span>
      </Link>
    </li>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container-fluid g-0">
        <div className="row g-0" style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white shadow">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 min-vh-100 sticky-top">
              <h4 className="mb-4 d-none d-sm-inline fw-bold tracking-tight text-uppercase">Netrutv</h4>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100">
                <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem to="/products" icon={Package} label="Products" />
                <SidebarItem to="/orders" icon={ShoppingCart} label="Orders" />
              </ul>
            </div>
          </div>

          {/* Page Content */}
          <div className="col py-4 px-md-5 bg-light">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;