import React, { useState, useEffect } from 'react';
import { 
  Plus, Pencil, Trash2, X, Upload, Loader2, 
  Package, Star, MessageSquare, ChevronDown, ChevronUp, Tag 
} from 'lucide-react';
import axios from 'axios';

const API_URL = "https://netrutv-server.onrender.com/api/products";
const DISCOUNT_API = "https://netrutv-server.onrender.com/api/discounts";
  
const CATEGORY_MAP = {
  tshirts: ["Round Neck", "Polo", "Dry Fit", "Oversize Graphic", "Long Sleeve", "Sports", "Hoodie", "Stripped", "Henley", "Sleeve Less", "Drop Sholder", "Puff Print"],
  shirts: ["Classic", "Formal", "Denim", "Printed", "Mandarin Collar", "Linen", "Half Sleeve"],
  pants: ["Chinos", "Pull on Denim", "Jogger", "Trouser", "Baggy", "Cargo"],
  bags: ["Leather", "Backpack", "Laptop"]
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allDiscounts, setAllDiscounts] = useState([]); // To store available codes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);

  const [formData, setFormData] = useState({ 
    pid: '', name: '', price: '', type: '', sub: '', description: '', modelUrl: '', discount: '' 
  });
  const [sizeData, setSizeData] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });

  const fetchData = async () => {
    try {
      const [prodRes, discRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(DISCOUNT_API)
      ]);
      setProducts(prodRes.data);
      setAllDiscounts(discRes.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product._id);
      const { image, sizes, reviews, totalStock, discount, ...rest } = product;
      setFormData({ ...rest, discount: discount?._id || "" });
      setSizeData(sizes || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    } else {
      setEditingProduct(null);
      setFormData({ 
        pid: `NET-${Date.now().toString().slice(-6)}`, 
        name: '', price: '', type: '', sub: '', description: '', modelUrl: '', discount: ''
      });
      setSizeData({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSizeChange = (size, value) => {
    setSizeData(prev => ({ ...prev, [size]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
        // Ensure null is sent if no discount is selected
        const value = (key === 'discount' && !formData[key]) ? "" : formData[key];
        data.append(key, value);
    });
    data.append('sizes', JSON.stringify(sizeData));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) { alert("Save failed."); } finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently remove this item?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    }
  };

  // Helper to calculate sale price
  const getSalePrice = (price, discount) => {
    if (!discount) return price;
    if (discount.discountType === 'percentage') return price - (price * discount.value / 100);
    return price - discount.value;
  };

  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-black text-uppercase tracking-tighter m-0 display-6">Inventory</h2>
          <p className="text-muted small mb-0 font-monospace uppercase">Luxury Stock Management</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-dark px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center">
          <Plus size={18} className="me-2" /> ADD PRODUCT
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="bg-white border-bottom text-secondary small text-uppercase font-monospace">
              <tr>
                <th className="px-4 py-3">Piece Details</th>
                <th>Category</th>
                <th>Price / Sale</th>
                <th>Stock Units</th>
                <th>Narratives</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="border-bottom-0">
                    <td className="px-4">
                      <div className="d-flex align-items-center">
                        <img src={item.image} className="rounded-2 me-3 border" style={{ width: '50px', height: '65px', objectFit: 'cover' }} alt="" />
                        <div>
                          <div className="fw-bold text-dark">{item.name}</div>
                          <div className="text-muted extra-small font-monospace">#{item.pid}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-dark text-white rounded-1 mb-1 extra-small uppercase tracking-widest">{item.type}</span>
                      <span className="text-muted small d-block font-serif italic">{item.sub}</span>
                    </td>
                    <td>
                      {item.discount ? (
                        <div>
                          <div className="text-muted text-decoration-line-through extra-small">₹{item.price}</div>
                          <div className="fw-bold text-primary">₹{getSalePrice(item.price, item.discount).toLocaleString()}</div>
                          <span className="badge bg-primary bg-opacity-10 text-primary p-1 mt-1 extra-small font-monospace uppercase">
                            <Tag size={8} className="me-1" />{item.discount.code}
                          </span>
                        </div>
                      ) : (
                        <div className="fw-bold text-dark">₹{item.price?.toLocaleString()}</div>
                      )}
                    </td>
                    <td>
                      <div className={`fw-medium d-flex align-items-center ${item.totalStock <= 5 ? 'text-danger' : 'text-success'}`}>
                        <Package size={14} className="me-1" /> {item.totalStock || 0}
                      </div>
                      <div className="extra-small text-muted font-monospace opacity-50">
                        S:{item.sizes?.S} M:{item.sizes?.M} L:{item.sizes?.L} XL:{item.sizes?.XL} 2XL:{item.sizes?.XXL}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => setExpandedProduct(expandedProduct === item._id ? null : item._id)}
                        className={`btn btn-sm d-flex align-items-center gap-2 rounded-pill px-3 transition-all ${item.reviews?.length > 0 ? 'btn-outline-primary border-primary' : 'btn-outline-secondary opacity-25 disabled'}`}>
                        <MessageSquare size={12} /> <span className="fw-bold">{item.reviews?.length || 0}</span>
                      </button>
                    </td>
                    <td className="text-end px-4">
                      <button onClick={() => openModal(item)} className="btn btn-sm btn-light border rounded-circle p-2 me-2"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-light text-danger border rounded-circle p-2"><Trash2 size={15} /></button>
                    </td>
                  </tr>

                  {/* COLLAPSIBLE REVIEWS */}
                  {expandedProduct === item._id && (
                    <tr className="bg-light animate-fade-in">
                      <td colSpan="6" className="p-0 border-0">
                        <div className="p-4 mx-4 mb-3 rounded-4 bg-white shadow-sm border-start border-4 border-primary">
                          <h6 className="text-uppercase fw-black small text-primary mb-3 tracking-widest">Public Narratives</h6>
                          <div className="row g-3">
                            {item.reviews.map((rev, idx) => (
                              <div key={idx} className="col-md-6 border-bottom border-light pb-2">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <span className="fw-black extra-small text-dark uppercase">{rev.name}</span>
                                  <div className="d-flex text-warning">
                                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={8} className="fill-warning" />)}
                                  </div>
                                </div>
                                <p className="text-muted extra-small italic font-serif mb-0">"{rev.comment}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Entry Modal */}
      {isModalOpen && (
        <div className="modal show d-block p-2 p-md-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              <div className="bg-dark p-3 text-white d-flex justify-content-between align-items-center">
                <span className="text-uppercase fw-black small tracking-widest">Master Entry Console</span>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-sm text-white p-0"><X size={24}/></button>
              </div>
              
              <form onSubmit={handleSubmit} className="overflow-auto" style={{ maxHeight: '85vh' }}>
                <div className="modal-body p-4 row g-3">
                  <div className="col-12">
                    <div className="border-2 border-dashed rounded-4 p-4 text-center bg-light position-relative hover-bg-white transition-all border-zinc-300">
                      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="position-absolute w-100 h-100 top-0 start-0 opacity-0 cursor-pointer" />
                      <Upload className="text-muted mb-1" size={24} />
                      <p className="extra-small mb-0 fw-bold text-secondary uppercase tracking-widest">
                        {imageFile ? imageFile.name : "Upload Creative Asset"}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="extra-small fw-black text-muted uppercase tracking-widest mb-2">Piece Name</label>
                    <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control bg-light border-0 py-3" required />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="extra-small fw-black text-muted uppercase tracking-widest mb-2">Original Price (₹)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="form-control bg-light border-0 py-3" required />
                  </div>

                  {/* PROMOTION DROPDOWN */}
                  <div className="col-12">
                    <label className="extra-small fw-black text-primary uppercase tracking-widest mb-2">Apply Active Discount</label>
                    <select 
                        value={formData.discount} 
                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        className="form-select bg-primary bg-opacity-10 border-0 py-3 text-primary fw-bold"
                    >
                        <option value="">No Discount Applied</option>
                        {allDiscounts.map(d => (
                            <option key={d._id} value={d._id}>
                                {d.code} — ({d.discountType === 'percentage' ? `${d.value}%` : `₹${d.value}`} OFF)
                            </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-12 bg-light p-3 rounded-4 border my-3">
                    <label className="extra-small fw-black text-dark uppercase tracking-widest mb-3 d-block">Size Distribution</label>
                    <div className="row g-2 text-center">
                      {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <div key={size} className="col">
                          <label className="extra-small fw-bold text-muted mb-1 d-block">{size}</label>
                          <input type="number" value={sizeData[size]} onChange={(e) => handleSizeChange(size, e.target.value)} className="form-control text-center border-0 py-2" min="0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="extra-small fw-black text-muted uppercase tracking-widest mb-2">Category</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, sub: ''})} className="form-select bg-light border-0 py-3" required>
                      <option value="">Select Category</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="extra-small fw-black text-muted uppercase tracking-widest mb-2">Sub-Category</label>
                    <select value={formData.sub} onChange={(e) => setFormData({...formData, sub: e.target.value})} className="form-select bg-light border-0 py-3" disabled={!formData.type} required>
                      <option value="">Select Style</option>
                      {formData.type && CATEGORY_MAP[formData.type].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="submit" disabled={isSubmitting} className="btn btn-dark w-100 py-3 rounded-pill fw-black uppercase tracking-widest shadow-lg">
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : editingProduct ? 'COMMIT CHANGES' : 'PUBLISH PIECE'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fw-black { font-weight: 900; }
        .extra-small { font-size: 0.65rem; }
        .transition-all { transition: all 0.3s ease; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Products;