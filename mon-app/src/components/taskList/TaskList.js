import React from 'react';
import TaskItem from '../taskItem/TaskItem';
import FilterBar from '../filterBar/FilterBar';
import '../../css/Task.css';

// Composant TaskList qui affiche une liste de tâches avec des options de filtrage et de tri
const TaskList = ({ tasks, categories, onUpdateTask, onDeleteTask, filters, setFilters, sortBy, setSortBy }) => {
  return (
    <div className="task-container">
      {/* Affichage de la barre de filtres et de tri */}
      <FilterBar 
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="task-list">
         {/* Si aucune tâche n'est disponible, afficher un message */}
        {tasks.length === 0 ? (
          <p>Aucune tâche à afficher</p>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              categories={categories}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;