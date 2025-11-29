import React from 'react';
import './ProductGrid.css';

const StatusBadge = ({ status }) => {
  let className = 'status-badge';
  switch (status.toLowerCase()) {
    case 'approved':
      className += ' status-approved';
      break;
    case 'in review':
      className += ' status-in-review';
      break;
    case 'draft':
      className += ' status-draft';
      break;
    default:
      break;
  }
  return <span className={className}>{status}</span>;
};


const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="card"><p>No products found for this selection.</p></div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-card-header">
            <h3>{product.productName}</h3>
            <StatusBadge status={product.status} />
          </div>
          <div className="product-card-body">
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Batch No:</strong> {product.batchNumber}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Quantity:</strong> {product.quantity}{product.unit}</p>
          </div>
          <div className="product-card-footer">
            <button className="action-btn">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
