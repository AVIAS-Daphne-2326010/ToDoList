import './Footer.css';

const Footer = ({ onAddTask, onAddCategorie, currentView, onToggleView }) => {
  return (
    <div className="footer">
      <button 
        className="add-button" 
        onClick={currentView === 'tasks' ? onAddTask : onAddCategorie}>
      
      {currentView === 'tasks' ? 'Ajouter une tâche' : 'Ajouter une catégorie'}
      </button>
      
      <button 
        className="view-toggle-button" 
        onClick={onToggleView}>
        {currentView === 'tasks' ? 'Changer de vue (Catégories)' : 'Changer de vue (Tâches)'}
      </button>
    </div>
  );
};
  
export default Footer;