import React, { useState } from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, onDeleteCategory, onUpdateCategory }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedColor, setEditedColor] = useState('');
  const [editedEmoji, setEditedEmoji] = useState('');

  const startEditing = (category) => {
    setEditingCategory(category.id);
    setEditedTitle(category.title);
    setEditedColor(category.color);
    setEditedEmoji(category.emoji);
  };

  const saveEdit = () => {
    onUpdateCategory({
      id: editingCategory,
      title: editedTitle,
      color: editedColor,
      emoji: editedEmoji
    });
    setEditingCategory(null);
  };

  return (
    <div className="category-container">
      <div className="category-list">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-item"
            style={{ borderLeft: `5px solid ${category.color}` }}
          >
            {editingCategory === category.id ? (
              <div className="edit-category">
                <input 
                  type="text" 
                  value={editedTitle} 
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <input 
                  type="color" 
                  value={editedColor} 
                  onChange={(e) => setEditedColor(e.target.value)}
                />
                <input 
                  type="text" 
                  value={editedEmoji} 
                  onChange={(e) => setEditedEmoji(e.target.value)}
                  maxLength="2"
                />
                <button onClick={saveEdit}>✅</button>
                <button onClick={() => setEditingCategory(null)}>❌</button>
              </div>
            ) : (
              <>
                <span className="category-emoji">{category.emoji}</span>
                <span className="category-title">{category.title}</span>
                
                <button 
                  className="edit-category-button" 
                  onClick={() => startEditing(category)}
                >
                  (✏️)
                </button>

                <button 
                  className="delete-category-button" 
                  onClick={() => onDeleteCategory(category.id)}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
