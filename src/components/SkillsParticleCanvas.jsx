import { useEffect, useRef, useCallback, useState } from 'react';

/* ───────────────────────────────────────────────
   Skill category data (mirrors ContentSections)
   ─────────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'lang', label: 'Languages',
        skills: ['Python', 'Java', 'C++', 'TypeScript', 'JavaScript', 'HTML/CSS'],
        color: '#639cc4',
    },
    {
        id: 'ai', label: 'AI & Data',
        skills: ['Machine Learning', 'Computer Vision', 'YOLOv10', 'Scikit-Learn', 'Pandas', 'BeautifulSoup'],
        color: '#a8e0f0',
    },
    {
        id: 'web', label: 'Web',
        skills: ['React', 'Node.js', 'Express', 'Bootstrap', 'HTML5 Canvas'],
        color: '#4483b0',
    },
    {
        id: 'tools', label: 'Tools',
        skills: ['Git', 'MySQL', 'Figma', 'UI Design'],
        color: '#8cb6d5',
    },
    {
        id: 'core', label: 'Core',
        skills: ['Data Structures', 'Algorithms', 'OOP', 'Robotics', 'Software Design'],
        color: '#2a6693',
    },
];

/* Total skill particles + ambient filler particles */
const TOTAL_SKILL_PARTICLES = CATEGORIES.reduce((s, c) => s + c.skills.length, 0);
const AMBIENT_COUNT = 100; // extra unlabeled decorative dots
const TOTAL = TOTAL_SKILL_PARTICLES + AMBIENT_COUNT;

/* ───────────────────────────────────────────
   Utility helpers
   ─────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const rand = (min, max) => Math.random() * (max - min) + min;

/* ───────────────────────────────────────────
   Particle class
   ─────────────────────────────────────────── */
class Particle {
    constructor(canvasW, canvasH, skill, catIndex, catColor, formX, formY) {
        // Current position (start random)
        this.x = rand(0, canvasW);
        this.y = rand(0, canvasH);

        // Velocity for idle drift
        this.vx = rand(-0.3, 0.3);
        this.vy = rand(-0.3, 0.3);

        // Formation target (where particle goes when "formed")
        this.formX = formX;
        this.formY = formY;

        // Random idle home position
        this.homeX = rand(0, canvasW);
        this.homeY = rand(0, canvasH);

        // Skill metadata
        this.skill = skill;           // null for ambient particles
        this.catIndex = catIndex;      // -1 for ambient
        this.catColor = catColor || 'rgba(140, 182, 213, 0.3)';

        // Visual properties
        this.baseRadius = skill ? rand(3, 4.5) : rand(1.5, 3);
        this.radius = this.baseRadius;
        this.opacity = skill ? rand(0.6, 0.85) : rand(0.15, 0.35);
        this.baseOpacity = this.opacity;

        // Animation state
        this.formed = 0; // 0 = scattered, 1 = fully formed (lerp target)
        this.showLabel = 0; // opacity of label text

        // For gentle idle floating
        this.phase = rand(0, Math.PI * 2);
        this.phaseSpeed = rand(0.003, 0.008);
        this.driftAmp = rand(15, 40);
    }

    updateHome(canvasW, canvasH) {
        this.homeX = rand(0, canvasW);
        this.homeY = rand(0, canvasH);
    }

    update(formed, mouseX, mouseY, mouseInSection, canvasW, canvasH, dt) {
        this.phase += this.phaseSpeed;

        // Target formation lerp value
        const targetFormed = formed ? 1 : 0;
        this.formed = lerp(this.formed, targetFormed, 0.05);

        // Compute the base target position
        let targetX, targetY;
        if (this.formed > 0.01) {
            targetX = lerp(this.homeX + Math.sin(this.phase) * this.driftAmp, this.formX, this.formed);
            targetY = lerp(this.homeY + Math.cos(this.phase * 0.7) * this.driftAmp, this.formY, this.formed);
        } else {
            // Idle drifting
            targetX = this.homeX + Math.sin(this.phase) * this.driftAmp;
            targetY = this.homeY + Math.cos(this.phase * 0.7) * this.driftAmp;
        }

        // Mouse push effect applied to the TARGET, not as a velocity.
        // This ensures the particle smoothly glides away and smoothly returns.
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        
        if (mouseX !== null && mouseY !== null) {
            const d = dist(this.x, this.y, mouseX, mouseY);
            const interactionRadius = formed ? 100 : 150;
            if (d < interactionRadius && d > 0) {
                const force = Math.pow((interactionRadius - d) / interactionRadius, 1.5); // Smoother falloff
                const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
                
                const pushStrength = formed ? 20 : 40;
                mouseOffsetX = Math.cos(angle) * force * pushStrength;
                mouseOffsetY = Math.sin(angle) * force * pushStrength;
            }
        }

        // Foolproof smooth movement (Exponential Smoothing / Lerp).
        // It is mathematically impossible for this to oscillate, vibrate, or glitch.
        const speed = formed ? 0.08 : 0.025;
        this.x = lerp(this.x, targetX + mouseOffsetX, speed);
        this.y = lerp(this.y, targetY + mouseOffsetY, speed);

        // Label visibility (only when formed enough)
        const targetLabel = (this.formed > 0.8 && this.skill) ? 1 : 0;
        this.showLabel = lerp(this.showLabel, targetLabel, 0.06);

        // Radius pulse
        if (this.formed > 0.8 && this.skill) {
            this.radius = this.baseRadius + Math.sin(this.phase * 2) * 0.5;
        } else {
            this.radius = this.baseRadius;
        }

        // Opacity
        if (this.formed > 0.5 && this.skill) {
            this.opacity = lerp(this.opacity, 0.9, 0.05);
        } else {
            this.opacity = lerp(this.opacity, this.baseOpacity, 0.03);
        }
    }

