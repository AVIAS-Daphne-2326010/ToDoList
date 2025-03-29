import React, {useEffect, useState} from "react";
import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import TaskList from '../taskList/TaskList';
import CategoryList from '../categoryList/CategoryList';
import InitialModal from '../initialModal/InitialModal';
import TaskModal from '../taskModal/TaskModal';
import CategoryModal from '../categoryModal/CategoryModal';
import { ETAT_TERMINE } from '../../enums/Etats';

function App() {
  // Gére la vue actuelle
  const [currentView, setCurrentView] = useState('tasks');
  
  // Gére le stockage des tâches et des catégories
  const [currentTodos, setCurrentTodos] = useState({
    taches: [], 
    categories: []
  });

  // Gére l'ouverture de la modale initiale
  const [isInitialModalOpen, setIsInitialModalOpen] = useState(true);

  // Gére les modales de tâches et de catégories
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Gére les filtres des tâches
  const [filters, setFilters] = useState({
    etats: [],
    categories: [],
    urgentOnly: false,
    showCompleted: false
  });

  // Gére la gestion du tri des tâches
  const [sortBy, setSortBy] = useState('date_echeance');

  // Effet de chargement initial
  useEffect(() => {
    const storedData = localStorage.getItem('todoData');
    const hasChosenFile = localStorage.getItem('hasChosenFile');
  
    // Affiche la popup uniquement si l'utilisateur n'a pas encore choisi un fichier ou un projet
    if (!storedData || hasChosenFile !== 'true') {
      setIsInitialModalOpen(true);
    } else {
      try {
        const parsedData = JSON.parse(storedData);
        setCurrentTodos({
          taches: parsedData.taches || [],
          categories: parsedData.categories || []
        });
      } catch (e) {
        console.error("Erreur de parsing des données", e);
      }
    }
  }, []);


  // Effet pour sauvegarder les données si mise à jours
  useEffect(() => {
    if (currentTodos) {
      localStorage.setItem('todoData', JSON.stringify(currentTodos));
    }
  }, [currentTodos]);

  // Fonction chargeant les données depuis un fichier JSON
  const loadFromJSON = (jsonData) => {
    setCurrentTodos(jsonData);
    localStorage.setItem('todoData', JSON.stringify(jsonData));
    localStorage.setItem('hasChosenFile', 'true');
    setIsInitialModalOpen(false); 
  };
  
  // Fonction démarrant un nouveau projet
  const startNewProject = () => {
    setCurrentTodos({
      taches: [],
      categories: []
    });
    localStorage.setItem('todoData', JSON.stringify({ taches: [], categories: [] }));
    localStorage.setItem('hasChosenFile', 'true');
    setIsInitialModalOpen(false); 
  };
  
  // Fonction ajoutant une nouvelle tâche
  const addTask = (newTask) => {
    if (!newTask.title || newTask.title.length < 3) {
      console.error("Le titre doit contenir au moins 3 caractères");
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description || "",
      date_creation: new Date().toISOString(),
      date_echeance: newTask.date_echeance || "",
      etat: newTask.etat || "Nouveau",
      urgent: newTask.urgent || false,
      categorie: newTask.categorie || []
    };
  
    setCurrentTodos(prev => ({
      ...prev,
      taches: [...prev.taches, taskToAdd]
    }));
    setIsTaskModalOpen(false);
  }

  // Fonction mettant à jour une tâche existante
  const updateTask = (updatedTask) => {
    setCurrentTodos(prev => ({
      ...prev,
      taches: prev.taches.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  // Fonction supprimant une tâche
  const deleteTask = (taskId) => {
    setCurrentTodos(prev => ({
      ...prev,
      taches: prev.taches.filter(task => task.id !== taskId)
    }));
  }

  // Fonction ajoutant une nouvelle catégorie
  const addCategory = (newCategory) => {
    setCurrentTodos(prev => ({
      ...prev,
      categories: [...prev.categories, {...newCategory,id:Date.now()}]
    }));
    setIsCategoryModalOpen(false);
  }

  // Fonction mettant à jour une catégorie
  const updateCategory = (updatedCategory) => {
    setCurrentTodos(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    }));
  };

  // Fonction supprimant une catégorie
  const deleteCategory = (categoryId) => {
    setCurrentTodos(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category.id !== categoryId),
      taches: prev.taches.map(task => ({
        ...task,
        categorie: task.categorie.filter(catId => catId !== categoryId)
      }))
    }));
  };

  // Fonction basculant entre les vues
  const toggleView = () => {
    setCurrentView(prev => prev === 'tasks' ? 'categories' : 'tasks');
  };

  // Filtre des tâches selon les critères définis
  const filteredTasks = currentTodos.taches.filter(task => {
    // Filtre par état
    if (filters.etats.length > 0 && !filters.etats.includes(task.etat)) {
      return false;
    }

    // Filtre par catégorie
    if (filters.categories.length > 0 && 
      (!task.categorie || !task.categorie.some(catId => filters.categories.includes(catId)))){
      return false;
    }

    // Filtre urgence
    if (filters.urgentOnly && !task.urgent) return false;

    // Filtre tâches terminées
    if (!filters.showCompleted && ETAT_TERMINE.includes(task.etat)) return false;
    
    return true;
  });
  
  // Trie des tâches selon le cirtère sélectionné
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date_echeance') {
      return new Date(a.date_echeance) - new Date(b.date_echeance);
    }
    if (sortBy === 'date_creation') {
      return new Date(a.date_creation) - new Date(b.date_creation);
    }
    if (sortBy === 'nom') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="App">
      <Header taches={currentTodos.taches} />
      
      {currentView === 'tasks' ? (
        <TaskList 
          tasks={sortedTasks}
          categories={currentTodos.categories}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      ) : (
        <CategoryList 
          categories={currentTodos.categories}
          onAddCategory={() => setIsCategoryModalOpen(true)}
          onDeleteCategory={deleteCategory}
          onUpdateCategory={updateCategory} 
        />
      )}

      <Footer 
        onAddTask={() => setIsTaskModalOpen(true)}
        onAddCategorie={()=>setIsCategoryModalOpen(true)}
        onToggleView={toggleView}
        currentView={currentView}
      />

      <InitialModal 
        isOpen={isInitialModalOpen}
        onLoadFromJSON={loadFromJSON}
        onStartNew={startNewProject}
      />

      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={addTask}
        categories={currentTodos.categories}
      />

      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={addCategory}
      />
    </div>
  );

}

export default App;
