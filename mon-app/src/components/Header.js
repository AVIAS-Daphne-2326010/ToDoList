import Chart from "./Chart.js";
import '../css/Header.css';

const Header = ({taches = []}) => {
    const nbTaches = taches.length;

    return (
        <div className="header">
            {nbTaches} Tâches
            <Chart taches={taches}/> 
        </div>
    );
  }
export default Header