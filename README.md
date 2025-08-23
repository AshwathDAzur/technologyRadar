# Technology Radar

A modern React application for organizations to visualize and manage their technology landscape through an interactive radar interface. This tool helps teams make informed decisions about technology adoption, assessment, and retirement.

## Features

- **Excel File Integration**: Automatically loads technology radar data from an Excel file in the public directory
- **Pre-configured Teams**: Includes sample data for Frontend, Backend, and DevOps teams
- **Four Quadrants**: Organize technologies by category:
  - Tools & Technology
  - Products & Libraries
  - Languages & Frameworks
  - Platforms
- **Radar Rings**: Categorize technologies by adoption status:
  - **Adopt**: Ready for production use
  - **Trial**: Worth exploring for non-critical projects
  - **Assess**: Worth investigating further
  - **Hold**: Not recommended for new projects
- **Group Management**: Switch between different organizational groups
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Customization**: Modify the Excel file to add your own teams and technologies

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd technology-radar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically load with technology radar data from the Excel file located at `public/technology_radar_data.xlsx`.

### Building for Production

```bash
npm run build
```

## Excel File Structure

The application reads from an Excel file located at `public/technology_radar_data.xlsx`. Each sheet represents a different team in your organization.

### Sheet Structure
- **Each sheet represents one team** (e.g., "Frontend Team", "Backend Team", "DevOps")
- **Sheet names become team names** in the application

### Column Structure
| Column | Description | Required |
|--------|-------------|----------|
| Name | Technology/tool name | Yes |
| Quadrant | One of the four quadrants | Yes |
| Ring | Adoption status (Adopt/Trial/Assess/Hold) | Yes |
| Description | Brief description of the technology | No |
| Notes | Additional context or notes | No |

### Valid Quadrants
- Tools & Technology
- Products & Libraries
- Languages & Frameworks
- Platforms

### Valid Rings
- Adopt
- Trial
- Assess
- Hold

### Example Data
```
Name        | Quadrant                    | Ring   | Description
React       | Languages & Frameworks     | Adopt  | Popular frontend framework
TypeScript  | Languages & Frameworks     | Trial  | Typed JavaScript
Docker      | Platforms                  | Adopt  | Containerization platform
Kubernetes  | Platforms                  | Assess | Container orchestration
```

## Usage

1. **Automatic Data Loading**: Data loads automatically from the Excel file when the application starts
2. **Select Group**: Choose which team's technology radar to view from the dropdown
3. **Analyze Technologies**: View technologies organized by quadrant and ring
4. **Make Decisions**: Use the radar to inform technology strategy

## Customization

### Adding Your Own Data

To add your own teams and technologies, modify the Excel file `public/technology_radar_data.xlsx`:

1. **Add a new sheet** for each team
2. **Use the exact column headers**: Name, Quadrant, Ring, Description, Notes
3. **Ensure quadrants match exactly**: Tools & Technology, Products & Libraries, Languages & Frameworks, Platforms
4. **Use valid ring values**: Adopt, Trial, Assess, Hold

### Excel File Requirements

- **File location**: Must be placed in the `public/` directory
- **File name**: Must be `technology_radar_data.xlsx`
- **Format**: Excel (.xlsx) format
- **Sheets**: Each team should have its own sheet
- **Headers**: First row should contain column headers

### Adding New Quadrants

Update the `quadrants` object in `TechnologyRadar.js` to include new categories:

```javascript
const quadrants = {
  'Tools & Technology': [],
  'Products & Libraries': [],
  'Languages & Frameworks': [],
  'Platforms': [],
  'Your New Quadrant': []  // Add here
};
```

### Adding New Rings

Update the `getRingClass` function in `TechnologyRadar.js`:

```javascript
const getRingClass = (ring) => {
  switch (ring.toLowerCase()) {
    case 'adopt': return 'ring-adopt';
    case 'trial': return 'ring-trial';
    case 'assess': return 'ring-assess';
    case 'hold': return 'ring-hold';
    case 'your-new-ring': return 'ring-your-new-ring';  // Add here
    default: return 'ring-unknown';
  }
};
```

## Technology Stack

- **Frontend**: React 18
- **Styling**: CSS3 with modern features
- **Excel Parsing**: SheetJS (xlsx)
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── TechnologyRadar.js    # Main radar visualization
│   ├── RadarLegend.js        # Legend and explanations
│   └── *.css                 # Component-specific styles
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── *.css                     # Global styles
public/
└── technology_radar_data.xlsx # Excel file with technology data
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.

## Roadmap

- [ ] Export functionality for reports
- [ ] Historical tracking of technology changes
- [ ] Team collaboration features
- [ ] Integration with project management tools
- [ ] Advanced filtering and search
- [ ] Technology lifecycle management
- [ ] Excel file upload functionality (optional feature)
