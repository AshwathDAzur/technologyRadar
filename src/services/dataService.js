import * as XLSX from 'xlsx';

export const loadDefaultData = async () => {
  try {
    // Fetch the Excel file from the public folder
    const response = await fetch('/technology_radar_data.xlsx');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
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
    
    return parsedData;
  } catch (error) {
    console.error('Error loading default data:', error);
    throw error;
  }
};
