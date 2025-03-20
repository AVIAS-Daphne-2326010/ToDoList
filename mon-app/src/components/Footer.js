import '../css/Footer.css';

const Footer = ({ onAddTache, onAddCategorie }) => {
    return (
      <div className="footer">
        <button className="add-button" onClick={onAddTache}>
          Ajouter une tâche
        </button>
        <button className="add-button" onClick={onAddCategorie}>
          Ajouter une catégorie
        </button>
      </div>
    );
  };
  
  export default Footer;