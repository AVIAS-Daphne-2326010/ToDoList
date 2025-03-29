import React, { useState } from 'react';
import { ETAT_TERMINE } from '../../enums/Etats';
import '../../css/Task.css';

// Composant TaskItem représentant une tâche individuelle dans la liste
const TaskItem = ({ task, categories, onUpdate, onDelete }) => {
  // État pour gérer si la tâche est en mode édition
  const [isEditing, setIsEditing] = useState(false);
  // État pour stocker les modifications apportées à la tâche
  const [editedTask, setEditedTask] = useState(task);

  // Fonction pour gérer les changements dans les champs de la tâche
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Fonction pour gérer les changements de catégories
  const handleCategoryToggle = (categoryId) => {
    setEditedTask(prev => ({
      ...prev,
      categorie: prev.categorie.includes(categoryId)
        ? prev.categorie.filter(id => id !== categoryId)
        : [...prev.categorie, categoryId]
    }));
  };

  // Fonction pour sauvegarder les modifications de la tâche
  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.urgent ? 'urgent' : ''} 
      ${ETAT_TERMINE.includes(task.etat) ? 'completed' : ''}`}>
      
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group full-width">
            <label>Titre</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label>État</label>
              <select
                name="etat"
                value={editedTask.etat}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Nouveau">Nouveau</option>
                <option value="En cours">En cours</option>
                <option value="Réussi">Réussi</option>
                <option value="En attente">En attente</option>
                <option value="Abandonné">Abandonné</option>
              </select>
            </div>

            <div className="form-group urgent-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="urgent"
                  checked={editedTask.urgent}
                  onChange={handleChange}
                />
                <span>Urgent</span>
              </label>
            </div>
          </div>
  
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={editedTask.description || ''}
              onChange={handleChange}
              placeholder="Ajouter une description"
              className="form-textarea"
            />
          </div>
  
          <div className="form-group full-width">
            <label>Date d'échéance</label>
            <input
              type="date"
              name="date_echeance"
              value={editedTask.date_echeance || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
  
          {categories.length > 0 && (
            <div className="form-group full-width category-selection">
              <label>Catégories</label>
              <div className="category-options">
                {categories.map(cat => (
                  <label key={cat.id} className="category-option">
                    <input
                      type="checkbox"
                      checked={editedTask.categorie.includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span style={{ color: cat.color }}>
                      {cat.emoji} {cat.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
  
          <div className="form-actions full-width">
            <button className="btn-save" onClick={handleSave}>
              Enregistrer
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              Annuler
            </button>

          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3 className={ETAT_TERMINE.includes(task.etat) ? 'completed-text' : ''}>
              {task.title}
            </h3>
            <span className="task-state">{task.etat}</span>
          </div>
          
          {task.description && <p>{task.description}</p>}
          
          <div className="task-dates">
            <span>Créée le: {new Date(task.date_creation).toLocaleDateString()} <br></br></span>
            {task.date_echeance && (
              <span> Échéance: {new Date(task.date_echeance).toLocaleDateString()}</span>
            )}
          </div>
          
          {task.categorie?.length > 0 && (
            <div className="task-categories">
              <strong>Catégories: </strong>
              {categories
                .filter(cat => task.categorie.includes(cat.id))
                .map(category => (
                  <span key={category.id} style={{ color: category.color, marginRight: '8px' }}>
                    {category.emoji} {category.title}
                  </span>
                ))}
            </div>
          )}

          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Modifier</button>
            <button onClick={() => onDelete(task.id)}>Supprimer</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;