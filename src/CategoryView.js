import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Dashboard.css'; // Reusing the same styles as Dashboard

const CategoryView = ({ categories, onNavigate }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <button
          key={category}
          className="category-card"
          onClick={() => onNavigate(category)}
        >
          <span>{category}</span>
          <ChevronRight />
        </button>
      ))}
    </div>
  );
};

export default CategoryView;
