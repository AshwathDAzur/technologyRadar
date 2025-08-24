# Technology Radar

A React-based application for creating and visualizing technology radar charts to help organizations make informed technology decisions.

## Features

- **Automatic Data Loading**: The app automatically loads technology radar data from an Excel file when it starts
- **Interactive Radar Charts**: Visualize technologies across quadrants and rings
- **Modern UI/UX**: Beautiful interface with organization-branded theme colors
- **Group Selection**: Switch between different technology groups
- **Responsive Design**: Works on desktop and mobile devices
- **Professional Branding**: PSIOg DIGITAL logo and theme integration

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. **Important**: Place your Excel file in the `public` folder with the name `technology_radar_data.xlsx`

4. Start the development server:
   ```bash
   npm start
   ```

The app will automatically load the Excel data when it starts.

## Excel File Format

Your Excel file should follow this structure:

- **Each sheet represents a group** (e.g., "Frontend", "Backend", "DevOps")
- **Required columns**:
  - Name: Technology name
  - Quadrant: Category (Tools & Technology, Products & Libraries, Languages & Frameworks, Platforms)
  - Ring: Adoption level (Adopt, Trial, Assess, Hold)
  - Description: Brief description (optional)
  - Notes: Additional notes (optional)

### Example Data

| Name | Quadrant | Ring | Description | Notes |
|------|----------|------|-------------|-------|
| React | Languages & Frameworks | Adopt | Popular frontend framework | Widely adopted |
| TypeScript | Languages & Frameworks | Trial | Typed JavaScript | Worth exploring |
| Docker | Platforms | Adopt | Containerization platform | Production ready |

## How It Works

1. **Automatic Loading**: When the app starts, it automatically fetches `technology_radar_data.xlsx` from the public folder
2. **Data Parsing**: The Excel file is parsed and converted to the format needed for the radar chart
3. **Visualization**: Technologies are displayed on a radar chart based on their quadrant and ring values
4. **Professional Interface**: Clean, modern UI with organization branding

## Design & Branding

The application features:
- **PSIOg DIGITAL Logo**: Prominently displayed in the top-left corner
- **Theme Colors**: 
  - Primary Yellow: `#dcd500`
  - Primary Teal: `#2db7bc`
- **Modern UI Elements**: Gradient backgrounds, smooth animations, and responsive design
- **Professional Layout**: Clean typography and intuitive navigation

## Customization

### Changing the Default Data File

To use a different Excel file as the default:

1. Replace `public/technology_radar_data.xlsx` with your file
2. Ensure it follows the expected format
3. Restart the app

### Modifying the Data Loading

The data loading logic is in `src/services/dataService.js`. You can modify this file to:
- Load data from different sources
- Add data validation
- Implement caching
- Add error handling

### Updating Branding

To customize the branding:
- Replace `public/logo.svg` with your organization's logo
- Update the theme colors in `src/App.css` CSS variables
- Modify the header text in `src/App.js`

## Available Scripts

- `npm start`: Start the development server
- `npm build`: Build the app for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App (not recommended)

## Dependencies

- React 18
- XLSX for Excel file parsing
- Recharts for radar chart visualization
- CSS for styling and responsive design

## Troubleshooting

### Data Not Loading

1. Ensure `technology_radar_data.xlsx` exists in the `public` folder
2. Check the browser console for error messages
3. Verify the Excel file format matches the expected structure

### Styling Issues

1. Check that all CSS files are properly imported
2. Verify the logo file exists at `public/logo.svg`
3. Ensure the app is running the latest version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
