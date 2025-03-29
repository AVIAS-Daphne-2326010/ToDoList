import React from "react";

const Chart = ({ taches }) => {
  // Réduit les tâches pour obtenir la répartition par état
  const stats = taches.reduce((acc, tache) => {
    acc[tache.etat] = (acc[tache.etat] || 0) + 1;
    return acc;
  }, {});

  // Calcule le total des tâches
  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
  let startAngle = 0;

  // Palette de couleurs pour chaque état
  const colors = ["#5c8b91", "#7ca2a7", "#9db9bd", "#bdd0d3"];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
      {/* Graphique */}
      <svg width="70" height="70" viewBox="-100 -100 200 200">
        {Object.entries(stats).map(([etat, count], index) => {
          // Calcule l'angle du secteur pour chaque état
          const angle = (count / total) * 360;
          const endAngle = startAngle + angle;
          const largeArc = angle > 180 ? 1 : 0;

          // Calcul des coordonnées pour le dessin SVG
          const x1 = 100 * Math.cos((Math.PI * startAngle) / 180);
          const y1 = 100 * Math.sin((Math.PI * startAngle) / 180);
          const x2 = 100 * Math.cos((Math.PI * endAngle) / 180);
          const y2 = 100 * Math.sin((Math.PI * endAngle) / 180);

          const pathData = `
            M 0 0
            L ${x1} ${y1}
            A 100 100 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          startAngle = endAngle;

          return (
            // Dessine chaque secteur du graphique en fonction des données
            <path key={etat} d={pathData} fill={colors[index % colors.length]} />
          );
        })}
      </svg>

      {/* Légende en dessous */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {Object.keys(stats).map((etat, index) => (
          <div key={etat} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colors[index % colors.length],
                display: "inline-block",
                borderRadius: "3px",
              }}
            ></span>
            <span style={{ fontSize: "14px", color: "#333" }}>{etat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
