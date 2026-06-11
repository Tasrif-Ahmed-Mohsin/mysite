import { useState, useEffect } from 'react';
import FloatingBubbles from './FloatingBubbles';
import SkillsParticleCanvas from './SkillsParticleCanvas';
import { 
    FaPython, FaJava, FaBrain, FaRobot, FaReact, FaNodeJs, FaDatabase, 
    FaCube, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaServer, FaPaintBrush, 
    FaFigma, FaSpider, FaGitAlt, FaPencilRuler, FaEye, FaProjectDiagram 
} from 'react-icons/fa';
import { 
    SiScikitlearn, SiCplusplus, SiTypescript, SiMysql, SiExpress, 
    SiPandas, SiJupyter 
} from 'react-icons/si';
import { MdOutlineWindow } from 'react-icons/md';

const TECH_ICONS = {
    'Python': <FaPython />,
    'Scikit-Learn': <SiScikitlearn />,
    'Machine Learning': <FaBrain />,
    'Java': <FaJava />,
    'Algorithms': <FaProjectDiagram />,
    'GUI': <MdOutlineWindow />,
    'Computer Vision': <FaEye />,
    'YOLOv10': <FaRobot />,
    'C++': <SiCplusplus />,
    'Robotics': <FaRobot />,
    'TypeScript': <SiTypescript />,
    'React': <FaReact />,
    'Node.js': <FaNodeJs />,
    'Data Structures': <FaDatabase />,
    'OOP': <FaCube />,
    'MySQL': <SiMysql />,
    'HTML': <FaHtml5 />,
    'CSS': <FaCss3Alt />,
    'JavaScript': <FaJs />,
    'Bootstrap': <FaBootstrap />,
    'API': <FaServer />,
    'UI Design': <FaPaintBrush />,
    'HTML5 Canvas': <FaHtml5 />,
    'Figma': <FaFigma />,
    'Express': <SiExpress />,
    'BeautifulSoup': <FaSpider />,
    'Pandas': <SiPandas />,
    'Git': <FaGitAlt />,
    'Jupyter Notebook': <SiJupyter />,
    'Software Design': <FaPencilRuler />,
    'HTML/CSS': <FaHtml5 />
};

