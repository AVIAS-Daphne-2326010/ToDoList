import React from "react";

const Chart = ({ taches }) => {
  const stats = taches.reduce((acc, tache) => {
    acc[tache.etat] = (acc[tache.etat] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
  let startAngle = 0;

  const colors = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  return (
    <svg width="70" height="70" viewBox="-100 -100 200 200">
      {Object.entries(stats).map(([etat, count], index) => {
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
          <path key={etat} d={pathData} fill={colors[index % colors.length]} />
        );
      })}
    </svg>
  );
};

export default Chart;
