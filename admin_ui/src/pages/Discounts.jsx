import React, { useState, useEffect } from 'react';
import {
    Tag, Plus, Trash2, Calendar, Percent,
    Ticket, Loader2, Info, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const API_URL = "https://netrutv-server.onrender.com/api/discounts";

const Discounts = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        value: '',
        expiryDate: ''
    });

    const fetchDiscounts = async () => {
        try {
            const res = await axios.get(API_URL);
            setDiscounts(res.data);
        } catch (err) {
            console.error("Discount Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDiscounts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(API_URL, formData);
            // Reset form on success
            setFormData({ code: '', discountType: 'percentage', value: '', expiryDate: '' });
            fetchDiscounts();
        } catch (err) {
            alert(err.response?.data?.msg || "Error creating code");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently retire this discount code? This will remove it from all linked products.")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchDiscounts();
            } catch (err) {
                alert("Delete failed.");
            }
        }
    };

    return (
        <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
            {/* Header */}
            <div className="mb-5">
                <h2 className="fw-black text-uppercase tracking-tighter mb-1 display-6">Promotions</h2>
                <p className="text-secondary small uppercase tracking-widest fw-bold opacity-75">
                    Campaign Master Registry
                </p>
            </div>

            <div className="row g-4">
                {/* CREATE SECTION */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '20px', zIndex: 10 }}>
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-dark text-white p-2 rounded-3 me-3">
                                <Plus size={20} />
                            </div>
                            <h6 className="fw-black text-uppercase small m-0 tracking-widest">New Campaign</h6>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="extra-small fw-black text-muted uppercase mb-2 d-block">Coupon Code</label>
                                <input
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    className="form-control bg-light border-0 py-3 font-monospace fw-bold"
                                    placeholder="E.G. NETRUTV20"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="extra-small fw-black text-muted uppercase mb-2 d-block">Reward Logic</label>
                                <select
                                    value={formData.discountType}
                                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                    className="form-select bg-light border-0 py-3 fw-medium"
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (₹)</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="extra-small fw-black text-muted uppercase mb-2 d-block">Value</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-light text-muted">
                                        {formData.discountType === 'percentage' ? <Percent size={14} /> : '₹'}
                                    </span>
                                    <input
                                        type="number" value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                        className="form-control bg-light border-0 py-3"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="extra-small fw-black text-muted uppercase mb-2 d-block">Expiries On</label>
                                <input
                                    type="date" value={formData.expiryDate}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                    className="form-control bg-light border-0 py-3"
                                    required
                                />
                            </div>

                            <button disabled={isSubmitting} className="btn btn-dark w-100 py-3 rounded-pill fw-black tracking-widest shadow-lg transition-all hover-lift">
                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "ACTIVATE CAMPAIGN"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* LIST SECTION */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="p-4 bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-black text-uppercase small m-0 tracking-widest">Active Archives</h6>
                            <span className="badge bg-light text-dark rounded-pill px-3 border">{discounts.length} Codes</span>
                        </div>

                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="bg-light text-secondary extra-small fw-black uppercase font-monospace">
                                    <tr>
                                        <th className="px-4 py-3">Reference</th>
                                        <th>Logic</th>
                                        <th>Value</th>
                                        <th>Status</th>
                                        <th className="text-end px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5">
                                                <Loader2 size={30} className="animate-spin text-muted mx-auto" />
                                            </td>
                                        </tr>
                                    ) : discounts.map((d) => (
                                        <tr key={d._id} className="border-bottom-0 hover-bg-light transition-all">
                                            <td className="px-4 py-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-2 me-3">
                                                        <Ticket size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="fw-black font-monospace text-dark d-block">{d.code}</span>
                                                        <span className="extra-small text-muted uppercase font-bold tracking-tighter">
                                                            Exp: {new Date(d.expiryDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-zinc-100 text-zinc-600 text-uppercase extra-small px-2 py-1 border fw-bold">
                                                    {d.discountType}
                                                </span>
                                            </td>
                                            <td className="px-3" style={{ color: '#000000', fontWeight: '900' }}>
                                                {String(d.discountType).trim() === 'percentage'
                                                    ? `${d.value}%`
                                                    : `₹${Number(d.value).toLocaleString()}`
                                                }
                                            </td>
                                            <td>
                                                {new Date(d.expiryDate) > new Date() ? (
                                                    <span className="text-success extra-small fw-bold d-flex align-items-center gap-1">
                                                        <div className="rounded-circle bg-success" style={{ width: '6px', height: '6px' }}></div> ACTIVE
                                                    </span>
                                                ) : (
                                                    <span className="text-danger extra-small fw-bold d-flex align-items-center gap-1">
                                                        <AlertCircle size={10} /> EXPIRED
                                                    </span>
                                                )}
                                            </td>
                                            <td className="text-end px-4">
                                                <button onClick={() => handleDelete(d._id)} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && discounts.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted small italic">
                                                No active campaigns found. Start by generating a code.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .extra-small { font-size: 0.65rem; }
        .fw-black { font-weight: 900; }
        .tracking-widest { letter-spacing: 0.15em; }
        .hover-lift:hover { transform: translateY(-2px); }
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .font-monospace { font-family: 'JetBrains Mono', 'Courier New', monospace; }
      `}</style>
        </div>
    );
};

export default Discounts;