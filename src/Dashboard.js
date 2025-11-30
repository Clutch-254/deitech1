import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ categories, onNavigate, products = [] }) => {
  // Calculate product count per category
  const getCategoryCount = (category) => {
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <button
          key={category}
          className="category-card"
          onClick={() => onNavigate(category)}
        >
          <div>
            <span>{category}</span>
            <div className="category-count">{getCategoryCount(category)} products</div>
          </div>
          <ChevronRight />
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
