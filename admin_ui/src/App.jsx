import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users as UsersIcon, Activity, Tag } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users'; // Import the new page
import Discounts from './pages/Discounts'; // Import the new page

const SidebarItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li className="nav-item w-100 mb-2">
      <Link 
        to={to} 
        className={`nav-link align-middle px-3 py-2 rounded-3 transition-all ${
          isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary border-0 hover:bg-secondary hover:bg-opacity-10'
        }`}
      >
        <Icon size={18} className="me-2" /> 
        <span className="d-none d-sm-inline fw-medium small tracking-wider uppercase">
          {label}
        </span>
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
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white shadow-lg border-end border-secondary border-opacity-10">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 min-vh-100 sticky-top">
              <div className="mb-5 d-flex align-items-center">
                <div className="bg-primary p-2 rounded-3 me-2 shadow-primary">
                  <Activity size={20} className="text-white" />
                </div>
                <h5 className="mb-0 d-none d-sm-inline fw-black tracking-tighter text-uppercase">
                  Netrutv Console
                </h5>
              </div>
              
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100">
                <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem to="/products" icon={Package} label="Products" />
                <SidebarItem to="/orders" icon={ShoppingCart} label="Orders" />
                {/* NEW NAVIGATION LINK */}
                <SidebarItem to="/users" icon={UsersIcon} label="Users & Actions" />
                <SidebarItem to="/discounts" icon={Tag} label="Discounts" />
              </ul>
            </div>
          </div>

          {/* Page Content */}
          <div className="col py-4 px-md-5 bg-light bg-opacity-50">
            <div className="max-w-screen-xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/discounts" element={<Discounts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;