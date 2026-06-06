import { useEffect, useState, useRef, useCallback } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef(0);
    const tickingRef = useRef(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Memoized position updater for parallax (boat, waves, layers)
    const updatePositions = useCallback(() => {
        const currentMouse = mouseRef.current;
        const currentScroll = scrollRef.current;

        // Update Boat mouse offset
        const boatContainer = document.getElementById('boat-container');
        if (boatContainer) {
            boatContainer.style.transform = `translate(-50%, -50%) translate3d(${currentMouse.x * 0.2}px, ${currentMouse.y * 0.3}px, 0)`;
        }

        // Skip heavy parallax for mobile
        if (window.innerWidth <= 768) return;

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
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            requestAnimationFrame(() => {
                const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
                const progress = totalScroll > 0
                    ? Math.max(0, Math.min(1, window.scrollY / totalScroll))
                    : 0;

                scrollRef.current = (progress - 0.5) * 0.4;
                setScrollProg((progress - 0.5) * 2);
                updatePositions();

                // ── Chapter transition: card-stack depth ──
                const chapters = document.querySelectorAll('[data-chapter]');
                const isDesktop = window.innerWidth > 768;
                const vh = window.innerHeight;
                let current = 0;

                chapters.forEach((ch, i) => {
                    const rect = ch.getBoundingClientRect();

                    if (rect.top < vh * 0.5) {
                        current = i;
                    }

                    if (!isDesktop) {
                        // Mobile: clean slate
                        ch.style.transform = '';
                        ch.style.opacity = '';
                        return;
                    }

                    // Check if the NEXT chapter is overlapping this one
                    const nextChapter = chapters[i + 1];
                    if (nextChapter) {
                        const nextRect = nextChapter.getBoundingClientRect();
                        // How much the next chapter has covered this one (0 = not at all, 1 = fully covered)
                        const coverProgress = Math.max(0, Math.min(1, 1 - (nextRect.top / vh)));

                        if (coverProgress > 0 && coverProgress < 1) {
                            // This chapter is being covered — scale down and fade
                            const scale = 1 - coverProgress * 0.04;
                            const opacity = 1 - coverProgress * 0.6;
                            ch.style.transform = `scale(${scale})`;
                            ch.style.transformOrigin = 'center center';
                            ch.style.opacity = opacity;
                        } else if (coverProgress >= 1) {
                            // Fully covered
                            ch.style.transform = 'scale(0.96)';
                            ch.style.opacity = '0.4';
                        } else {
                            // Not being covered yet
                            ch.style.transform = 'none';
                            ch.style.opacity = '1';
                        }
                    } else {
                        // Last chapter — never gets covered
                        ch.style.transform = 'none';
                        ch.style.opacity = '1';
                    }
                });

                setActiveChapter(current);
                tickingRef.current = false;
            });
        };

        const handleMouseMove = (e) => {
            const sceneSide = document.querySelector('.scene-side');
            if (!sceneSide) return;
            const rect = sceneSide.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right) return;

            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
            };
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

        // ResizeObserver to handle tall sticky chapters
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                const ch = entry.target;
                if (window.innerWidth <= 768) {
                    ch.style.top = '';
                } else {
                    const diff = window.innerHeight - ch.offsetHeight;
                    ch.style.top = Math.min(0, diff) + 'px';
                }
            });
        });

        const observeTimer = setTimeout(() => {
            document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
            document.querySelectorAll('.chapter').forEach(el => resizeObserver.observe(el));
        }, 150);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const handleResizeChapters = () => {
            document.querySelectorAll('.chapter').forEach(ch => {
                if (window.innerWidth <= 768) {
                    ch.style.top = '';
                } else {
                    const diff = window.innerHeight - ch.offsetHeight;
                    ch.style.top = Math.min(0, diff) + 'px';
                }
            });
        };
        window.addEventListener('resize', handleResizeChapters);

        handleScroll(); // initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResizeChapters);
            observer.disconnect();
            resizeObserver.disconnect();
            clearTimeout(observeTimer);
        };
    }, [updatePositions]);

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
                            {!isMobile && <WaterSurface viewW={VIEW_W} viewH={VIEW_H} />}
                        </div>

                        <Boat
                            progress={boatProgress}
                            viewW={VIEW_W}
                            viewH={VIEW_H}
                            mouseOffset={{ x: 0, y: 0 }}
                        />

                        <div className="layers-container">
                            {!isMobile && Array.from({ length: NUM_LAYERS }).map((_, i) => (
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
