import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyRadar from './components/TechnologyRadar';
import RadarLegend from './components/RadarLegend';
import { loadDefaultData } from './services/dataService';

function App() {
  const [radarData, setRadarData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load default data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await loadDefaultData();
        setRadarData(data);
        if (data && Object.keys(data).length > 0) {
          setSelectedGroup(Object.keys(data)[0]);
        }
      } catch (err) {
        console.error('Failed to load default data:', err);
        setError('Failed to load technology radar data. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo.svg" alt="PSIOg DIGITAL" className="logo" />
          </div>
          <div className="header-text">
            <h1>Technology Radar</h1>
            <p>Make informed technology decisions for your organization</p>
          </div>
        </div>
      </header>
      
      <main>
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading technology radar data...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : radarData ? (
          <div className="radar-container">
            <div className="group-selector">
              <label htmlFor="group-select">Select Group: </label>
              <select 
                id="group-select"
                value={selectedGroup || ''} 
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {Object.keys(radarData).map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            
            <TechnologyRadar 
              data={radarData[selectedGroup]} 
              groupName={selectedGroup}
            />
            
            <RadarLegend />
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
