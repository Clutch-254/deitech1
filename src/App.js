import React, { useState } from 'react';
import './App.css';
import { Plus, X } from 'lucide-react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

// Let's start with some realistic mock data for Cussons
const initialProducts = [
  {
    id: 1,
    productName: 'Cussons Baby Jelly',
    sku: 'CBJ-250G',
    category: 'Baby Care',
    brand: 'Cussons Baby',
    status: 'Approved',
    batchNumber: 'BATCH-001A',
  },
  {
    id: 2,
    productName: 'Imperial Leather Soap',
    sku: 'ILS-175G',
    category: 'Personal Care',
    brand: 'Imperial Leather',
    status: 'In Review',
    batchNumber: 'BATCH-002B',
  },
  {
    id: 3,
    productName: 'Morning Fresh Dishwasher',
    sku: 'MFD-450ML',
    category: 'Home Care',
    brand: 'Morning Fresh',
    status: 'Draft',
    batchNumber: 'BATCH-003C',
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
    setIsFormVisible(false); // Hide form after submission
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Cussons Product Management</h1>
        <button className="add-product-btn" onClick={() => setIsFormVisible(true)}>
          <Plus size={20} />
          Add New Product
        </button>
      </header>

      {isFormVisible && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="form-modal-header">
              <h2>Add a New Product</h2>
              <button className="close-btn" onClick={() => setIsFormVisible(false)}>
                <X size={24} />
              </button>
            </div>
            <ProductForm onAddProduct={addProduct} />
          </div>
        </div>
      )}

      <main>
        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;
