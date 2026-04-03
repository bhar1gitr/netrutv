import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, UserCheck, Shield, ShoppingBag, Loader2 } from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://netrutv-server.onrender.com/api/auth/all-users');
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid py-2">
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-black text-dark text-uppercase tracking-tighter mb-1">Leader Management</h2>
          <p className="text-secondary small uppercase tracking-widest fw-bold">Monitoring community engagement & narratives</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-4 shadow-sm border border-light d-flex align-items-center">
          <UserCheck size={24} className="text-primary me-3" />
          <div>
            <div className="text-secondary small fw-bold uppercase tracking-tighter">Active Leaders</div>
            <div className="h4 mb-0 fw-black">{users.length}</div>
          </div>
        </div>
      </div>

      {/* ACTIVITY TABLE */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 py-4 px-4">
          <h6 className="mb-0 fw-black text-uppercase tracking-widest small">User Activity Feed</h6>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0 text-secondary small uppercase tracking-widest">Member Details</th>
                <th className="py-3 border-0 text-secondary small uppercase tracking-widest">Reviewed Pieces</th>
                <th className="py-3 border-0 text-secondary small uppercase tracking-widest">Auth Status</th>
                <th className="py-3 border-0 text-secondary small uppercase tracking-widest text-end px-4">Joined Archive</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <Loader2 className="animate-spin text-primary mx-auto mb-2" />
                    <span className="text-muted small uppercase tracking-widest font-monospace">Syncing Data...</span>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-bottom border-light">
                    {/* MEMBER INFO */}
                    <td className="px-4 py-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '40px', height: '40px', fontSize: '14px', fontWeight: '900' }}>
                          {user.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{user.fullName}</div>
                          <div className="text-muted small font-monospace">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* REVIEWED PIECES - THE NEW DYNAMIC SECTION */}
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {user.reviewedProducts?.length > 0 ? (
                          user.reviewedProducts.map((prod) => (
                            <div key={prod._id} className="d-flex align-items-center bg-light border rounded-2 px-2 py-1">
                               <ShoppingBag size={10} className="me-1 text-primary" />
                               <span className="text-dark small fw-bold tracking-tighter" style={{ fontSize: '10px' }}>
                                 {prod.name}
                               </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-zinc-400 small italic opacity-50">No activity yet</span>
                        )}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 rounded-pill px-3 py-2 small fw-bold uppercase tracking-tighter">
                        Verified Member
                      </span>
                    </td>

                    {/* JOINED DATE */}
                    <td className="text-end px-4 text-secondary small font-monospace">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;