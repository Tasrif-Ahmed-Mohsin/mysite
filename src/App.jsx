import { useEffect, useState } from 'react';
import Layer from './components/Layer';
import Boat from './components/Boat';
import WaterSurface from './components/WaterSurface';
import ChapterNav from './components/ChapterNav';
import {
    HeroSection,
    AboutSection,
    ProjectsSection,
    SkillsSection,
    ContactSection,
} from './components/ContentSections';
import './index.css';

const NUM_LAYERS = 12;

const COLORS = [
    '#ffffff', '#f4f7fa', '#e5eff5', '#cfdfec',
    '#b0cde2', '#8cb6d5', '#639cc4', '#4483b0',
    '#2a6693', '#164a75', '#0c3154', '#051c35'
];

const OPENING_RATIOS = [
    0.80, 0.70, 0.60, 0.52, 0.45, 0.38,
    0.33, 0.28, 0.24, 0.20, 0.17, 0.14
];

const PARALLAX_SPEEDS = [
    0.01, 0.03, 0.05, 0.08, 0.11, 0.14,
    0.18, 0.22, 0.26, 0.30, 0.35, 0.40
];

const VIEW_W = 1200;
const VIEW_H = 2000;

function App() {
    const [scrollProg, setScrollProg] = useState(0);
    const [activeChapter, setActiveChapter] = useState(0);

    useEffect(() => {
        let ticking = false;
        let currentScroll = 0;
        let currentMouse = { x: 0, y: 0 };

        const updatePositions = () => {
            // Update Boat mouse offset
            const boatContainer = document.getElementById('boat-container');
            if (boatContainer) {
                boatContainer.style.transform = `translate(-50%, -50%) translate3d(${currentMouse.x * 0.2}px, ${currentMouse.y * 0.3}px, 0)`;
            }

            // Update Water Ripples
            const wavesContainer = document.querySelector('.water ul.waves');
            if (wavesContainer) {
                wavesContainer.style.transform = `translate3d(${currentMouse.x * -40}px, 0, 0)`;
            }

            // Update Layers parallax
            for (let i = 0; i < NUM_LAYERS; i++) {
                const layerEl = document.getElementById(`wave-layer-${i}`);
                if (layerEl) {
                    const speed = PARALLAX_SPEEDS[i];
                    const viewH = window.innerHeight || VIEW_H;
                    const sy = currentScroll * speed * viewH * 0.5;
                    const sx = Math.sin(currentScroll * Math.PI + i * 0.3) * (NUM_LAYERS - i) * 0.5;
                    const mx = currentMouse.x * (NUM_LAYERS - i) * 1.5;
                    const my = currentMouse.y * (NUM_LAYERS - i) * 0.8;
                    layerEl.style.transform = `translate3d(${sx + mx}px, ${sy + my}px, 0)`;
                }
            }
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                // Global scroll progress (0 to 1)
                const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
                const progress = totalScroll > 0
                    ? Math.max(0, Math.min(1, window.scrollY / totalScroll))
                    : 0;

                // Parallax translation should be subtle to avoid exposing layer edges
                currentScroll = (progress - 0.5) * 0.4;
                
                // Keep boat progress from -1 to 1 so it maps to 0 to 1
                setScrollProg((progress - 0.5) * 2);
                updatePositions();

                // Determine active chapter
                const chapters = document.querySelectorAll('[data-chapter]');
                let current = 0;
                chapters.forEach((ch, i) => {
                    const rect = ch.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.5) {
                        current = i;
                    }
                });
                setActiveChapter(current);

                ticking = false;
            });
        };

        const handleMouseMove = (e) => {
            const sceneSide = document.querySelector('.scene-side');
            if (!sceneSide) return;
            const rect = sceneSide.getBoundingClientRect();
            // Only respond to mouse within the scene area
            if (e.clientX < rect.left || e.clientX > rect.right) return;

            const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            currentMouse = { x: mouseX, y: mouseY };

            requestAnimationFrame(updatePositions);
        };

        // IntersectionObserver for entrance animations
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

        // Observe after a tick to let React render
        const observeTimer = setTimeout(() => {
            document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
        }, 150);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        handleScroll(); // initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
            clearTimeout(observeTimer);
        };
    }, []);

    // Map scrollProg (-1..1) back to boat progress (0..1)
    const boatProgress = (scrollProg / 2) + 0.5;

    return (
        <div className="portfolio">
            <ChapterNav activeChapter={activeChapter} />

            <div className="portfolio-layout">
                {/* Left: scrolling portfolio content */}
                <main className="content-side">
                    <HeroSection />
                    <AboutSection />
                    <ProjectsSection />
                    <SkillsSection />
                    <ContactSection />
                </main>

                {/* Right: sticky boat scene */}
                <div className="scene-side">
                    <div className="scene" id="scene">
                        <div className="water-bg">
                            <WaterSurface viewW={VIEW_W} viewH={VIEW_H} />
                        </div>

                        <Boat
                            progress={boatProgress}
                            viewW={VIEW_W}
                            viewH={VIEW_H}
                            mouseOffset={{ x: 0, y: 0 }}
                        />

                        <div className="layers-container">
                            {Array.from({ length: NUM_LAYERS }).map((_, i) => (
                                <Layer
                                    key={i}
                                    layerIndex={i}
                                    color={COLORS[i]}
                                    openingRatio={OPENING_RATIOS[i]}
                                    speed={PARALLAX_SPEEDS[i]}
                                    viewW={VIEW_W}
                                    viewH={VIEW_H}
                                    scrollOffset={{ x: 0, y: 0 }}
                                    mouseOffset={{ x: 0, y: 0 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
