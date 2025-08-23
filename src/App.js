import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import TechnologyRadar from './components/TechnologyRadar';
import RadarLegend from './components/RadarLegend';

function App() {
  const [radarData, setRadarData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('radar');

  // Load Excel data from public directory on component mount
  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        
        // Fetch the Excel file from the public directory
        const response = await fetch('/technology_radar_data.xlsx');
        if (!response.ok) {
          throw new Error('Failed to load Excel file');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: 'array' });
        const parsedData = {};
        
        // Each sheet represents a group
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length > 1) { // Skip empty sheets
            const headers = jsonData[0];
            const rows = jsonData.slice(1);
            
            const technologyItems = rows
              .filter(row => row.length >= 3) // Ensure we have at least name, quadrant, and ring
              .map(row => {
                const item = {};
                headers.forEach((header, index) => {
                  if (header && row[index] !== undefined) {
                    item[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
                  }
                });
                return item;
              })
              .filter(item => item.name && item.quadrant && item.ring); // Filter valid items
            
            if (technologyItems.length > 0) {
              parsedData[sheetName] = technologyItems;
            }
          }
        });
        
        setRadarData(parsedData);
        if (Object.keys(parsedData).length > 0) {
          setSelectedGroup(Object.keys(parsedData)[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading Excel file:', err);
        setError('Failed to load technology radar data. Please ensure the Excel file is available.');
        setLoading(false);
      }
    };

    loadExcelData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Technology Radar</h1>
          <p>Loading technology data...</p>
        </header>
        <main className="loading-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading technology radar data from Excel file...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Technology Radar</h1>
          <p>Error loading data</p>
        </header>
        <main className="error-main">
          <div className="error-container">
            <h3>⚠️ Error Loading Data</h3>
            <p>{error}</p>
            <p>Please ensure that <code>technology_radar_data.xlsx</code> exists in the public directory.</p>
          </div>
        </main>
      </div>
    );
  }

  const tabs = [
    { id: 'radar', label: '📊 Radar View', icon: '📊' },
    { id: 'legend', label: '📖 Legend', icon: '📖' },
    { id: 'info', label: 'ℹ️ Info', icon: 'ℹ️' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Technology Radar</h1>
            <p>Make informed technology decisions for your organization</p>
          </div>
          <div className="header-right">
            <div className="group-selector-compact">
              <label htmlFor="group-select">Team:</label>
              <select 
                id="group-select"
                value={selectedGroup || ''} 
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {Object.keys(radarData || {}).map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <div className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'radar' && (
            <div className="radar-tab">
              <TechnologyRadar 
                data={radarData[selectedGroup]} 
                groupName={selectedGroup}
              />
            </div>
          )}

          {activeTab === 'legend' && (
            <div className="legend-tab">
              <RadarLegend />
            </div>
          )}

          {activeTab === 'info' && (
            <div className="info-tab">
              <div className="info-card">
                <h3>📊 Technology Radar Data</h3>
                <p>This application displays technology radar data loaded from an Excel file in the public directory.</p>
                <div className="data-summary">
                  <p><strong>Available Teams:</strong> {radarData ? Object.keys(radarData).length : 0}</p>
                  <p><strong>Current Team:</strong> {selectedGroup || 'None'}</p>
                  <p><strong>Technologies:</strong> {radarData && selectedGroup ? radarData[selectedGroup].length : 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
