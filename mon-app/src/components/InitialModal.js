import React from 'react';
import '../css/Modal.css';

const InitialModal = ({ isOpen, onLoadFromJSON, onStartNew }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          onLoadFromJSON(jsonData);
        } catch (error) {
          alert("Fichier JSON invalide");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Bienvenue dans votre Todo List</h2>
        <div className="modal-options">
          <div className="option">
            <h3>Charger un projet existant</h3>
            <input
              type="file"
              id="json-upload"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="json-upload" className="file-upload-button">
              Sélectionner un fichier JSON
            </label>
          </div>

          <div className="option">
            <h3>Commencer un nouveau projet</h3>
            <button onClick={onStartNew}>Créer un nouveau projet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialModal;