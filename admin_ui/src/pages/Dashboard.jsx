import React from 'react';
import { Package, TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  // Changed to col-6 for 2-per-row on mobile, col-lg-3 for desktop
  <div className="col-6 col-lg-3">
    <div className="card border-0 shadow-sm rounded-4 p-3 h-100 transition-hover">
      <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
        <div className={`p-2 p-md-3 rounded-4 bg-${color} bg-opacity-10 text-${color} mb-2 mb-md-0 me-md-3`}>
          <Icon size={20} className="d-md-none" /> {/* Smaller icons for mobile */}
          <Icon size={24} className="d-none d-md-block" />
        </div>
        <div className="overflow-hidden w-100">
          <p className="text-muted extra-small text-uppercase fw-bold mb-1 mb-md-0" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{title}</p>
          <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: 'calc(1.1rem + 0.3vw)' }}>{value}</h4>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-black text-uppercase tracking-tighter m-0">Overview</h2>
          <p className="text-muted small mb-0 d-none d-sm-block">Real-time business insights</p>
        </div>
        <button className="btn btn-sm btn-outline-dark rounded-pill px-3 d-md-none">
          <TrendingUp size={14} className="me-1" /> Reports
        </button>
      </div>

      {/* Stats Grid: 2 columns on mobile, 4 on desktop */}
      <div className="row g-3 mb-4">
        <StatCard title="Inventory" value="124" icon={Package} color="primary" />
        <StatCard title="Revenue" value="₹45,200" icon={TrendingUp} color="success" />
        <StatCard title="Customers" value="12" icon={Users} color="info" />
        <StatCard title="Pending" value="5" icon={ShoppingBag} color="warning" />
      </div>
      
      {/* Analytics Placeholder */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
            <div>
              <div className="bg-light rounded-circle p-4 d-inline-block mb-3">
                <TrendingUp size={32} className="text-muted opacity-50" />
              </div>
              <h5 className="fw-bold">Sales Performance</h5>
              <p className="text-muted small mx-auto" style={{ maxWidth: '300px' }}>
                Interactive charts will appear here as your collection grows.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions Section */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white">
            <h6 className="fw-bold mb-3 text-uppercase small tracking-widest">Quick Actions</h6>
            <div className="d-grid gap-2">
              <button className="btn btn-light btn-sm fw-bold rounded-3 text-start d-flex align-items-center justify-content-between py-2">
                Update Stock <ArrowUpRight size={14} />
              </button>
              <button className="btn btn-outline-light btn-sm fw-bold rounded-3 text-start d-flex align-items-center justify-content-between py-2">
                View Orders <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .transition-hover:hover { transform: translateY(-3px); transition: 0.3s; }
      `}</style>
    </div>
  );
};

export default Dashboard;