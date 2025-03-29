import Chart from "../chart/Chart.js";
import './Header.css';

// Composant Header qui prend en prop une liste de tâches (taches)
const Header = ({ taches = [] }) => {
    // Calcul du nombre de tâches terminées
    const completedTasks = taches.filter(t => t.etat === "Terminé" || t.etat === "Réussi" || t.etat === "Abandonné").length;
    // Calcul du nombre de tâches non terminées
    const notCompletedTasks = taches.length - completedTasks;

    return (
        <div className="header">
            {taches.length} Tâches ({notCompletedTasks} non terminées)
            <Chart taches={taches} /> 
        </div>
    );
}

export default Header;
