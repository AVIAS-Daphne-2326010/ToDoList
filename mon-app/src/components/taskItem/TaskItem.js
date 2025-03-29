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
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            minLength="3"
            required
          />
          <select
            name="etat"
            value={editedTask.etat}
            onChange={handleChange}
          >
            <option value="Nouveau">Nouveau</option>
            <option value="En cours">En cours</option>
            <option value="Réussi">Réussi</option>
            <option value="En attente">En attente</option>
            <option value="Abandonné">Abandonné</option>
          </select>

          <textarea
            name="description"
            value={editedTask.description || ''}
            onChange={handleChange}
            placeholder="Ajouter une description"
          />

          <input
            type="date"
            name="date_echeance"
            value={editedTask.date_echeance || ''}
            onChange={handleChange}
          />

          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
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