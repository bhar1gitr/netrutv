import React from 'react';
import { Package, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="col-md-3">
    <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
      <div className="d-flex align-items-center">
        <div className={`p-3 rounded-4 bg-${color} bg-opacity-10 text-${color} me-3`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-muted small mb-0">{title}</p>
          <h4 className="fw-bold mb-0">{value}</h4>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <h2 className="fw-bold mb-4">Netrutv Overview</h2>
      <div className="row g-4 mb-5">
        <StatCard title="Total Products" value="124" icon={Package} color="primary" />
        <StatCard title="Total Sales" value="₹45,200" icon={TrendingUp} color="success" />
        <StatCard title="New Customers" value="12" icon={Users} color="info" />
        <StatCard title="Pending Orders" value="5" icon={ShoppingBag} color="warning" />
      </div>
      
      <div className="card border-0 shadow-sm rounded-4 p-4 text-center py-5">
        <p className="text-muted mb-0">Sales analytics chart will be integrated here.</p>
      </div>
    </div>
  );
};

export default Dashboard;