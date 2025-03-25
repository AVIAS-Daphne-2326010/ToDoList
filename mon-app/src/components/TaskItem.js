import React, { useState } from 'react';
import { ETAT_TERMINE } from '../enums/Etats';
import '../css/Task.css';

const TaskItem = ({ task, categories, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3 className={ETAT_TERMINE.includes(task.etat) ? 'completed' : ''}>
              {task.title}
            </h3>
            <span className="task-state">{task.etat}</span>
          </div>
          
          {task.description && <p>{task.description}</p>}
          
          <div className="task-dates">
            <span>Créée le: {new Date(task.date_creation).toLocaleDateString()}</span>
            {task.date_echeance && (
              <span>Échéance: {new Date(task.date_echeance).toLocaleDateString()}</span>
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