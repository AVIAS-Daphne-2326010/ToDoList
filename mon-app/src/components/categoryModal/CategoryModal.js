import React, { useState } from 'react';
import '../../css/Modal.css';

// Liste d'emojis disponibles pour la catégorie
const emojis = ['📝', '🛒', '🏠', '💼', '🎓', '🏥', '🎉', '🍎'];

const CategoryModal = ({ isOpen, onClose, onSave }) => {
  // Déclare l'état pour la nouvelle catégorie avec des valeurs par défaut
  const [newCategory, setNewCategory] = useState({
    title: '', 
    color: '#4CAF50',  
    emoji: '📝',  
    actif: true  
  });

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (newCategory.title.length >= 3) {  
      onSave(newCategory);  
    }
  };

  // Si le modal n'est pas ouvert, on ne rend rien
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouvelle Catégorie</h2>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre de la catégorie */}
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
          
          {/* Champ pour la couleur de la catégorie */}
          <label>
            Couleur:
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({...newCategory, color: e.target.value})} 
            />
          </label>
          
          {/* Sélecteur d'emoji */}
          <label>
            Emoji:
            <select
              value={newCategory.emoji}
              onChange={(e) => setNewCategory({...newCategory, emoji: e.target.value})} 
            >
              {/* Affiche chaque emoji disponible dans la liste */}
              {emojis.map(emoji => (
                <option key={emoji} value={emoji}>{emoji}</option>
              ))}
            </select>
          </label>
          
          <div className="modal-buttons">
            {/* Bouton pour soumettre le formulaire */}
            <button type="submit">Créer</button>
            {/* Bouton pour fermer le modal sans enregistrer */}
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
