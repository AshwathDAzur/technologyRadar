import React from 'react';
import './TechnologyRadar.css';

const TechnologyRadar = ({ data, groupName }) => {
  if (!data) return <div>No data available</div>;

  const quadrants = {
    'Tools & Technology': [],
    'Products & Libraries': [],
    'Languages & Frameworks': [],
    'Platforms': []
  };

  // Categorize data into quadrants
  data.forEach(item => {
    if (item.quadrant && quadrants[item.quadrant]) {
      quadrants[item.quadrant].push(item);
    }
  });

  const renderQuadrant = (quadrantName, items) => {
    const getRingClass = (ring) => {
      switch (ring.toLowerCase()) {
        case 'adopt': return 'ring-adopt';
        case 'trial': return 'ring-trial';
        case 'assess': return 'ring-assess';
        case 'hold': return 'ring-hold';
        default: return 'ring-unknown';
      }
    };

    return (
      <div className="quadrant" key={quadrantName}>
        <h3>{quadrantName}</h3>
        <div className="quadrant-content">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`radar-item ${getRingClass(item.ring)}`}
              title={`${item.name} - ${item.ring} (${item.description || 'No description'})`}
            >
              <span className="item-name">{item.name}</span>
              <span className="item-ring">{item.ring}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="technology-radar">
      <h2>Technology Radar - {groupName}</h2>
      
      <div className="radar-grid">
        <div className="radar-quadrants">
          {Object.entries(quadrants).map(([quadrantName, items]) => 
            renderQuadrant(quadrantName, items)
          )}
        </div>
        
        <div className="radar-rings">
          <div className="ring ring-adopt">
            <h4>Adopt</h4>
            <p>Technologies that are proven and ready for production use</p>
          </div>
          <div className="ring ring-trial">
            <h4>Trial</h4>
            <p>Technologies worth exploring with the goal of understanding how they fit into your strategy</p>
          </div>
          <div className="ring ring-assess">
            <h4>Assess</h4>
            <p>Technologies that you think are worth exploring with the goal of understanding how they fit into your strategy</p>
          </div>
          <div className="ring ring-hold">
            <h4>Hold</h4>
            <p>Technologies that are not recommended for new projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyRadar;
