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

  const getRingClass = (ring) => {
    switch (ring.toLowerCase()) {
      case 'adopt': return 'ring-adopt';
      case 'trial': return 'ring-trial';
      case 'assess': return 'ring-assess';
      case 'hold': return 'ring-hold';
      default: return 'ring-unknown';
    }
  };

  const getRingColor = (ring) => {
    switch (ring.toLowerCase()) {
      case 'adopt': return '#10b981';
      case 'trial': return '#3b82f6';
      case 'assess': return '#f59e0b';
      case 'hold': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderQuadrant = (quadrantName, items) => {
    return (
      <div className="quadrant" key={quadrantName}>
        <div className="quadrant-header">
          <h3>{quadrantName}</h3>
          <div className="quadrant-count">{items.length}</div>
        </div>
        <div className="quadrant-content">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`radar-item ${getRingClass(item.ring)}`}
              style={{
                '--ring-color': getRingColor(item.ring)
              }}
              title={`${item.name} - ${item.ring}\n${item.description || 'No description'}\n${item.notes || ''}`}
            >
              <div className="item-content">
                <span className="item-name">{item.name}</span>
                <span className="item-ring">{item.ring}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="technology-radar">
      <div className="radar-header">
        <h2>Technology Radar - {groupName}</h2>
        <div className="radar-stats">
          <div className="stat">
            <span className="stat-number">{data.length}</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat">
            <span className="stat-number">{Object.keys(quadrants).length}</span>
            <span className="stat-label">Quadrants</span>
          </div>
        </div>
      </div>
      
      <div className="radar-grid">
        <div className="radar-quadrants">
          {Object.entries(quadrants).map(([quadrantName, items]) => 
            renderQuadrant(quadrantName, items)
          )}
        </div>
        
        <div className="radar-rings">
          <div className="ring ring-adopt">
            <div className="ring-header">
              <div className="ring-indicator" style={{ backgroundColor: getRingColor('adopt') }}></div>
              <h4>Adopt</h4>
            </div>
            <p>Technologies that are proven and ready for production use</p>
          </div>
          <div className="ring ring-trial">
            <div className="ring-header">
              <div className="ring-indicator" style={{ backgroundColor: getRingColor('trial') }}></div>
              <h4>Trial</h4>
            </div>
            <p>Technologies worth exploring with the goal of understanding how they fit into your strategy</p>
          </div>
          <div className="ring ring-assess">
            <div className="ring-header">
              <div className="ring-indicator" style={{ backgroundColor: getRingColor('assess') }}></div>
              <h4>Assess</h4>
            </div>
            <p>Technologies that you think are worth exploring with the goal of understanding how they fit into your strategy</p>
          </div>
          <div className="ring ring-hold">
            <div className="ring-header">
              <div className="ring-indicator" style={{ backgroundColor: getRingColor('hold') }}></div>
              <h4>Hold</h4>
            </div>
            <p>Technologies that are not recommended for new projects</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default TechnologyRadar;
