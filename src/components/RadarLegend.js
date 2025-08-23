import React from 'react';
import './RadarLegend.css';

const RadarLegend = () => {
  return (
    <div className="radar-legend">
      <h3>Understanding the Technology Radar</h3>
      
      <div className="legend-content">
        <div className="legend-section">
          <h4>🔄 Radar Rings</h4>
          <div className="ring-explanations">
            <div className="ring-item adopt">
              <span className="ring-color adopt"></span>
              <div>
                <strong>Adopt</strong>
                <p>Technologies that are proven and ready for production use. Your team should be using these technologies for new projects.</p>
              </div>
            </div>
            
            <div className="ring-item trial">
              <span className="ring-color trial"></span>
              <div>
                <strong>Trial</strong>
                <p>Technologies worth exploring with the goal of understanding how they fit into your strategy. Use for non-critical projects.</p>
              </div>
            </div>
            
            <div className="ring-item assess">
              <span className="ring-color assess"></span>
              <div>
                <strong>Assess</strong>
                <p>Technologies that you think are worth exploring with the goal of understanding how they fit into your strategy.</p>
              </div>
            </div>
            
            <div className="ring-item hold">
              <span className="ring-color hold"></span>
              <div>
                <strong>Hold</strong>
                <p>Technologies that are not recommended for new projects. Consider migration strategies for existing usage.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>📍 Quadrants</h4>
          <div className="quadrant-explanations">
            <div className="quadrant-item">
              <strong>Tools & Technology</strong>
              <p>Development tools, build systems, testing frameworks, and other technical tools</p>
            </div>
            
            <div className="quadrant-item">
              <strong>Products & Libraries</strong>
              <p>Third-party products, open-source libraries, and software solutions</p>
            </div>
            
            <div className="quadrant-item">
              <strong>Languages & Frameworks</strong>
              <p>Programming languages, web frameworks, and application frameworks</p>
            </div>
            
            <div className="quadrant-item">
              <strong>Platforms</strong>
              <p>Infrastructure platforms, cloud services, and deployment environments</p>
            </div>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>💡 How to Use</h4>
          <ul>
            <li><strong>Strategic Planning:</strong> Use the radar to align technology decisions with business goals</li>
            <li><strong>Team Alignment:</strong> Ensure all teams understand which technologies to adopt or avoid</li>
            <li><strong>Risk Management:</strong> Identify technologies that may pose risks to your organization</li>
            <li><strong>Innovation Tracking:</strong> Monitor how your technology landscape evolves over time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RadarLegend;
