import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    batchNumber: '',
    category: '',
    brand: '',
    status: 'Draft', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.sku) {
      alert('Product Name and SKU are required.');
      return;
    }
    onAddProduct(formData);
    // Reset form
    setFormData({
      productName: '',
      sku: '',
      batchNumber: '',
      category: '',
      brand: '',
      status: 'Draft',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="batchNumber">Batch Number</label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="Baby Care">Baby Care</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Home Care">Home Care</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
           <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Save Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
