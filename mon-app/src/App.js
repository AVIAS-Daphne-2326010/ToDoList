import React, {useState} from "react";
import './css/App.css';
import todo from './datas.json';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App() {
  const [currentTodos, setCurrentTodos] = useState(todo)
  const taches = currentTodos.taches
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date_creation: new Date().toISOString(),
    date_echeance: "",
    etat: "Nouveau",
    urgent: false,
  });

  // Fonction pour ouvrir la fenêtre modale
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la fenêtre modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour gérer le changement de champ dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Fonction pour ajouter une tâches
  const ajoutTache = () => {
    
    const task = {
      id: Date.now(), 
      title: newTask.title,
      description: newTask.description,
      date_creation: new Date().toISOString(),
      date_echeance: newTask.date_echeance,
      etat: newTask.etat,
      urgent: newTask.urgent,
    };
    setCurrentTodos({
      ...currentTodos,
      taches: [...currentTodos.taches, task]
    });
    closeModal();
  };

  // Fonction pour ajouter une catégorie
  const ajoutCategorie = () => {
    const categorie = {
      id: Date.now(),
      title: "Nouvelle Catégorie",
      color: "green",
      icon: "",
      actif: true,
    };
    setCurrentTodos({
      ...currentTodos,
      categories: [...currentTodos.categories, categorie],
    });
  };

  return (
    <div className="App">
        <Header taches={todo.taches}/>
        <div className="task-list">
          <h2>Liste des Tâches</h2>
          <ul>
            {taches.map((tache) => (
              <li key={tache.id}>
                <h3>{tache.title}</h3>
                <p>Description: {tache.description || "Aucune description"}</p>
                <p>Date de création: {tache.date_creation}</p>
                <p>Date d'échéance: {tache.date_echeance}</p>
                <p>État: {tache.etat}</p>
                <p className={tache.urgent ? "urgent" : ""}>
                {tache.urgent ? "Urgent" : "Non urgent"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Footer onAddTache={ajoutTache} onAddCategorie={ajoutCategorie}/>
    

      {/* Fenêtre modale */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter une nouvelle tâche</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ajoutTache();
              }}
            >
              <label>Titre</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
              <label>Date d'échéance</label>
              <input
                type="date"
                name="date_echeance"
                value={newTask.date_echeance}
                onChange={handleInputChange}
                required
              />
              <label>État</label>
              <select
                name="etat"
                value={newTask.etat}
                onChange={handleInputChange}
              >
                <option value="Nouveau">Nouveau</option>
                <option value="En cours">En cours</option>
                <option value="Réussi">Réussi</option>
                <option value="En attente">En attente</option>
                <option value="Abandonné">Abandonné</option>
              </select>
              <label>Urgent</label>
              <input
                type="checkbox"
                name="urgent"
                checked={newTask.urgent}
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    urgent: e.target.checked,
                  });
                }}
              />
              <button type="submit">Ajouter la tâche</button>
              <button type="button" onClick={closeModal}>
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
