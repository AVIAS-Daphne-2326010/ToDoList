import React, { useState } from 'react';
import '../css/Modal.css';

const TaskModal = ({ isOpen, onClose, onSave, categories }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date_echeance: '',
    etat: 'Nouveau',
    urgent: false,
    categorie: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setNewTask(prev => ({
      ...prev,
      categorie: prev.categorie.includes(categoryId)
        ? prev.categorie.filter(id => id !== categoryId)
        : [...prev.categorie, categoryId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.length >= 3) {
      onSave({
        title: newTask.title,
        description: newTask.description,
        date_echeance: newTask.date_echeance,
        etat: newTask.etat,
        urgent: newTask.urgent,
        categorie: newTask.categorie
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouvelle Tâche</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre* (min 3 caractères):
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              minLength="3"
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Date d'échéance:
            <input
              type="date"
              name="date_echeance"
              value={newTask.date_echeance}
              onChange={handleChange}
            />
          </label>

          <label>
            État:
            <select
              name="etat"
              value={newTask.etat}
              onChange={handleChange}
            >
              <option value="Nouveau">Nouveau</option>
              <option value="En cours">En cours</option>
              <option value="En attente">En attente</option>
              <option value="Réussi">Réussi</option>
              <option value="Abandonné">Abandonné</option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="urgent"
              checked={newTask.urgent}
              onChange={handleChange}
            />
            Urgent
          </label>

          {categories.length > 0 && (
            <div className="category-selection">
              <p>Catégories:</p>
              {categories.map(cat => (
                <label key={cat.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newTask.categorie.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                  />
                  <span style={{ color: cat.color }}>
                    {cat.emoji} {cat.title}
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="modal-buttons">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;