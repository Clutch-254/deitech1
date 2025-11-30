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
    id: 21,
    category: 'Soaps',
    brand: 'Imperial Leather',
    variant: 'Active',
    productName: 'Imperial Leather Active Bar Soap',
    sku: 'ILS-150G-ACT',
    batchNumber: 'BATCH-IL-001-B',
    productType: 'Bar Soap',
    quantity: 150,
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
  {
    id: 22,
    category: 'Soaps',
    brand: 'Imperial Leather',
    variant: 'Japanese Spa',
    productName: 'Imperial Leather Japanese Spa Bar Soap',
    sku: 'ILS-200G-JSP',
    batchNumber: 'BATCH-IL-002-B',
    productType: 'Bar Soap',
    quantity: 200,
    unit: 'g',
    status: 'Approved',
  },
    {
    id: 6,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Original',
    productName: 'Flamingo Original Bar Soap',
    sku: 'FLS-150G-ORIG',
    batchNumber: 'BATCH-FL-001',
    productType: 'Bar Soap',
    quantity: 150,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 28,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Original',
    productName: 'Flamingo Original Bar Soap',
    sku: 'FLS-100G-ORIG',
    batchNumber: 'BATCH-FL-001-B',
    productType: 'Bar Soap',
    quantity: 100,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 7,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Rose',
    productName: 'Flamingo Rose Bar Soap',
    sku: 'FLS-150G-ROSE',
    batchNumber: 'BATCH-FL-002',
    productType: 'Bar Soap',
    quantity: 150,
    unit: 'g',
    status: 'In Review',
  },
  {
    id: 29,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Rose',
    productName: 'Flamingo Rose Bar Soap',
    sku: 'FLS-100G-ROSE',
    batchNumber: 'BATCH-FL-002-B',
    productType: 'Bar Soap',
    quantity: 100,
    unit: 'g',
    status: 'In Review',
  },
  {
    id: 8,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Lemon',
    productName: 'Flamingo Lemon Bar Soap',
    sku: 'FLS-150G-LEMN',
    batchNumber: 'BATCH-FL-003',
    productType: 'Bar Soap',
    quantity: 150,
    unit: 'g',
    status: 'Draft',
  },
  {
    id: 30,
    category: 'Soaps',
    brand: 'Flamingo',
    variant: 'Lemon',
    productName: 'Flamingo Lemon Bar Soap',
    sku: 'FLS-100G-LEMN',
    batchNumber: 'BATCH-FL-003-B',
    productType: 'Bar Soap',
    quantity: 100,
    unit: 'g',
    status: 'Draft',
  },
    {
    id: 9,
    category: 'Soaps',
    brand: 'Carex',
    variant: 'Original',
    productName: 'Carex Original Bar Soap',
    sku: 'CXS-125G-ORIG',
    batchNumber: 'BATCH-CX-001',
    productType: 'Bar Soap',
    quantity: 125,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 31,
    category: 'Soaps',
    brand: 'Carex',
    variant: 'Original',
    productName: 'Carex Original Bar Soap',
    sku: 'CXS-75G-ORIG',
    batchNumber: 'BATCH-CX-001-B',
    productType: 'Bar Soap',
    quantity: 75,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 10,
    category: 'Soaps',
    brand: 'Carex',
    variant: 'Sensitive',
    productName: 'Carex Sensitive Bar Soap',
    sku: 'CXS-125G-SENS',
    batchNumber: 'BATCH-CX-002',
    productType: 'Bar Soap',
    quantity: 125,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 32,
    category: 'Soaps',
    brand: 'Carex',
    variant: 'Sensitive',
    productName: 'Carex Sensitive Bar Soap',
    sku: 'CXS-75G-SENS',
    batchNumber: 'BATCH-CX-002-B',
    productType: 'Bar Soap',
    quantity: 75,
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
    id: 25,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Original',
    productName: 'Morning Fresh Original Dishwashing Liquid',
    sku: 'MFD-750ML-ORIG',
    batchNumber: 'BATCH-MF-003-B',
    productType: 'Dishwashing Liquid',
    quantity: 750,
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
    id: 26,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Orange & Tea Tree',
    productName: 'Morning Fresh Orange & Tea Tree Dishwashing Liquid',
    sku: 'MFD-750ML-OTT',
    batchNumber: 'BATCH-MF-004-B',
    productType: 'Dishwashing Liquid',
    quantity: 750,
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
  {
    id: 27,
    category: 'Dishwashing',
    brand: 'Morning Fresh',
    variant: 'Original Paste',
    productName: 'Morning Fresh Original Dishwashing Paste',
    sku: 'MFP-400G-ORIG',
    batchNumber: 'BATCH-MF-005-B',
    productType: 'Dishwashing Paste',
    quantity: 400,
    unit: 'g',
    status: 'Approved',
  },
  // Cussons Baby
  {
    id: 11,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Mild',
    productName: 'Cussons Baby Jelly Mild',
    sku: 'CBJ-100G-MILD',
    batchNumber: 'BATCH-CBJ-001',
    productType: 'Baby Jelly',
    quantity: 100,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 23,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Mild',
    productName: 'Cussons Baby Jelly Mild',
    sku: 'CBJ-50G-MILD',
    batchNumber: 'BATCH-CBJ-001-B',
    productType: 'Baby Jelly',
    quantity: 50,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 12,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Gentle',
    productName: 'Cussons Baby Jelly Gentle',
    sku: 'CBJ-200G-GNTL',
    batchNumber: 'BATCH-CBJ-002',
    productType: 'Baby Jelly',
    quantity: 200,
    unit: 'g',
    status: 'In Review',
  },
  {
    id: 24,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Gentle',
    productName: 'Cussons Baby Jelly Gentle',
    sku: 'CBJ-150G-GNTL',
    batchNumber: 'BATCH-CBJ-002-B',
    productType: 'Baby Jelly',
    quantity: 150,
    unit: 'g',
    status: 'In Review',
  },
    {
    id: 19,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Soft',
    productName: 'Cussons Baby Soap Soft',
    sku: 'CBS-100G-SOFT',
    batchNumber: 'BATCH-CBS-001',
    productType: 'Baby Soap',
    quantity: 100,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 33,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Soft',
    productName: 'Cussons Baby Soap Soft',
    sku: 'CBS-75G-SOFT',
    batchNumber: 'BATCH-CBS-001-B',
    productType: 'Baby Soap',
    quantity: 75,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 20,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Smooth',
    productName: 'Cussons Baby Soap Smooth',
    sku: 'CBS-100G-SMTH',
    batchNumber: 'BATCH-CBS-002',
    productType: 'Baby Soap',
    quantity: 100,
    unit: 'g',
    status: 'Approved',
  },
  {
    id: 34,
    category: 'Cussons Baby',
    brand: 'Cussons Baby',
    variant: 'Smooth',
    productName: 'Cussons Baby Soap Smooth',
    sku: 'CBS-75G-SMTH',
    batchNumber: 'BATCH-CBS-002-B',
    productType: 'Baby Soap',
    quantity: 75,
    unit: 'g',
    status: 'Approved',
  },
  // Hand Wash
  {
    id: 13,
    category: 'Hand Wash',
    brand: 'Imperial Leather',
    variant: 'Classic',
    productName: 'Imperial Leather Hand Wash Classic',
    sku: 'ILHW-250ML-CLAS',
    batchNumber: 'BATCH-ILHW-001',
    productType: 'Liquid Soap',
    quantity: 250,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 35,
    category: 'Hand Wash',
    brand: 'Imperial Leather',
    variant: 'Classic',
    productName: 'Imperial Leather Hand Wash Classic',
    sku: 'ILHW-500ML-CLAS',
    batchNumber: 'BATCH-ILHW-001-B',
    productType: 'Liquid Soap',
    quantity: 500,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 14,
    category: 'Hand Wash',
    brand: 'Carex',
    variant: 'Original',
    productName: 'Carex Hand Wash Original',
    sku: 'CXHW-250ML-ORIG',
    batchNumber: 'BATCH-CXHW-001',
    productType: 'Liquid Soap',
    quantity: 250,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 36,
    category: 'Hand Wash',
    brand: 'Carex',
    variant: 'Original',
    productName: 'Carex Hand Wash Original',
    sku: 'CXHW-500ML-ORIG',
    batchNumber: 'BATCH-CXHW-001-B',
    productType: 'Liquid Soap',
    quantity: 500,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 15,
    category: 'Hand Wash',
    brand: 'Carex',
    variant: 'Sensitive',
    productName: 'Carex Hand Wash Sensitive',
    sku: 'CXHW-250ML-SENS',
    batchNumber: 'BATCH-CXHW-002',
    productType: 'Liquid Soap',
    quantity: 250,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 37,
    category: 'Hand Wash',
    brand: 'Carex',
    variant: 'Sensitive',
    productName: 'Carex Hand Wash Sensitive',
    sku: 'CXHW-500ML-SENS',
    batchNumber: 'BATCH-CXHW-002-B',
    productType: 'Liquid Soap',
    quantity: 500,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 16,
    category: 'Hand Wash',
    brand: 'Flamingo',
    variant: 'Rose',
    productName: 'Flamingo Hand Wash Rose',
    sku: 'FLHW-300ML-ROSE',
    batchNumber: 'BATCH-FLHW-001',
    productType: 'Liquid Soap',
    quantity: 300,
    unit: 'ml',
    status: 'In Review',
  },
  {
    id: 38,
    category: 'Hand Wash',
    brand: 'Flamingo',
    variant: 'Rose',
    productName: 'Flamingo Hand Wash Rose',
    sku: 'FLHW-500ML-ROSE',
    batchNumber: 'BATCH-FLHW-001-B',
    productType: 'Liquid Soap',
    quantity: 500,
    unit: 'ml',
    status: 'In Review',
  },
  {
    id: 17,
    category: 'Hand Wash',
    brand: 'Flamingo',
    variant: 'Lemon',
    productName: 'Flamingo Hand Wash Lemon',
    sku: 'FLHW-300ML-LEMN',
    batchNumber: 'BATCH-FLHW-002',
    productType: 'Liquid Soap',
    quantity: 300,
    unit: 'ml',
    status: 'Draft',
  },
  {
    id: 39,
    category: 'Hand Wash',
    brand: 'Flamingo',
    variant: 'Lemon',
    productName: 'Flamingo Hand Wash Lemon',
    sku: 'FLHW-500ML-LEMN',
    batchNumber: 'BATCH-FLHW-002-B',
    productType: 'Liquid Soap',
    quantity: 500,
    unit: 'ml',
    status: 'Draft',
  },
  // Bodywash
  {
    id: 18,
    category: 'Bodywash',
    brand: 'Imperial Leather',
    variant: 'Active',
    productName: 'Imperial Leather Bodywash Active',
    sku: 'ILBW-500ML-ACT',
    batchNumber: 'BATCH-ILBW-001',
    productType: 'Bodywash',
    quantity: 500,
    unit: 'ml',
    status: 'Approved',
  },
  {
    id: 40,
    category: 'Bodywash',
    brand: 'Imperial Leather',
    variant: 'Active',
    productName: 'Imperial Leather Bodywash Active',
    sku: 'ILBW-250ML-ACT',
    batchNumber: 'BATCH-ILBW-001-B',
    productType: 'Bodywash',
    quantity: 250,
    unit: 'ml',
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
        if (parentCategory === 'Soaps' || parentCategory === 'Hand Wash') {
          currentProducts = currentProducts.filter(p => p.brand === segment);
        } else if (parentCategory === 'Dishwashing' || parentCategory === 'Cussons Baby') {
          currentProducts = currentProducts.filter(p => p.productType === segment);
        }
      }
      if (index === 2) { // Third level: Variant/Flavor
        currentProducts = currentProducts.filter(p => p.variant === segment);
      }
       if (index === 3) { // Fourth level: Quantity
        const [quantity, unit] = segment.split(' ');
        currentProducts = currentProducts.filter(
          p => p.quantity === parseInt(quantity, 10) && p.unit === unit
        );
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
        if (parentCategory === 'Soaps' || parentCategory === 'Hand Wash') {
          subCategories = [...new Set(currentProducts.map(p => p.brand))];
        } else if (parentCategory === 'Dishwashing' || parentCategory === 'Cussons Baby') {
          subCategories = [...new Set(currentProducts.map(p => p.productType))];
        } else {
          // Default to showing products if no specific sub-category logic
          return <ProductGrid products={currentProducts} />;
        }
        return <CategoryView categories={subCategories} onNavigate={navigateTo} />;

      case 2: // Variant/Flavor view
        const variants = [...new Set(currentProducts.map(p => p.variant))];
        return <CategoryView categories={variants} onNavigate={navigateTo} />;

      case 3: // Quantity view
        const quantities = [...new Set(currentProducts.map(p => `${p.quantity} ${p.unit}`))];
        return <CategoryView categories={quantities} onNavigate={navigateTo} />;

      case 4: // Product grid view
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
