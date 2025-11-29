import React from 'react';
import './ProductList.css';

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

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="card"><p>No products found. Add a new product to get started!</p></div>;
  }

  return (
    <div className="card">
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Batch Number</th>
              <th>Product Type</th>
              <th>Variant</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.sku}</td>
                <td>{product.batchNumber}</td>
                <td>{product.productType}</td>
                <td>{product.variant}</td>
                <td>{product.brand}</td>
                <td>
                  <StatusBadge status={product.status} />
                </td>
                <td>
                  <button className="action-btn">Edit</button>
                  <button className="action-btn action-btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
