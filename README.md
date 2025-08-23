# Technology Radar

A modern React application for organizations to visualize and manage their technology landscape through an interactive radar interface. This tool helps teams make informed decisions about technology adoption, assessment, and retirement.

## Features

- **Excel Integration**: Upload Excel files with multiple sheets representing different groups
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
- **Template Download**: Get started with a sample Excel template

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

### Building for Production

```bash
npm run build
```

## Excel File Format

The application expects Excel files with the following structure:

### Sheet Structure
- **Each sheet represents one group** (e.g., "Frontend Team", "Backend Team", "DevOps")
- **Sheet names become group names** in the application

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

1. **Upload Excel File**: Drag and drop or click to select an Excel file
2. **Select Group**: Choose which group's technology radar to view
3. **Analyze Technologies**: View technologies organized by quadrant and ring
4. **Make Decisions**: Use the radar to inform technology strategy

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
│   ├── FileUpload.js         # Excel file upload and parsing
│   ├── RadarLegend.js        # Legend and explanations
│   └── *.css                 # Component-specific styles
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── *.css                     # Global styles
```

## Customization

### Adding New Quadrants
Modify the `quadrants` object in `TechnologyRadar.js`:

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
