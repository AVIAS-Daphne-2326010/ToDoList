import React, {useEffect, useState} from "react";
import './App.css';
import todo from '../../datas.json'; //a enlever
import Header from '../header/Header';
import Footer from '../footer/Footer';
import TaskList from '../taskList/TaskList';
import CategoryList from '../categoryList/CategoryList';
import InitialModal from '../initialModal/InitialModal';
import TaskModal from '../taskModal/TaskModal';
import CategoryModal from '../categoryModal/CategoryModal';
import { ETAT_TERMINE } from '../../enums/Etats';

function App() {
  const [currentView, setCurrentView] = useState('tasks');
  const [currentTodos, setCurrentTodos] = useState({
    taches: [], 
    categories: []
  });
  const [isInitialModalOpen, setIsInitialModalOpen] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    etats: [],
    categories: [],
    urgentOnly: false,
    showCompleted: false
  });
  const [sortBy, setSortBy] = useState('date_echeance');

  //chargement initial
  useEffect(() => {
    const storedData = localStorage.getItem('todoData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData) {
          setCurrentTodos({
            taches: parsedData.taches || [],
            categories: parsedData.categories || []
          });
          setIsInitialModalOpen(false);
        }
      } catch (e) {
        console.error("Erreur de parsing des données", e);
      }
    }
  }, []);

  //sauvegarde
  useEffect(() => {
    if (currentTodos) {
      localStorage.setItem('todoData', JSON.stringify(currentTodos));
    }
  }, [currentTodos]);

  const loadFromJSON = (jsonData) => {
    setCurrentTodos(jsonData);
    setIsInitialModalOpen(false);
  };

  const startNewProject = () => {
    setCurrentTodos({
      taches: [],
      categories: []
    });
    setIsInitialModalOpen(false);
  };

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
      categorie: Array.isArray(newTask.categorie) ? newTask.categorie : []
    };
  
    setCurrentTodos(prev => ({
      ...prev,
      taches: [...prev.taches, taskToAdd]
    }));
    setIsTaskModalOpen(false);
  }

  const updateTask = (updatedTask) => {
    setCurrentTodos(prev => ({
      ...prev,
      taches:prev.taches.map(task =>
        task.id===updatedTask.id?updatedTask:task
      )
    }));
  };

  const deleteTask = (taskId) => {
    setCurrentTodos(prev => ({
      ...prev,
      taches: prev.taches.filter(task => task.id !== taskId)
    }));
  }

  const addCategory = (newCategory) => {
    setCurrentTodos(prev => ({
      ...prev,
      categories: [...prev.categories, {...newCategory,id:Date.now()}]
    }));
    setIsCategoryModalOpen(false);
  }

  const updateCategory = (updatedCategory) => {
    setCurrentTodos(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    }));
  };

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

  const toggleView = () => {
    setCurrentView(prev => prev === 'tasks' ? 'categories' : 'tasks');
  };

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
