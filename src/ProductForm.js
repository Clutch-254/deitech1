import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    batchNumber: '',
    productType: '',
    variant: '',
    brand: '',
    status: 'Draft', // Default status
    quantity: '',
    unit: 'g',
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
      productType: '',
      variant: '',
      brand: '',
      status: 'Draft',
      quantity: '',
      unit: 'g',
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
          <label htmlFor="productType">Product Type</label>
          <select
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            <option value="Bar Soap">Bar Soap</option>
            <option value="Dishwashing Liquid">Dishwashing Liquid</option>
            <option value="Dishwashing Paste">Dishwashing Paste</option>
            <option value="Baby Jelly">Baby Jelly</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="variant">Variant</label>
          <input
            type="text"
            id="variant"
            name="variant"
            value={formData.variant}
            onChange={handleChange}
            placeholder="e.g., Original, Orange & Tea Tree"
          />
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
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 175"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="g">grams (g)</option>
            <option value="ml">millilitres (ml)</option>
            <option value="L">litres (L)</option>
            <option value="kg">kilograms (kg)</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Save Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
