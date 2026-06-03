const fs = require('fs');

const data = [
  { "name": "Restaurant-Saga", "description": "An interactive machine learning web app predicting restaurant success based on coordinates in Dhaka using RandomForestRegressor and heatmaps.", "language": "Python", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Restaurant-Saga", "accent": "#2a6693" },
  { "name": "Way-to-BRAC", "description": "A Java-based Pathfinder GUI application using graph-based pathfinding systems to map areas, nodes, and calculate multiple optimal routes.", "language": "Java", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Way-to-BRAC", "accent": "#4483b0" },
  { "name": "Gun-detection-with-yolov10", "description": "Advanced computer vision model leveraging YOLOv10 for real-time object detection and safety monitoring.", "language": "Python", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Gun-detection-with-yolov10", "accent": "#639cc4" },
  { "name": "Robo-Pekka", "description": "A robotics/algorithmic project developed in C++.", "language": "C++", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Robo-Pekka", "accent": "#8cb6d5" },
  { "name": "mango", "description": "A TypeScript-based web project.", "language": "TypeScript", "url": "https://github.com/Tasrif-Ahmed-Mohsin/mango", "accent": "#1a8a7a" },
  { "name": "Graph-DSA", "description": "DSA practice and graph algorithms implementations.", "language": "Java", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Graph-DSA", "accent": "#2a6693" },
  { "name": "Parking_System", "description": "A parking management system.", "language": "Java", "url": "https://github.com/Tasrif-Ahmed-Mohsin/Parking_System", "accent": "#4483b0" },
  { "name": "lab-Sorting", "description": "Sorting algorithms and lab assignments.", "language": "Java", "url": "https://github.com/Tasrif-Ahmed-Mohsin/lab-Sorting", "accent": "#639cc4" },
  { "name": "webpath", "description": "A front-end web project.", "language": "HTML/CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/webpath", "accent": "#8cb6d5" },
  { "name": "parkway", "description": "A web interface for parking solutions.", "language": "HTML/CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/parkway", "accent": "#1a8a7a" },
  { "name": "TradePulse", "description": "A trading/financial data pulse tracker.", "language": "JavaScript", "url": "https://github.com/Tasrif-Ahmed-Mohsin/TradePulse", "accent": "#2a6693" },
  { "name": "drink", "description": "A creative UI layout.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/drink", "accent": "#4483b0" },
  { "name": "flappy", "description": "A web-based game implementation.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/flappy", "accent": "#639cc4" },
  { "name": "homepgJuice", "description": "Landing page design for a juice brand.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/homepgJuice", "accent": "#8cb6d5" },
  { "name": "juice", "description": "E-commerce or product display layout.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/juice", "accent": "#1a8a7a" },
  { "name": "juicepr", "description": "Product presentation site.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/juicepr", "accent": "#2a6693" },
  { "name": "management", "description": "A management dashboard layout.", "language": "CSS", "url": "https://github.com/Tasrif-Ahmed-Mohsin/management", "accent": "#4483b0" },
  { "name": "market", "description": "A marketplace UI or logic implementation.", "language": "JavaScript", "url": "https://github.com/Tasrif-Ahmed-Mohsin/market", "accent": "#639cc4" },
  { "name": "myscrap", "description": "Web scraping or data gathering tool.", "language": "Python", "url": "https://github.com/Tasrif-Ahmed-Mohsin/myscrap", "accent": "#8cb6d5" },
  { "name": "structure", "description": "Data structures implementation.", "language": "Java", "url": "https://github.com/Tasrif-Ahmed-Mohsin/structure", "accent": "#1a8a7a" },
  { "name": "tukii", "description": "A front-end interface project.", "language": "HTML", "url": "https://github.com/Tasrif-Ahmed-Mohsin/tukii", "accent": "#2a6693" }
];

let output = "const PROJECTS = [\n";
data.forEach(p => {
  output += `    {
        title: '${p.name}',
        description: '${p.description}',
        tech: ['${p.language || 'Code'}'],
        link: '${p.url}',
        accent: '${p.accent}',
    },\n`;
});
output += "];";

fs.writeFileSync('e:/art/projects_array.js', output);
console.log('Done');
