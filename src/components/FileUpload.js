import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
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
        
        onFileUpload(parsedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please ensure it has the correct format.');
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      parseExcelFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      parseExcelFile(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const downloadTemplate = () => {
    const templateData = [
      ['Name', 'Quadrant', 'Ring', 'Description', 'Notes'],
      ['React', 'Languages & Frameworks', 'Adopt', 'Popular frontend framework', 'Widely adopted'],
      ['TypeScript', 'Languages & Frameworks', 'Trial', 'Typed JavaScript', 'Worth exploring'],
      ['Docker', 'Platforms', 'Adopt', 'Containerization platform', 'Production ready'],
      ['Kubernetes', 'Platforms', 'Assess', 'Container orchestration', 'Evaluate for scaling'],
      ['Webpack', 'Tools & Technology', 'Hold', 'Module bundler', 'Consider alternatives']
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Technology Radar Template');
    
    XLSX.writeFile(wb, 'technology_radar_template.xlsx');
  };

  return (
    <div className="file-upload">
      <div className="upload-section">
        <h3>Upload Technology Radar Data</h3>
        <p>Upload an Excel file where each sheet represents a group and contains technology items with quadrants and rings.</p>
        
        <div 
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          <div className="drop-zone-content">
            <p>📁 Click to select or drag & drop Excel file here</p>
            <p className="file-types">Supported: .xlsx, .xls</p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        <div className="template-section">
          <p>Don't have a template? Download our sample format:</p>
          <button onClick={downloadTemplate} className="download-template-btn">
            📥 Download Template
          </button>
        </div>
        
        <div className="format-info">
          <h4>Expected Excel Format:</h4>
          <ul>
            <li><strong>Each sheet = One group</strong></li>
            <li><strong>Columns:</strong> Name, Quadrant, Ring, Description, Notes</li>
            <li><strong>Quadrants:</strong> Tools & Technology, Products & Libraries, Languages & Frameworks, Platforms</li>
            <li><strong>Rings:</strong> Adopt, Trial, Assess, Hold</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
