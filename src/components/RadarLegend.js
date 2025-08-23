import React from 'react';
import './RadarLegend.css';

const RadarLegend = () => {
  const legendItems = [
    {
      title: 'Adopt',
      description: 'Technologies that are proven and ready for production use',
      color: '#10b981',
      examples: ['React', 'Node.js', 'Docker', 'Git']
    },
    {
      title: 'Trial',
      description: 'Technologies worth exploring with the goal of understanding how they fit into your strategy',
      color: '#3b82f6',
      examples: ['TypeScript', 'Vue.js', 'MongoDB', 'Vite']
    },
    {
      title: 'Assess',
      description: 'Technologies that you think are worth exploring with the goal of understanding how they fit into your strategy',
      color: '#f59e0b',
      examples: ['Angular', 'Kubernetes', 'GraphQL', 'WebAssembly']
    },
    {
      title: 'Hold',
      description: 'Technologies that are not recommended for new projects',
      color: '#ef4444',
      examples: ['jQuery', 'AngularJS', 'PHP 5', 'Internet Explorer']
    }
  ];

  return (
    <div className="radar-legend">
      <div className="legend-header">
        <h3>📊 Technology Radar Legend</h3>
        <p>Understanding the adoption strategy for different technologies</p>
      </div>
      
      <div className="legend-grid">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item" style={{ '--item-color': item.color }}>
            <div className="legend-header-section">
              <div className="legend-color-indicator" style={{ backgroundColor: item.color }}></div>
              <h4>{item.title}</h4>
            </div>
            <p className="legend-description">{item.description}</p>
            <div className="legend-examples">
              <span className="examples-label">Examples:</span>
              <div className="example-tags">
                {item.examples.map((example, idx) => (
                  <span key={idx} className="example-tag">{example}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="legend-footer">
        <div className="legend-note">
          <h4>💡 How to Use This Radar</h4>
          <ul>
            <li><strong>Adopt:</strong> Use these technologies for new projects and encourage team adoption</li>
            <li><strong>Trial:</strong> Experiment with these in non-critical projects to evaluate fit</li>
            <li><strong>Assess:</strong> Research and evaluate these technologies for future consideration</li>
            <li><strong>Hold:</strong> Avoid using these for new projects, plan migration strategies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RadarLegend;
