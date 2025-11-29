import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ categories, onNavigate }) => {
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

export default Dashboard;
