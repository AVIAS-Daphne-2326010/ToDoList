import '../css/Footer.css';

const Footer = ({ onAddTask, onAddCategorie }) => {
  return (
    <div className="footer">
      <button className="add-button" onClick={onAddTask}>
        Ajouter une tâche
      </button>
      <button className="add-button" onClick={onAddCategorie}>
        Ajouter une catégorie
      </button>
    </div>
  );
};
  
  export default Footer;