const PROJECTS = [
    // --- Top 4 (Shown initially) ---
    // Left Column (Indices 0, 1)
    { title: 'Restaurant-Saga', description: 'An interactive machine learning web app predicting restaurant success based on coordinates in Dhaka using RandomForestRegressor and heatmaps.', tech: ['Python', 'Scikit-Learn', 'Machine Learning'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Restaurant-Saga', accent: '#2a6693' },
    { title: 'Robo-Pekka', description: 'A robotics/algorithmic pathfinding project developed in C++.', tech: ['C++', 'Robotics', 'Algorithms'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Robo-Pekka', accent: '#8cb6d5' },
    
    // Right Column (Indices 2, 3)
    { title: 'Graph-DSA', description: 'DSA practice and graph algorithms implementations.', tech: ['Java', 'Data Structures', 'Algorithms'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Graph-DSA', accent: '#2a6693' },
    { title: 'Way-to-BRAC', description: 'A Java-based GUI application using graph-based systems to map areas, nodes, and calculate multiple optimal routes.', tech: ['Java', 'Algorithms', 'GUI'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Way-to-BRAC', accent: '#4483b0' },

    // --- The rest (Shown on expand) ---
    { title: 'Gun-detection-with-yolov10', description: 'Advanced computer vision model leveraging YOLOv10 for real-time object detection and safety monitoring.', tech: ['Python', 'Computer Vision', 'YOLOv10'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Gun-detection-with-yolov10', accent: '#639cc4' },
    { title: 'mango', description: 'A TypeScript-based scalable web project.', tech: ['TypeScript', 'React', 'Node.js'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/mango', accent: '#1a8a7a' },
    { title: 'TradePulse', description: 'A comprehensive trading and financial data pulse tracker that aggregates market trends in real-time.', tech: ['JavaScript', 'React', 'API'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/TradePulse', accent: '#2a6693' },
    { title: 'lab-Sorting', description: 'Sorting algorithms and lab assignments.', tech: ['Java', 'Algorithms'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/lab-Sorting', accent: '#639cc4' },
    { title: 'myscrap', description: 'An automated web scraping tool built with Python and BeautifulSoup to extract and process datasets.', tech: ['Python', 'BeautifulSoup', 'Pandas'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/myscrap', accent: '#8cb6d5' },
    { title: 'webpath', description: 'A front-end web project.', tech: ['HTML', 'CSS', 'JavaScript'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/webpath', accent: '#8cb6d5' },
    { title: 'Parking_System', description: 'A complete parking management system utilizing OOP principles in Java and a MySQL database.', tech: ['Java', 'OOP', 'MySQL'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/Parking_System', accent: '#4483b0' },
    { title: 'parkway', description: 'A web interface for parking solutions.', tech: ['HTML', 'CSS', 'Bootstrap'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/parkway', accent: '#1a8a7a' },
    { title: 'drink', description: 'A creative UI layout.', tech: ['CSS', 'HTML', 'UI Design'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/drink', accent: '#4483b0' },
    { title: 'flappy', description: 'A web-based game implementation.', tech: ['CSS', 'JavaScript', 'HTML5 Canvas'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/flappy', accent: '#639cc4' },
    { title: 'homepgJuice', description: 'Landing page design for a juice brand.', tech: ['CSS', 'HTML', 'Figma'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/homepgJuice', accent: '#8cb6d5' },
    { title: 'juice', description: 'E-commerce or product display layout.', tech: ['CSS', 'HTML', 'JavaScript'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/juice', accent: '#1a8a7a' },
    { title: 'juicepr', description: 'Product presentation site.', tech: ['CSS', 'HTML'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/juicepr', accent: '#2a6693' },
    { title: 'management', description: 'A management dashboard layout.', tech: ['CSS', 'React', 'Dashboard'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/management', accent: '#4483b0' },
    { title: 'market', description: 'A marketplace UI or logic implementation.', tech: ['JavaScript', 'Node.js', 'Express'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/market', accent: '#639cc4' },
    { title: 'structure', description: 'Data structures implementation.', tech: ['Java', 'Data Structures'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/structure', accent: '#1a8a7a' },
    { title: 'tukii', description: 'A front-end interface project.', tech: ['HTML', 'CSS', 'JavaScript'], link: 'https://github.com/Tasrif-Ahmed-Mohsin/tukii', accent: '#2a6693' }
];




/* ─── Chapter Marker ─── */
function ChapterMarker({ number, title }) {
    return (
        <div className="chapter-marker animate-in">
            <span className="chapter-marker-line"></span>
            <span className="chapter-marker-text">Chapter {number}</span>
            <span className="chapter-marker-line"></span>
        </div>
    );
}

/* ═══════════════════════════════════════════
   I. THE HARBOR — Hero
   ═══════════════════════════════════════════ */
export function HeroSection() {
    return (
        <section className="chapter chapter-hero" id="chapter-harbor" data-chapter="0" style={{ '--chapter-index': 1 }}>
            <FloatingBubbles count={15} />
            <div className="chapter-inner">
                <div className="hero-eyebrow animate-in">
                    <span className="eyebrow-line"></span>
                    <span>Welcome Aboard</span>
                    <span className="eyebrow-line"></span>
                </div>

                <h1 className="hero-name animate-in">
                    <span className="name-first">Tasrif</span>
                    <span className="name-last">Ahmed</span>
                </h1>

                <p className="hero-role animate-in">
                    Software Developer &amp; AI Enthusiast
                    <span className="typed-cursor" aria-hidden="true"></span>
                </p>

                <p className="hero-tagline animate-in">
                    Building digital experiences that make waves.
                </p>

                <div className="hero-scroll-hint animate-in">
                    <span>Scroll to set sail</span>
                    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="scroll-chevron">
                        <path d="M10 2 L10 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3 16 L10 24 L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   II. SETTING SAIL — About
   ═══════════════════════════════════════════ */
export function AboutSection() {
    return (
        <section className="chapter chapter-about" id="chapter-sail" data-chapter="1" style={{ '--chapter-index': 2 }}>
            <FloatingBubbles count={10} />
            <div className="chapter-inner">
                <ChapterMarker number="II" title="Setting Sail" />
                <h2 className="section-title animate-in">Setting Sail</h2>

                <div className="about-content animate-in">
                    <p className="about-text lead-text">
                        I am currently pursuing my Bachelor of Computer Science at <span className="highlight-text">BRAC University</span>, having previously completed my SSC from Dhaka College. I'm a passionate software developer with a strong focus on <span className="highlight-text">algorithmic problem solving</span>, <span className="highlight-text">machine learning</span>, and <span className="highlight-text">robust application development</span>.
                    </p>
                    <p className="about-text">
                        While I am not yet working professionally, I love building personal projects and smart systems that solve real-world problems. Whether I'm mapping graph-based routes in Java, predicting data trends with Python, or training computer vision models, I approach every project with curiosity and precision.
                    </p>
                </div>

                <div className="about-stats animate-in">
                    <div className="stat-card" style={{ '--delay': '0.1s' }}>
                        <span className="stat-number">BSc</span>
                        <span className="stat-label">Computer Science<br/>(BRACU)</span>
                    </div>
                    <div className="stat-card" style={{ '--delay': '0.2s' }}>
                        <span className="stat-number">15+</span>
                        <span className="stat-label">Academic &<br/>Personal Projects</span>
                    </div>
                    <div className="stat-card" style={{ '--delay': '0.3s' }}>
                        <span className="stat-number">10+</span>
                        <span className="stat-label">Technologies<br/>Explored</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   III. THE VOYAGE — Projects
   ═══════════════════════════════════════════ */
export function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const timer = setTimeout(() => {
            const section = document.getElementById('chapter-voyage');
            if (section) {
                section.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
            }
        }, 50);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [showAll]);

    return (
        <section className="chapter chapter-projects" id="chapter-voyage" data-chapter="2" style={{ '--chapter-index': 3 }}>
            <FloatingBubbles count={10} />
            <div className="chapter-inner">
                <ChapterMarker number="III" title="The Voyage" />
                <h2 className="section-title animate-in">The Voyage</h2>
                <p className="section-subtitle animate-in">
                    Ports of call along the journey — projects I've built and shipped.
                </p>

                <div className="projects-list">
                    {displayedProjects.map((project, i) => (
                        <a
                            key={project.title}
                            href={project.link}
                            className="project-card animate-in"
                            style={{ '--delay': `${(i % 3) * 0.12}s`, '--accent': project.accent }}
                        >
                            <div className="project-accent-bar"></div>
                            <div className="project-body">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description || project.title}</p>
                                <div className="project-tech">
                                    {project.tech.map(t => (
                                        <span key={t} className="tech-pill" title={t}>
                                            {TECH_ICONS[t] || t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="project-arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M5 13 L13 5 M13 5 L5 5 M13 5 L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                {PROJECTS.length > 4 && (
                    <div style={{ textAlign: 'center', marginTop: '40px' }} className="animate-in">
                        <button 
                            className="show-all-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? '← Show Less' : `Show All Repositories (${PROJECTS.length - 4} more) →`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   IV. THE DEEP — Skills (Particle Morphing)
   ═══════════════════════════════════════════ */

const SKILL_CATEGORIES_MOBILE = [
    { label: 'Languages', skills: ['Python', 'Java', 'C++', 'TypeScript', 'JavaScript', 'HTML/CSS'], color: '#639cc4' },
    { label: 'AI & Data', skills: ['Machine Learning', 'Computer Vision', 'YOLOv10', 'Scikit-Learn', 'Pandas', 'BeautifulSoup'], color: '#a8e0f0' },
    { label: 'Web', skills: ['React', 'Node.js', 'Express', 'Bootstrap', 'HTML5 Canvas'], color: '#4483b0' },
    { label: 'Tools', skills: ['Git', 'MySQL', 'Figma', 'UI Design'], color: '#8cb6d5' },
    { label: 'Core', skills: ['Data Structures', 'Algorithms', 'OOP', 'Robotics', 'Software Design'], color: '#2a6693' },
];

export function SkillsSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <section className="chapter chapter-skills" id="chapter-deep" data-chapter="3" style={{ '--chapter-index': 4 }}>
            <FloatingBubbles count={10} />
            <div className="chapter-inner" style={{ maxWidth: '900px', width: '100%' }}>
                <ChapterMarker number="IV" title="The Deep" />
                <h2 className="section-title animate-in">The Deep</h2>
                <p className="section-subtitle animate-in">
                    {isMobile
                        ? 'A map of my technical ecosystem.'
                        : 'Hover to reveal the constellations of my technical ecosystem.'}
                </p>

                {isMobile ? (
                    /* ── Mobile: simple grid of category cards ── */
                    <div className="skills-mobile-grid animate-in">
                        {SKILL_CATEGORIES_MOBILE.map(cat => (
                            <div key={cat.label} className="skills-mobile-category" style={{ '--cat-color': cat.color }}>
                                <h3 className="skills-mobile-cat-label">{cat.label}</h3>
                                <div className="skills-mobile-pills">
                                    {cat.skills.map(skill => (
                                        <span key={skill} className="skills-mobile-pill">
                                            {TECH_ICONS[skill] && <span className="skills-mobile-icon">{TECH_ICONS[skill]}</span>}
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ── Desktop: particle canvas ── */
                    <div className="animate-in">
                        <SkillsParticleCanvas />
                    </div>
                )}
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   V. THE LIGHTHOUSE — Contact
   ═══════════════════════════════════════════ */
export function ContactSection() {
    return (
        <section className="chapter chapter-contact" id="chapter-lighthouse" data-chapter="4" style={{ '--chapter-index': 5 }}>
            <FloatingBubbles count={10} />
            <div className="chapter-inner">
                <ChapterMarker number="V" title="The Lighthouse" />
                <h2 className="section-title animate-in">The Lighthouse</h2>
                <p className="section-subtitle animate-in">
                    Every voyage has a destination. Let's build something together.
                </p>

                {/* Lighthouse illustration */}
                <div className="lighthouse-illustration animate-in">
                    <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="lighthouse-svg">
                        {/* Light beams */}
                        <path className="light-beam" d="M60 48 L5 20 L20 42 Z" fill="rgba(168,224,240,0.12)" />
                        <path className="light-beam" d="M60 48 L115 20 L100 42 Z" fill="rgba(168,224,240,0.12)" />
                        <path className="light-beam" d="M60 48 L0 38 L18 50 Z" fill="rgba(168,224,240,0.08)" />
                        <path className="light-beam" d="M60 48 L120 38 L102 50 Z" fill="rgba(168,224,240,0.08)" />

                        {/* Tower */}
                        <path d="M45 170 L48 65 L72 65 L75 170 Z" fill="#cfdfec" />
                        {/* Stripes */}
                        <rect x="49" y="80" width="22" height="10" rx="1" fill="#4483b0" opacity="0.85" />
                        <rect x="48" y="105" width="24" height="10" rx="1" fill="#4483b0" opacity="0.85" />
                        <rect x="47" y="130" width="26" height="10" rx="1" fill="#4483b0" opacity="0.85" />
                        <rect x="46" y="155" width="28" height="10" rx="1" fill="#4483b0" opacity="0.85" />

                        {/* Lamp room */}
                        <rect x="44" y="48" width="32" height="20" rx="3" fill="#2a6693" />
                        {/* Glass */}
                        <rect x="48" y="51" width="24" height="14" rx="2" fill="#164a75" />
                        {/* Light bulb */}
                        <circle cx="60" cy="58" r="6" fill="#a8e0f0" opacity="0.8" />
                        <circle cx="60" cy="58" r="3" fill="#e0f4ff" opacity="0.95" />

                        {/* Pulsing glow rings */}
                        <circle cx="60" cy="58" r="10" fill="none" stroke="rgba(168, 224, 240, 0.25)" strokeWidth="1.5" className="lighthouse-glow-ring" />
                        <circle cx="60" cy="58" r="16" fill="none" stroke="rgba(168, 224, 240, 0.12)" strokeWidth="1" className="lighthouse-glow-ring" style={{ animationDelay: '1.5s' }} />

                        {/* Roof */}
                        <path d="M42 48 L60 30 L78 48 Z" fill="#164a75" />
                        {/* Tip */}
                        <circle cx="60" cy="30" r="3" fill="#4483b0" />

                        {/* Base platform */}
                        <rect x="38" y="168" width="44" height="8" rx="2" fill="#b0cde2" />

                        {/* Railing */}
                        <line x1="44" y1="48" x2="44" y2="43" stroke="#8cb6d5" strokeWidth="1.5" />
                        <line x1="76" y1="48" x2="76" y2="43" stroke="#8cb6d5" strokeWidth="1.5" />
                        <line x1="42" y1="43" x2="78" y2="43" stroke="#8cb6d5" strokeWidth="1.5" />
                    </svg>
                </div>

                <div className="contact-links">
                    <a href="mailto:tasrifahmedmohsin@gmail.com" className="contact-link animate-in" style={{ '--delay': '0s' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2 6 L10 11 L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>tasrifahmedmohsin@gmail.com</span>
                    </a>
                    <a href="https://github.com/Tasrif-Ahmed-Mohsin" target="_blank" rel="noopener noreferrer" className="contact-link animate-in" style={{ '--delay': '0.1s' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 1.5C5.3 1.5 1.5 5.3 1.5 10c0 3.8 2.4 7 5.8 8.1.4.1.5-.2.5-.4v-1.5c-2.4.5-2.8-1.2-2.8-1.2-.4-1-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.9-.2-3.8-1-3.8-4.3 0-1 .3-1.8.9-2.4-.1-.2-.4-1.1.1-2.4 0 0 .7-.2 2.4 1 .7-.2 1.4-.3 2.2-.3s1.5.1 2.2.3c1.6-1.2 2.4-1 2.4-1 .5 1.3.2 2.2.1 2.4.5.6.9 1.4.9 2.4 0 3.3-2 4.1-3.8 4.3.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4 3.3-1.1 5.7-4.3 5.7-8.1C18.5 5.3 14.7 1.5 10 1.5Z" fill="currentColor" />
                        </svg>
                        <span>GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/tasrif-ahmed-mohsin/" target="_blank" rel="noopener noreferrer" className="contact-link animate-in" style={{ '--delay': '0.2s' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M6 8.5V14M6 6V6.01M10 14V10.5C10 9.4 10.9 8.5 12 8.5C13.1 8.5 14 9.4 14 10.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                </div>

                <p className="contact-closing animate-in">
                    "The sea, once it casts its spell, holds one in its net of wonder forever."
                </p>
            </div>
        </section>
    );
}
