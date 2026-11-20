// Reviewed against the public project READMEs and GitHub profile on 2026-11-20.
// Keep descriptions about implemented work, not inferred awards or production use.
const GITHUB = 'https://github.com/Tasrif-Ahmed-Mohsin';

export const CONTENT_UPDATED = '2026-11-20';
export const PROFILE_URL = GITHUB;

export const PROJECTS = [
    {
        title: 'Bluefin',
        category: 'FinTechathon 2026 · Student finance',
        description: 'A cross-border student finance agent for the Bangladesh–China corridor. Combines year-round funding plans, family-approved limits and passkey signatures in Bangla, English and Chinese. Sandbox only; no real money moves.',
        tech: ['FastAPI', 'React Native', 'Expo', 'Passkeys'],
        link: `${GITHUB}/finbuddy`, accent: '#2a6693',
    },
    {
        title: 'Grace · ROS2 Robotics',
        category: 'Controls & software',
        description: 'An MT12 controls submission with Arduino serial communication, sensor logging, forward and inverse arm kinematics, a fake-Arduino simulator and an interactive arm visualizer. Physical hardware validation is still pending.',
        tech: ['ROS2', 'Python', 'C++', 'Arduino'],
        link: `${GITHUB}/Grace`, accent: '#4483b0',
    },
    {
        title: 'KrishiVault',
        category: 'Agritech · Decision support',
        description: 'A post-harvest planner exploring when potato farmers should store or sell. Uses simulated price paths, storage costs and crop-backed credit to compare decisions.',
        tech: ['FastAPI', 'Monte Carlo', 'SMS / USSD'],
        link: `${GITHUB}/Krishi_Vault`, accent: '#1a8a7a',
    },
    {
        title: 'GridWise',
        category: 'Energy · Optimization',
        description: 'Turns campus operators’ plain-language notes into a minimum-cost, 24-hour electricity schedule. Combines DeepSeek interpretation, deterministic validation, linear programming and an independent replay check.',
        tech: ['FastAPI', 'SciPy', 'DeepSeek', 'Docker'],
        link: `${GITHUB}/bup-satorugojo`, accent: '#2a6693',
    },
    {
        title: 'Care Coordination Layer',
        category: 'Healthtech · Human oversight',
        description: 'A care-coordination system for Bangladesh connecting patients, coordinators and doctors. Rule-based urgency checks and a longitudinal record support human review; the system does not diagnose.',
        tech: ['TypeScript', 'Fastify', 'React'],
        link: `${GITHUB}/healthisgold`, accent: '#4483b0',
    },
    {
        title: 'Mati Kohon',
        category: 'Climate · Data storytelling',
        description: 'An interactive web story about rain, groundwater, floods and heat. Scroll-driven chapters, maps and charts present research using NASA POWER, GPM IMERG and GRACE satellite data.',
        tech: ['JavaScript', 'CSS', 'NASA Data'],
        link: `${GITHUB}/Mati-Kohon`, accent: '#1a8a7a',
    },
    {
        title: 'AgriCommerce · Mango',
        category: 'Full-stack · E-commerce',
        description: 'A farm-to-customer mango storefront with a persistent cart, order tracking and a JWT-secured admin panel.',
        tech: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind'],
        link: `${GITHUB}/mango`, accent: '#1a8a7a',
    },
    {
        title: 'Hit Your Heart Out',
        category: 'Interactive · Physics',
        description: 'A playful ragdoll sandbox built with Matter.js. Throw tomatoes, splash paint and watch the physics respond in real time.',
        tech: ['Next.js', 'Matter.js', 'HTML5 Canvas'],
        link: `${GITHUB}/HitMe`, accent: '#639cc4',
    },
    {
        title: 'CoWork Space API',
        category: 'ICT Fest · Backend',
        description: 'A multi-tenant room-booking REST API with JWT authentication, SQLAlchemy and a single-container Docker setup.',
        tech: ['FastAPI', 'SQLAlchemy', 'Docker'],
        link: `${GITHUB}/ICT_Fest_Hackathon_Preliminary_Tasrif`, accent: '#2a6693',
    },
    {
        title: 'Football Tournament Manager',
        category: 'CSE370 · Databases',
        description: 'A database project for managing tournaments, teams and fixtures, with an entity-relationship diagram and relational schema.',
        tech: ['PHP', 'MySQL', 'Docker'],
        link: `${GITHUB}/football-tournament`, accent: '#4483b0',
    },
    {
        title: 'Restaurant Success Predictor',
        category: 'Machine learning · Geospatial',
        description: 'An interactive web app exploring restaurant success in Dhaka from location coordinates, using Random Forest regression and heatmaps.',
        tech: ['Python', 'Scikit-Learn', 'Streamlit'],
        link: `${GITHUB}/Restaurant-Saga`, accent: '#2a6693',
    },
    {
        title: 'Gun Detection · YOLOv10',
        category: 'Computer vision',
        description: 'A computer vision project for localized firearm detection using YOLOv10 and a deep-learning inference pipeline.',
        tech: ['Python', 'YOLOv10', 'OpenCV'],
        link: `${GITHUB}/Gun-detection-with-yolov10`, accent: '#639cc4',
    },
    {
        title: 'Robo-Pekka Companion',
        category: 'Embedded systems',
        description: 'Robotics firmware for animated OLED eyes, a servo-driven neck and ultrasonic proximity tracking.',
        tech: ['C++', 'Arduino', 'Robotics'],
        link: `${GITHUB}/Robo-Pekka`, accent: '#4483b0',
    },
    {
        title: 'Way-to-BRAC Pathfinder',
        category: 'Algorithms · Desktop',
        description: 'A Java Swing interface that models Dhaka roads as a graph and explores routes with depth-first search.',
        tech: ['Java', 'Algorithms', 'GUI'],
        link: `${GITHUB}/Way-to-BRAC`, accent: '#4483b0',
    },
    {
        title: 'Walkway Path Finder',
        category: 'Algorithms · Web',
        description: 'An interactive, responsive learning tool for Dijkstra’s shortest-path algorithm.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: `${GITHUB}/webpath`, accent: '#639cc4',
    },
    {
        title: 'Parking System',
        category: 'Java · Application development',
        description: 'A parking-spot manager with a live status table and time-based fee calculation.',
        tech: ['Java', 'OOP'],
        link: `${GITHUB}/Parking_System`, accent: '#4483b0',
    },
    {
        title: 'Graph-DSA',
        category: 'Computer science foundations',
        description: 'Graph algorithm implementations and data-structure practice in Java.',
        tech: ['Java', 'Data Structures', 'Algorithms'],
        link: `${GITHUB}/Graph-DSA`, accent: '#2a6693',
    },
];

// Both the desktop constellation and mobile cards use this collection.
export const SKILL_CATEGORIES = [
    { id: 'lang', label: 'Languages', skills: ['Python', 'Java', 'C++', 'TypeScript', 'JavaScript', 'HTML/CSS'], color: '#639cc4' },
    { id: 'ai', label: 'AI & Data', skills: ['Machine Learning', 'Computer Vision', 'YOLOv10', 'Scikit-Learn', 'LLM Agents', 'SciPy'], color: '#a8e0f0' },
    { id: 'web', label: 'Web & Mobile', skills: ['React', 'Next.js', 'React Native', 'Expo', 'FastAPI', 'Fastify'], color: '#4483b0' },
    { id: 'tools', label: 'Tools', skills: ['Git', 'Docker', 'MySQL', 'MongoDB', 'SQLAlchemy', 'Arduino'], color: '#8cb6d5' },
    { id: 'core', label: 'Systems', skills: ['Data Structures', 'Algorithms', 'ROS2', 'Robotics', 'Optimization', 'Passkeys'], color: '#2a6693' },
];
