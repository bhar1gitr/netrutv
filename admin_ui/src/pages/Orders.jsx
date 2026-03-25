import React from 'react';
import { ShoppingBag, Clock } from 'lucide-react';

const Orders = () => {
  return (
    <div className="container-fluid p-0">
      <h2 className="fw-black text-uppercase tracking-tighter mb-4">Customer Orders</h2>
      
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="p-4 p-md-5 text-center">
          <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-4 d-inline-block mb-4">
            <ShoppingBag size={48} />
          </div>
          
          <h4 className="fw-bold text-dark mb-2">Order Tracking System</h4>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '450px' }}>
            We are currently finalizing the <strong>WhatsApp Concierge Integration</strong>. Once active, all orders placed via the website will appear here for management.
          </p>
          
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <div className="alert alert-light border d-inline-flex align-items-center justify-content-center mb-0 px-4 rounded-pill">
              <Clock size={16} className="me-2 text-primary" />
              <span className="small fw-bold text-uppercase tracking-wide">Flow: Web → WhatsApp → Dashboard</span>
            </div>
          </div>
        </div>
        
        {/* Decorative footer for the empty state */}
        <div className="bg-light p-3 border-top text-center">
          <span className="extra-small text-muted text-uppercase fw-bold">System Status: Waiting for first order</span>
        </div>
      </div>
      
      <style>{`
        .fw-black { font-weight: 900; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .extra-small { font-size: 0.7rem; }
      `}</style>
    </div>
  );
};

export default Orders;