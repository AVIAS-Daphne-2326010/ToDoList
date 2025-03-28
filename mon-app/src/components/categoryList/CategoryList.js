import React from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, onAddCategory }) => {
  return (
    <div className="category-container">
      <div className="category-list">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-item"
            style={{ borderLeft: `5px solid ${category.color}` }}
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-title">{category.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;