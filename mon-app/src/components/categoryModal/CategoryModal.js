import React, { useState } from 'react';
import '../../css/Modal.css';

const emojis = ['📝', '🛒', '🏠', '💼', '🎓', '🏥', '🎉', '🍎'];

const CategoryModal = ({ isOpen, onClose, onSave }) => {
  const [newCategory, setNewCategory] = useState({
    title: '',
    color: '#4CAF50',
    emoji: '📝',
    actif: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.title.length >= 3) {
      onSave(newCategory);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouvelle Catégorie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom (min 3 caractères):
            <input
              type="text"
              value={newCategory.title}
              onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
              minLength="3"
              required
            />
          </label>
          
          <label>
            Couleur:
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
            />
          </label>
          
          <label>
            Emoji:
            <select
              value={newCategory.emoji}
              onChange={(e) => setNewCategory({...newCategory, emoji: e.target.value})}
            >
              {emojis.map(emoji => (
                <option key={emoji} value={emoji}>{emoji}</option>
              ))}
            </select>
          </label>
          
          <div className="modal-buttons">
            <button type="submit">Créer</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;