    draw(ctx, dpr) {
        ctx.save();

        // Glow
        if (this.skill && this.formed > 0.3) {
            ctx.shadowBlur = 12 * this.formed;
            ctx.shadowColor = this.catColor;
        }

        // Particle dot
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.catColor;
        ctx.fill();

        ctx.shadowBlur = 0;

        // Skill label
        if (this.showLabel > 0.05 && this.skill) {
            ctx.globalAlpha = this.showLabel * 0.9;
            ctx.font = `500 ${10}px Inter, sans-serif`;
            ctx.fillStyle = '#1a3a5c';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(this.skill, this.x, this.y + this.radius + 6);
        }

        ctx.restore();
    }
}

/* ───────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────── */
export default function SkillsParticleCanvas() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null, inSection: false });
    const sectionVisibleRef = useRef(false);
    const formedRef = useRef(false);
    const sizeRef = useRef({ w: 0, h: 0 });
    const initializedRef = useRef(false);

    /* Build formation positions for a given canvas size */
    const computeFormations = useCallback((canvasW, canvasH) => {
        const formations = [];
        const numCats = CATEGORIES.length;

        // Layout: arrange 5 category clusters in a pentagon-ish layout
        // Center of canvas
        const cx = canvasW / 2;
        const cy = canvasH / 2;

        // Radius of the pentagon arrangement
        const arrangementRadius = Math.min(canvasW, canvasH) * 0.3;

        CATEGORIES.forEach((cat, catIdx) => {
            // Place category hubs in a circle
            const angle = ((catIdx / numCats) * Math.PI * 2) - Math.PI / 2;
            const hubX = cx + Math.cos(angle) * arrangementRadius;
            const hubY = cy + Math.sin(angle) * arrangementRadius;

            // Place skills in a ring around the hub
            const skillRadius = Math.min(canvasW, canvasH) * 0.09;
            cat.skills.forEach((skill, skillIdx) => {
                const skillAngle = ((skillIdx / cat.skills.length) * Math.PI * 2) - Math.PI / 2;
                const sx = hubX + Math.cos(skillAngle) * skillRadius;
                const sy = hubY + Math.sin(skillAngle) * skillRadius;
                formations.push({
                    skill,
                    catIndex: catIdx,
                    catColor: cat.color,
                    formX: sx,
                    formY: sy,
                });
            });
        });

        return formations;
    }, []);

    /* Initialize or reinitialize particles */
    const initParticles = useCallback((canvasW, canvasH) => {
        const formations = computeFormations(canvasW, canvasH);
        const particles = [];

        // Skill particles
        formations.forEach((f) => {
            particles.push(
                new Particle(canvasW, canvasH, f.skill, f.catIndex, f.catColor, f.formX, f.formY)
            );
        });

        // Ambient filler particles
        const ambientColors = ['rgba(140,182,213,0.25)', 'rgba(100,156,196,0.2)', 'rgba(168,224,240,0.15)', 'rgba(42,102,147,0.18)', 'rgba(200,220,235,0.12)'];
        for (let i = 0; i < AMBIENT_COUNT; i++) {
            // Scatter ambient particles, some near category areas
            const catIdx = Math.floor(rand(0, CATEGORIES.length));
            const angle = ((catIdx / CATEGORIES.length) * Math.PI * 2) - Math.PI / 2;
            const r = Math.min(canvasW, canvasH) * 0.3;
            const hubX = canvasW / 2 + Math.cos(angle) * r;
            const hubY = canvasH / 2 + Math.sin(angle) * r;
            // Some near hubs, some totally random
            const nearHub = Math.random() > 0.4;
            const fx = nearHub
                ? hubX + rand(-80, 80)
                : rand(0, canvasW);
            const fy = nearHub
                ? hubY + rand(-80, 80)
                : rand(0, canvasH);

            const p = new Particle(canvasW, canvasH, null, -1, ambientColors[i % ambientColors.length], fx, fy);
            particles.push(p);
        }

        particlesRef.current = particles;
    }, [computeFormations]);

    /* Update formation targets when canvas resizes */
    const updateFormations = useCallback((canvasW, canvasH) => {
        const formations = computeFormations(canvasW, canvasH);
        const particles = particlesRef.current;

        let fIdx = 0;
        particles.forEach((p) => {
            if (p.skill && fIdx < formations.length) {
                p.formX = formations[fIdx].formX;
                p.formY = formations[fIdx].formY;
                p.updateHome(canvasW, canvasH);
                fIdx++;
            } else if (!p.skill) {
                // Re-scatter ambient formation targets
                const catIdx = Math.floor(rand(0, CATEGORIES.length));
                const angle = ((catIdx / CATEGORIES.length) * Math.PI * 2) - Math.PI / 2;
                const r = Math.min(canvasW, canvasH) * 0.3;
                const hubX = canvasW / 2 + Math.cos(angle) * r;
                const hubY = canvasH / 2 + Math.sin(angle) * r;
                const nearHub = Math.random() > 0.4;
                p.formX = nearHub ? hubX + rand(-80, 80) : rand(0, canvasW);
                p.formY = nearHub ? hubY + rand(-80, 80) : rand(0, canvasH);
                p.updateHome(canvasW, canvasH);
            }
        });
    }, [computeFormations]);

    /* Draw category labels when formed */
    const drawCategoryLabels = useCallback((ctx, canvasW, canvasH, formedAmount) => {
        if (formedAmount < 0.5) return;

        const cx = canvasW / 2;
        const cy = canvasH / 2;
        const arrangementRadius = Math.min(canvasW, canvasH) * 0.3;
        const numCats = CATEGORIES.length;
        const labelOpacity = Math.min(1, (formedAmount - 0.5) * 3);

        ctx.save();

        // Center label
        ctx.globalAlpha = labelOpacity * 0.9;
        ctx.font = `700 14px 'Aquatico', Inter, sans-serif`;
        ctx.fillStyle = '#1a3a5c';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SKILLS', cx, cy);

        // Category hub labels
        CATEGORIES.forEach((cat, catIdx) => {
            const angle = ((catIdx / numCats) * Math.PI * 2) - Math.PI / 2;
            const hubX = cx + Math.cos(angle) * arrangementRadius;
            const hubY = cy + Math.sin(angle) * arrangementRadius;

            ctx.globalAlpha = labelOpacity * 0.85;
            ctx.font = `600 12px Inter, sans-serif`;
            ctx.fillStyle = '#374151';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cat.label, hubX, hubY);
        });

        ctx.restore();
    }, []);

    /* Draw connecting lines between same-category particles */
    const drawConnections = useCallback((ctx, particles, formedAmount) => {
        if (formedAmount < 0.4) return;

        const lineOpacity = Math.min(0.15, (formedAmount - 0.4) * 0.3);

        ctx.save();
        ctx.lineWidth = 0.5;

        // Group particles by category
        const groups = {};
        particles.forEach(p => {
            if (p.catIndex >= 0 && p.skill) {
                if (!groups[p.catIndex]) groups[p.catIndex] = [];
                groups[p.catIndex].push(p);
            }
        });

        Object.entries(groups).forEach(([catIdx, group]) => {
            const cat = CATEGORIES[parseInt(catIdx)];
            if (!cat) return;

            ctx.strokeStyle = cat.color;
            ctx.globalAlpha = lineOpacity;

            // Connect each skill to adjacent skills in the ring
            for (let i = 0; i < group.length; i++) {
                const a = group[i];
                const b = group[(i + 1) % group.length];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });

        ctx.restore();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        /* Size canvas */
        const resize = () => {
            const rect = container.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            sizeRef.current = { w, h };

            if (!initializedRef.current) {
                initParticles(w, h);
                initializedRef.current = true;
            } else {
                updateFormations(w, h);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        /* Mouse tracking */
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleMouseEnter = () => {
            mouseRef.current.inSection = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.inSection = false;
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        /* Intersection observer — track if section is in viewport */
        const section = container.closest('.chapter-skills');
        const observer = new IntersectionObserver(
            ([entry]) => {
                sectionVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.15 }
        );
        if (section) observer.observe(section);

        /* Average formed-ness for global effects */
        let avgFormed = 0;

        /* Animation loop */
        const animate = () => {
            const { w, h } = sizeRef.current;
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Determine if we should form
            const shouldForm = sectionVisibleRef.current && mouse.inSection;
            formedRef.current = shouldForm;

            ctx.clearRect(0, 0, w, h);

            // Update & draw particles
            let formedSum = 0;
            particles.forEach(p => {
                p.update(shouldForm, mouse.x, mouse.y, mouse.inSection, w, h);
                formedSum += p.formed;
            });
            avgFormed = formedSum / particles.length;

            // Draw connections first (behind particles)
            drawConnections(ctx, particles, avgFormed);

            // Draw particles
            particles.forEach(p => p.draw(ctx, dpr));

            // Draw category labels
            drawCategoryLabels(ctx, w, h, avgFormed);

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
        };
    }, [initParticles, updateFormations, drawCategoryLabels, drawConnections]);

    return (
        <div className="skills-canvas-wrapper" ref={containerRef}>
            <canvas ref={canvasRef} className="skills-canvas" />
            <div className="skills-canvas-hint">
                <span>Hover to reveal skill clusters</span>
            </div>
        </div>
    );
}
