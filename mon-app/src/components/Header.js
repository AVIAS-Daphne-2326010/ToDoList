import Chart from "./Chart.js";
import '../css/Header.css';

const Header = ({ taches = [] }) => {
    const completedTasks = taches.filter(t => t.etat === "Terminé").length;
    
    return (
        <div className="header">
            {taches.length} Tâches ({completedTasks} terminées)
            <Chart taches={taches} /> 
        </div>
    );
}

export default Header