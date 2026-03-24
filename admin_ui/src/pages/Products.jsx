import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Box, Upload, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/products";
const IMG_BASE_URL = "http://localhost:5000/";

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
  
  // 1. Updated State with stock and description
  const [formData, setFormData] = useState({ 
    pid: '', 
    name: '', 
    price: '', 
    type: '', 
    sub: '', 
    stock: '0', 
    description: '', 
    modelUrl: '' 
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product._id);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ 
        pid: Date.now().toString(), 
        name: '', 
        price: '', 
        type: '', 
        sub: '', 
        stock: '0', 
        description: '', 
        modelUrl: '' 
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
    if (window.confirm("Delete product?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-uppercase tracking-tight">Netrutv Inventory</h2>
        <button onClick={() => openModal()} className="btn btn-dark px-4 fw-bold shadow-sm">
          <Plus size={18} className="me-2" /> NEW PRODUCT
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light text-secondary small text-uppercase">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
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
                      className="rounded-3 me-3 object-fit-cover shadow-sm" 
                      style={{ width: '48px', height: '48px' }} 
                      alt="" 
                    />
                    <div>
                      <div className="fw-bold text-dark">{item.name}</div>
                      <div className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>ID: {item.pid}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge bg-dark text-white me-1" style={{ fontSize: '0.7rem' }}>{item.type}</span>
                  <span className="badge bg-light text-dark border" style={{ fontSize: '0.7rem' }}>{item.sub}</span>
                </td>
                <td className="fw-bold">₹{Number(item.price).toLocaleString()}</td>
                {/* 2. Stock Visual Indicator */}
                <td>
                  <div className="d-flex align-items-center">
                    <span className={`badge ${item.stock <= 5 ? 'bg-danger' : 'bg-success'} rounded-pill me-2`} style={{ width: '10px', height: '10px', padding: 0 }}> </span>
                    <span className="fw-medium">{item.stock} in stock</span>
                  </div>
                </td>
                <td className="text-end px-4">
                  <button onClick={() => openModal(item)} className="btn btn-sm btn-outline-dark border-0 rounded-circle p-2 me-1 shadow-sm"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2 shadow-sm"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-dark p-3 text-white text-center">
                 <h6 className="mb-0 text-uppercase fw-bold tracking-widest">{editingProduct ? 'Update Product Details' : 'Add New Inventory'}</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 row g-3">
                  {/* Image Upload Area */}
                  <div className="col-12">
                    <div className="border-2 border-dashed rounded-4 p-4 text-center bg-light position-relative" style={{ border: '2px dashed #dee2e6' }}>
                      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="position-absolute w-100 h-100 top-0 start-0 opacity-0 cursor-pointer" />
                      <Upload className="text-muted mb-2" size={30} />
                      <p className="small mb-0 fw-bold">{imageFile ? imageFile.name : "Upload Product Image"}</p>
                      <p className="extra-small text-muted mb-0">Recommended: 1000x1000px PNG or JPG</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted uppercase">Product Name</label>
                    <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control bg-light border-0 shadow-none py-2" required />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-bold text-muted uppercase">Price (INR)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="form-control bg-light border-0 shadow-none py-2" required />
                  </div>
                  {/* 3. Stock Input Field */}
                  <div className="col-md-3">
                    <label className="form-label small fw-bold text-muted uppercase">Available Stock</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="form-control bg-light border-0 shadow-none py-2" required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted uppercase">Category</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, sub: ''})} className="form-select bg-light border-0 shadow-none py-2" required>
                      <option value="">Select Category</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted uppercase">Style / Sub Category</label>
                    <select value={formData.sub} onChange={(e) => setFormData({...formData, sub: e.target.value})} className="form-select bg-light border-0 shadow-none py-2" disabled={!formData.type} required>
                      <option value="">Choose Style...</option>
                      {formData.type && CATEGORY_MAP[formData.type].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* 4. Description Input Field */}
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted uppercase">Product Description</label>
                    <textarea 
                      rows="3" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      className="form-control bg-light border-0 shadow-none" 
                      placeholder="Enter fabric details, fit, and care instructions..."
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 px-4 pb-4">
                  <button type="button" className="btn btn-link text-dark fw-bold text-decoration-none" onClick={() => setIsModalOpen(false)}>Discard</button>
                  <button type="submit" className="btn btn-dark px-5 py-2 rounded-pill fw-bold shadow">
                    {editingProduct ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;