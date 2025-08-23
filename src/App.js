import React, { useState } from 'react';
import './App.css';
import TechnologyRadar from './components/TechnologyRadar';
import FileUpload from './components/FileUpload';
import RadarLegend from './components/RadarLegend';

function App() {
  const [radarData, setRadarData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleFileUpload = (data) => {
    setRadarData(data);
    if (data && Object.keys(data).length > 0) {
      setSelectedGroup(Object.keys(data)[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Technology Radar</h1>
        <p>Make informed technology decisions for your organization</p>
      </header>
      
      <main>
        <FileUpload onFileUpload={handleFileUpload} />
        
        {radarData && (
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
        )}
      </main>
    </div>
  );
}

export default App;
