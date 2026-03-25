import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Box, Upload, AlertCircle, ShoppingBag } from 'lucide-react';
import axios from 'axios';

// const API_URL = "http://localhost:5000/api/products";
// const IMG_BASE_URL = "http://localhost:5000/";

const API_URL = "https://netrutv-server.onrender.com/api/products"
const IMG_BASE_URL = "https://netrutv-server.onrender.com/"

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
  const [formData, setFormData] = useState({ 
    pid: '', name: '', price: '', type: '', sub: '', stock: '0', description: '', modelUrl: '' 
  });

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
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ 
        pid: `NET-${Date.now().toString().slice(-6)}`, 
        name: '', price: '', type: '', sub: '', stock: '0', description: '', modelUrl: '' 
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingProduct) await axios.put(`${API_URL}/${editingProduct}`, data);
      else await axios.post(API_URL, data);
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) { alert("Error saving product."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this item?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
      {/* Header Area */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div className="flex-grow-1">
          <h2 className="fw-black text-uppercase tracking-tighter m-0 display-6">Inventory</h2>
          <p className="text-muted small mb-0">Manage your luxury collection</p>
        </div>
        {/* Fixed Width Button for Desktop, Auto for Mobile */}
        <button 
          onClick={() => openModal()} 
          className="btn btn-dark px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center"
          style={{ minWidth: '200px' }}
        >
          <Plus size={18} className="me-2" /> ADD PRODUCT
        </button>
      </div>

      {/* Responsive Table / Card Container */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Desktop View (Visible on MD and up) */}
        <div className="d-none d-md-block">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom text-secondary small text-uppercase">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image.startsWith('http') ? item.image : `${IMG_BASE_URL}${item.image}`} 
                        className="rounded-3 me-3 object-fit-cover bg-light border" 
                        style={{ width: '50px', height: '60px' }} 
                        alt="" 
                      />
                      <div>
                        <div className="fw-bold text-dark">{item.name}</div>
                        <div className="text-muted extra-small" style={{ fontSize: '0.7rem' }}>#{item.pid}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-dark-subtle text-dark border-0 me-1">{item.type}</span>
                    <span className="text-muted small d-block">{item.sub}</span>
                  </td>
                  <td className="fw-bold text-dark">₹{Number(item.price).toLocaleString()}</td>
                  <td>
                    {/* 2. Stock Visual Indicator */}
                    <div className={`fw-medium ${item.stock <= 5 ? 'text-danger' : 'text-success'}`}>
                      {item.stock} units
                    </div>
                  </td>
                  <td className="text-end px-4">
                    <button onClick={() => openModal(item)} className="btn btn-sm btn-light border rounded-circle p-2 me-2"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-light text-danger border rounded-circle p-2"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Visible on small screens) */}
        <div className="d-md-none p-3">
          {products.map((item) => (
            <div key={item._id} className="border rounded-4 p-3 mb-3 bg-white shadow-sm">
              <div className="d-flex gap-3">
                <img 
                  src={item.image.startsWith('http') ? item.image : `${IMG_BASE_URL}${item.image}`} 
                  className="rounded-3 object-fit-cover" 
                  style={{ width: '80px', height: '100px' }} 
                  alt="" 
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted extra-small">#{item.pid}</span>
                    <span className={`small fw-bold ${item.stock <= 5 ? 'text-danger' : 'text-success'}`}>
                      {item.stock} left
                    </span>
                  </div>
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-muted small mb-1">{item.type} • {item.sub}</p>
                  <p className="fw-bold text-dark mb-2">₹{Number(item.price).toLocaleString()}</p>
                  <div className="d-flex gap-2">
                    <button onClick={() => openModal(item)} className="btn btn-sm btn-dark flex-grow-1 py-2 rounded-3">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline-danger px-3 rounded-3"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Fully Responsive */}
      {isModalOpen && (
        <div className="modal show d-block p-0 p-sm-3" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered m-0 m-sm-auto" style={{ maxWidth: '800px' }}>
            <div className="modal-content border-0 h-100-mobile rounded-sm-4 overflow-hidden">
              <div className="bg-dark p-3 text-white d-flex justify-content-between align-items-center">
                 <h6 className="mb-0 text-uppercase fw-bold tracking-widest">{editingProduct ? 'Update Item' : 'New Collection Entry'}</h6>
                 <button onClick={() => setIsModalOpen(false)} className="btn btn-sm text-white p-0 border-0"><X size={24}/></button>
              </div>
              <form onSubmit={handleSubmit} className="overflow-auto" style={{ maxHeight: '90vh' }}>
                <div className="modal-body p-4 row g-3">
                  
                  {/* Image Upload Area */}
                  <div className="col-12">
                    <div className="border-2 border-dashed rounded-4 p-4 text-center bg-light position-relative" style={{ border: '2px dashed #ccc' }}>
                      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="position-absolute w-100 h-100 top-0 start-0 opacity-0 cursor-pointer" />
                      <Upload className="text-muted mb-2" size={24} />
                      <p className="small mb-0 fw-bold">{imageFile ? imageFile.name : "Tap to Upload Photo"}</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">Product Name</label>
                    <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control form-control-lg bg-light border-0 text-base" required />
                  </div>
                  
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Price (₹)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="form-control form-control-lg bg-light border-0" required />
                  </div>

                  {/* 3. Stock Input Field */}
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Stock</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="form-control form-control-lg bg-light border-0" required />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">Category</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, sub: ''})} className="form-select form-select-lg bg-light border-0" required>
                      <option value="">Select Category</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">Sub Category</label>
                    <select value={formData.sub} onChange={(e) => setFormData({...formData, sub: e.target.value})} className="form-select form-select-lg bg-light border-0" disabled={!formData.type} required>
                      <option value="">Select Style</option>
                      {formData.type && CATEGORY_MAP[formData.type].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* 4. Description Input Field */}
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                    <textarea 
                      rows="3" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      className="form-control bg-light border-0" 
                      placeholder="Enter fabric details, fit, and care instructions..."
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="submit" className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-lg">
                    {editingProduct ? 'SAVE CHANGES' : 'PUBLISH PRODUCT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CSS for custom tweaks */}
      <style>{`
        .extra-small { font-size: 0.65rem; }
        .fw-black { font-weight: 900; }
        .tracking-tighter { letter-spacing: -0.05em; }
        @media (max-width: 767px) {
          .btn-dark { width: 100% !important; min-width: auto !important; }
        }
        @media (max-width: 576px) {
          .h-100-mobile { height: 100vh !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default Products;