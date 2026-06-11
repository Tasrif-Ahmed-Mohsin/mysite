import { useMemo } from 'react';

export default function FloatingBubbles({ count = 10 }) {
    const bubbles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const duration = 15 + Math.random() * 25;
            return {
                id: i,
                size: 8 + Math.random() * 20, // Decreased size significantly
                left: Math.random() * 100,
                delay: -(Math.random() * duration), // Negative delay so they are instantly scattered on load
                duration: duration,
                opacity: 0.15 + Math.random() * 0.3,
            };
        });
    }, [count]);

    return (
        <div className="floating-bubbles" aria-hidden="true">
            {bubbles.map(b => (
                <div
                    key={b.id}
                    className="bubble-wrapper"
                    style={{
                        left: `${b.left}%`,
                        animationDelay: `${b.delay}s`,
                        animationDuration: `${b.duration}s`,
                        '--scale': b.size / 200,
                        opacity: b.opacity,
                    }}
                >
                    <div className="complex-bubble">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            ))}
        </div>
    );
}
