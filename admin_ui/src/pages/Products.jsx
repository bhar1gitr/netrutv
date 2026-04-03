import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Loader2, Package } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://netrutv-server.onrender.com/api/products";
const IMG_BASE_URL = "https://netrutv-server.onrender.com";

// const API_URL = "http://localhost:5000/api/products";
// const IMG_BASE_URL = "http://localhost:5000";

const CATEGORY_MAP = {
  tshirts: ["Round Neck", "Polo", "Dry Fit", "Oversize Graphic", "Long Sleeve", "Sports", "Hoodie", "Stripped", "Henley", "Sleeve Less", "Drop Sholder", "Puff Print"],
  shirts: ["Classic", "Formal", "Denim", "Printed", "Mandarin Collar", "Linen", "Half Sleeve"],
  pants: ["Chinos", "Pull on Denim", "Jogger", "Trouser", "Baggy", "Cargo"],
  bags: ["Leather", "Backpack", "Laptop"]
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Main Form Data
  const [formData, setFormData] = useState({ 
    pid: '', name: '', price: '', type: '', sub: '', description: '', modelUrl: '' 
  });
  
  // Size-specific Stock State
  const [sizeData, setSizeData] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product._id);
      const { image, sizes, totalStock, ...rest } = product;
      setFormData(rest);
      // Ensure sizes are loaded correctly, default to 0 if missing
      setSizeData(sizes || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    } else {
      setEditingProduct(null);
      setFormData({ 
        pid: `NET-${Date.now().toString().slice(-6)}`, 
        name: '', price: '', type: '', sub: '', description: '', modelUrl: '' 
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
    // Append standard fields
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    // Append sizes as a JSON string for the backend to parse
    data.append('sizes', JSON.stringify(sizeData));

    if (imageFile) data.append('image', imageFile);

    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) { 
      console.error(err);
      alert("Save failed. Check console."); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently remove this item from inventory?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-black text-uppercase tracking-tighter m-0 display-6">Inventory</h2>
          <p className="text-muted small mb-0">Manage sizes and stock levels</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-dark px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center transition-all" style={{ minWidth: '200px' }}>
          <Plus size={18} className="me-2" /> ADD PRODUCT
        </button>
      </div>

      {/* Main Table Container */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom text-secondary small text-uppercase">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="transition-all">
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <img 
                        // src={item.image?.startsWith('http') ? item.image : `${IMG_BASE_URL}${item.image}`} 
                        src={item.image}
                        className="rounded-3 me-3 object-fit-cover bg-light border" 
                        style={{ width: '50px', height: '60px' }} 
                        alt="" 
                      />
                      <div>
                        <div className="fw-bold text-dark">{item.name}</div>
                        <div className="text-muted extra-small" style={{ fontSize: '0.65rem' }}>#{item.pid}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-dark-subtle text-dark border-0 me-1">{item.type}</span>
                    <span className="text-muted small d-block">{item.sub}</span>
                  </td>
                  <td className="fw-bold text-dark">₹{Number(item.price).toLocaleString()}</td>
                  <td>
                    <div className={`fw-medium d-flex align-items-center ${item.totalStock <= 5 ? 'text-danger' : 'text-success'}`}>
                      <Package size={14} className="me-1" /> {item.totalStock || 0} units
                    </div>
                    <div className="extra-small text-muted" style={{ fontSize: '0.65rem' }}>
                      S:{item.sizes?.S} M:{item.sizes?.M} L:{item.sizes?.L} XL:{item.sizes?.XL} 2XL:{item.sizes?.XXL}
                    </div>
                  </td>
                  <td className="text-end px-4">
                    <button onClick={() => openModal(item)} className="btn btn-sm btn-light border rounded-circle p-2 me-2 hover-shadow"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-light text-danger border rounded-circle p-2 hover-shadow"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block p-0 p-sm-3 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered m-0 m-sm-auto animate-slide-up" style={{ maxWidth: '800px' }}>
            <div className="modal-content border-0 h-100-mobile rounded-sm-4 shadow-lg overflow-hidden">
              <div className="bg-dark p-3 text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 text-uppercase fw-bold tracking-tight">Product Details</h6>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-sm text-white p-0 border-0"><X size={24}/></button>
              </div>
              
              <form onSubmit={handleSubmit} className="overflow-auto" style={{ maxHeight: '90vh' }}>
                <div className="modal-body p-4 row g-3">
                  {/* Image Upload */}
                  <div className="col-12">
                    <div className="border-2 border-dashed rounded-4 p-4 text-center bg-light position-relative hover-bg-gray transition-all" style={{ border: '2px dashed #cbd5e1' }}>
                      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="position-absolute w-100 h-100 top-0 start-0 opacity-0 cursor-pointer" />
                      <Upload className="text-muted mb-2" size={24} />
                      <p className="small mb-0 fw-bold text-secondary">{imageFile ? imageFile.name : "Tap to Change Product Photo"}</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">NAME</label>
                    <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control bg-light border-0 py-2" required />
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">PRICE (₹)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="form-control bg-light border-0 py-2" required />
                  </div>

                  {/* Size Inventory Section */}
                  <div className="col-12">
                    <div className="p-3 rounded-4 border bg-white shadow-sm mt-2">
                      <label className="form-label small fw-bold text-dark text-uppercase mb-3 d-block border-bottom pb-2">Size-wise Stock Inventory</label>
                      <div className="row g-2 text-center">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                          <div key={size} className="col">
                            <label className="extra-small fw-bold text-muted mb-1 d-block">{size}</label>
                            <input 
                              type="number" 
                              value={sizeData[size]} 
                              onChange={(e) => handleSizeChange(size, e.target.value)}
                              className="form-control text-center bg-light border-0 py-2"
                              min="0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">CATEGORY</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, sub: ''})} className="form-select bg-light border-0 py-2" required>
                      <option value="">Select Category</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">SUB CATEGORY</label>
                    <select value={formData.sub} onChange={(e) => setFormData({...formData, sub: e.target.value})} className="form-select bg-light border-0 py-2" disabled={!formData.type} required>
                      <option value="">Select Style</option>
                      {formData.type && CATEGORY_MAP[formData.type].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">DESCRIPTION</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="form-control bg-light border-0 py-2" rows="3"></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="submit" disabled={isSubmitting} className="btn btn-dark w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center shadow-lg transition-all">
                    {isSubmitting ? <Loader2 size={20} className="animate-spin me-2" /> : null}
                    {editingProduct ? 'SAVE CHANGES' : 'PUBLISH PRODUCT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .transition-all { transition: all 0.2s ease-in-out; }
        .hover-shadow:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .extra-small { font-size: 0.7rem; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .hover-bg-gray:hover { background-color: #f8fafc !important; }
        .form-control:focus, .form-select:focus { box-shadow: none; border: 1px solid #000; }
        @media (max-width: 576px) { .h-100-mobile { height: 100vh !important; border-radius: 0 !important; } }
      `}</style>
    </div>
  );
};

export default Products;