import React from 'react';
import TaskItem from '../taskItem/TaskItem';
import FilterBar from '../filterBar/FilterBar';
import '../../css/Task.css';

const TaskList = ({ tasks, categories, onUpdateTask, onDeleteTask, filters, setFilters, sortBy, setSortBy }) => {
  return (
    <div className="task-container">
      <FilterBar 
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="task-list">
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