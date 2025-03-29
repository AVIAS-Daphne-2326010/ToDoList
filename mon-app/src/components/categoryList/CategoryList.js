import React, { useState } from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, onDeleteCategory, onUpdateCategory }) => {
  // Déclare les états pour l'édition
  const [editingCategory, setEditingCategory] = useState(null); 
  const [editedTitle, setEditedTitle] = useState(''); 
  const [editedColor, setEditedColor] = useState(''); 
  const [editedEmoji, setEditedEmoji] = useState(''); 

  // Fonction pour démarrer l'édition d'une catégorie
  const startEditing = (category) => {
    setEditingCategory(category.id); 
    setEditedTitle(category.title); 
    setEditedColor(category.color); 
    setEditedEmoji(category.emoji); 
  };

  // Fonction pour sauvegarder les modifications d'une catégorie
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
        {/* Boucle à travers toutes les catégories */}
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-item"
            style={{ borderLeft: `5px solid ${category.color}` }} 
          >
            {/* Si la catégorie est en cours d'édition */}
            {editingCategory === category.id ? (
              <div className="edit-category">
                {/* Champs d'édition pour le titre, la couleur et l'emoji */}
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
                {/* Boutons pour sauvegarder ou annuler l'édition */}
                <button onClick={saveEdit}>✅</button>
                <button onClick={() => setEditingCategory(null)}>❌</button>
              </div>
            ) : (
              <>
                {/* Affichage des informations de la catégorie */}
                <span className="category-emoji">{category.emoji}</span>
                <span className="category-title">{category.title}</span>
                
                {/* Bouton pour modifier la catégorie */}
                <button 
                  className="edit-category-button" 
                  onClick={() => startEditing(category)}
                >
                  (✏️)
                </button>

                {/* Bouton pour supprimer la catégorie */}
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
