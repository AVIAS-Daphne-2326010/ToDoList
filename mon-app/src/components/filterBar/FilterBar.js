import React from 'react';
import { ETATS, ETAT_TERMINE } from '../../enums/Etats';
import './FilterBar.css';

// Fonction pour basculer la sélection d'un état de filtre
const FilterBar = ({ categories, filters, setFilters, sortBy, setSortBy }) => {
  const toggleEtatFilter = (etat) => {
    setFilters(prev => ({
      ...prev,
      etats: prev.etats.includes(etat)
        ? prev.etats.filter(e => e !== etat)
        : [...prev.etats, etat]
    }));
  };

  // Fonction pour basculer la sélection d'une catégorie de filtre
  const toggleCategoryFilter = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  return (
    <div className="filter-bar">
      {/* Section pour le tri des éléments */}
      <div className="filter-group">
        <h4>Trier par:</h4>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date_echeance">Date d'échéance</option>
          <option value="date_creation">Date de création</option>
          <option value="nom">Nom</option>
        </select>
      </div>

      {/* Section pour filtrer par état */}
      <div className="filter-group">
        <h4>Filtrer par état:</h4>
        {Object.values(ETATS).map(etat => (
          <label key={etat} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.etats.includes(etat)}
              onChange={() => toggleEtatFilter(etat)}
            />
            {etat}
          </label>
        ))}
      </div>

      {/* Section pour filtrer par catégorie, seulement si des catégories existent */}
      {categories.length > 0 && (
        <div className="filter-group">
          <h4>Filtrer par catégorie:</h4>
          {categories.map(cat => (
            <label key={cat.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggleCategoryFilter(cat.id)}
              />
              <span style={{ color: cat.color }}>
                {cat.emoji} {cat.title}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Section pour des filtres supplémentaires comme "Urgentes seulement" et "Afficher les tâches terminées" */}
      <div className="filter-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.urgentOnly}
            onChange={() => setFilters(prev => ({
              ...prev,
              urgentOnly: !prev.urgentOnly
            }))}
          />
          Urgentes seulement
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.showCompleted}
            onChange={() => setFilters(prev => ({
              ...prev,
              showCompleted: !prev.showCompleted
            }))}
          />
          Afficher les tâches terminées
        </label>
      </div>
    </div>
  );
};

export default FilterBar;