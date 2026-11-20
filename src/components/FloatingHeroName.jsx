import { useEffect, useRef } from 'react';

const WORDS = [
    { text: 'Tasrif', className: 'name-first' },
    { text: 'Ahmed', className: 'name-last' },
    { text: 'Mohsin', className: 'name-surname' },
];

export default function FloatingHeroName() {
    const headingRef = useRef(null);

    useEffect(() => {
        const heading = headingRef.current;
        const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        const letters = [...heading.querySelectorAll('.hero-letter-slot')].map(slot => ({
            slot, glyph: slot.firstElementChild, x: 0, y: 0, vx: 0, vy: 0,
        }));
        let pointer = null;
        let frame = null;
        let lastTime = null;
        let visible = false;

        const animate = time => {
            const dt = Math.min((time - (lastTime ?? time - 16)) / 1000, 0.032);
            lastTime = time;
            // Measure the unmoving slots, not the displaced letters. This avoids
            // feedback jitter when a glyph moves underneath the pointer.
            const bounds = letters.map(letter => letter.slot.getBoundingClientRect());
            letters.forEach((letter, index) => {
                const phase = time / 1000 + index * 0.72;
                let targetX = Math.sin(phase * 0.8) * 2;
                let targetY = Math.cos(phase) * 3;
                if (pointer) {
                    const rect = bounds[index];
                    const dx = rect.left + rect.width / 2 - pointer.x;
                    const dy = rect.top + rect.height / 2 - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    const force = Math.max(0, 1 - distance / 140) ** 2 * 42;
                    // At the exact centre, give the letter a stable upward nudge.
                    targetX += distance > 0.1 ? dx / distance * force : 0;
                    targetY += distance > 0.1 ? dy / distance * force : -force;
                }
                letter.vx += ((targetX - letter.x) * 110 - letter.vx * 16) * dt;
                letter.vy += ((targetY - letter.y) * 110 - letter.vy * 16) * dt;
                letter.x += letter.vx * dt;
                letter.y += letter.vy * dt;
                const rotation = letter.x * 0.2 + Math.sin(phase * 0.7) * 1.2;
                letter.glyph.style.transform = `translate3d(${letter.x}px, ${letter.y}px, 0) rotate(${rotation}deg)`;
            });
            frame = requestAnimationFrame(animate);
        };

        const syncAnimation = () => {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = null;
            lastTime = null;
            if (motion.matches && visible && !document.hidden) {
                frame = requestAnimationFrame(animate);
            } else {
                pointer = null;
                letters.forEach(letter => {
                    letter.x = letter.y = letter.vx = letter.vy = 0;
                    letter.glyph.style.transform = '';
                });
            }
        };
        const movePointer = event => {
            if (event.pointerType === 'mouse' && motion.matches) {
                pointer = { x: event.clientX, y: event.clientY };
            }
        };
        const clearPointer = () => { pointer = null; };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            syncAnimation();
        });
        observer.observe(heading);
        window.addEventListener('pointermove', movePointer, { passive: true });
        document.documentElement.addEventListener('pointerleave', clearPointer);
        window.addEventListener('blur', clearPointer);
        document.addEventListener('visibilitychange', syncAnimation);
        motion.addEventListener('change', syncAnimation);

        return () => {
            if (frame !== null) cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('pointermove', movePointer);
            document.documentElement.removeEventListener('pointerleave', clearPointer);
            window.removeEventListener('blur', clearPointer);
            document.removeEventListener('visibilitychange', syncAnimation);
            motion.removeEventListener('change', syncAnimation);
            letters.forEach(letter => { letter.glyph.style.transform = ''; });
        };
    }, []);

    return (
        <h1 ref={headingRef} className="hero-name animate-in" aria-label="Tasrif Ahmed Mohsin">
            {WORDS.map(word => (
                <span key={word.text} className={word.className} aria-hidden="true">
                    {[...word.text].map((letter, index) => (
                        <span className="hero-letter-slot" key={index}>
                            <span className="hero-letter">{letter}</span>
                        </span>
                    ))}
                </span>
            ))}
        </h1>
    );
}
