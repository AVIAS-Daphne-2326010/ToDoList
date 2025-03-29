import './Footer.css';

// Composant Footer qui prend en props les fonctions et états nécessaires
const Footer = ({ onAddTask, onAddCategorie, currentView, onToggleView }) => {
  return (
    <div className="footer">
      {/* Bouton pour ajouter une tâche ou une catégorie selon la vue actuelle */}
      <button 
        className="add-button" 
        onClick={currentView === 'tasks' ? onAddTask : onAddCategorie}>
      
      {/* Texte du bouton qui change selon la vue actuelle */}
      {currentView === 'tasks' ? 'Ajouter une tâche' : 'Ajouter une catégorie'}
      </button>
      
      {/* Bouton pour changer la vue entre tâches et catégories */}
      <button 
        className="view-toggle-button" 
        onClick={onToggleView}>
        {/* Texte du bouton qui change selon la vue actuelle */}
        {currentView === 'tasks' ? 'Changer de vue (Catégories)' : 'Changer de vue (Tâches)'}
      </button>
    </div>
  );
};
  
export default Footer;
