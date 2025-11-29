import React, { useState } from 'react';
import './App.css';
import { Plus, X, Search, ChevronRight } from 'lucide-react';
import ProductForm from './ProductForm';
import Dashboard from './Dashboard';
import CategoryView from './CategoryView';
import ProductGrid from './ProductGrid';

// Overhauled data structure for a hierarchical system
const initialProducts = [
  // Soaps
  {
    id: 1,
    category: 'Soaps',
    brand: 'Imperial Leather',
    variant: 'Active',
    productName: 'Imperial Leather Active Bar Soap',
    sku: 'ILS-175G-ACT',
    batchNumber: 'BATCH-IL-001',
    productType: 'Bar Soap',
    quantity: 175,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 2,
    category: 'Soaps',
    brand: 'Imperial Leather',
    variant: 'Japanese Spa',
    productName: 'Imperial Leather Japanese Spa Bar Soap',
    sku: 'ILS-175G-JSP',
    batchNumber: 'BATCH-IL-002',
    productType: 'Bar Soap',
    quantity: 175,
    unit: 'g',
    status: 'Approved',
  },
  // Dishwashing
  {
    id: 3,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Original',
    productName: 'Morning Fresh Original Dishwashing Liquid',
    sku: 'MFD-450ML-ORIG',
    batchNumber: 'BATCH-MF-003',
    productType: 'Dishwashing Liquid',
    quantity: 450,
    unit: 'ml',
    status: 'In Review',
  },
  {
    id: 4,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Orange & Tea Tree',
    productName: 'Morning Fresh Orange & Tea Tree Dishwashing Liquid',
    sku: 'MFD-450ML-OTT',
    batchNumber: 'BATCH-MF-004',
    productType: 'Dishwashing Liquid',
    quantity: 450,
    unit: 'ml',
    status: 'Draft',
  },
  {
    id: 5,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Original Paste',
    productName: 'Morning Fresh Original Dishwashing Paste',
    sku: 'MFP-800G-ORIG',
    batchNumber: 'BATCH-MF-005',
    productType: 'Dishwashing Paste',
    quantity: 800,
    unit: 'g',
    status: 'Approved',
  },
];


function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to manage navigation hierarchy
  // path: ['Soaps', 'Imperial Leather']
  const [path, setPath] = useState([]); 

  const navigateTo = (newPath) => {
    setPath([...path, newPath]);
  };

  const navigateBack = (index) => {
    setPath(path.slice(0, index + 1));
  };
  
  const resetNav = () => setPath([]);

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
    setIsFormVisible(false);
  };

  // --- Data Filtering Logic ---
  let currentProducts = products;
  let viewLevel = path.length;

  if (searchQuery) {
    currentProducts = products.filter(p => 
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    path.forEach((segment, index) => {
      if (index === 0) { // Top-level category (e.g., 'Soaps')
        currentProducts = currentProducts.filter(p => p.category === segment);
      }
      if (index === 1) { // Sub-category (e.g., 'Imperial Leather' or 'Dishwashing Liquid')
        const parentCategory = path[0];
        if (parentCategory === 'Soaps') {
          currentProducts = currentProducts.filter(p => p.brand === segment);
        } else if (parentCategory === 'Dishwashing') {
          currentProducts = currentProducts.filter(p => p.productType === segment);
        }
      }
    });
  }

  const renderContent = () => {
    if (searchQuery) {
      return <ProductGrid products={currentProducts} />;
    }
    
    switch (viewLevel) {
      case 0: // Dashboard
        const topLevelCategories = [...new Set(products.map(p => p.category))];
        return <Dashboard categories={topLevelCategories} onNavigate={navigateTo} />;
      
      case 1: // Sub-category view
        const parentCategory = path[0];
        let subCategories;
        if (parentCategory === 'Soaps') {
          subCategories = [...new Set(currentProducts.map(p => p.brand))];
        } else if (parentCategory === 'Dishwashing') {
          subCategories = [...new Set(currentProducts.map(p => p.productType))];
        } else {
          // Default to showing products if no specific sub-category logic
          return <ProductGrid products={currentProducts} />;
        }
        return <CategoryView categories={subCategories} onNavigate={navigateTo} />;

      case 2: // Product grid view
      default:
        return <ProductGrid products={currentProducts} />;
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Product Management System</h1>
        <div className="header-actions">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search all products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="add-product-btn" onClick={() => setIsFormVisible(true)}>
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
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
      
      <nav className="breadcrumbs">
        <button onClick={resetNav}>Home</button>
        {path.map((segment, index) => (
          <React.Fragment key={segment}>
            <ChevronRight size={16} />
            <button onClick={() => navigateBack(index)}>{segment}</button>
          </React.Fragment>
        ))}
      </nav>

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
