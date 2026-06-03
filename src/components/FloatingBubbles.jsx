import { useMemo } from 'react';

export default function FloatingBubbles({ count = 10 }) {
    const bubbles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            size: 4 + Math.random() * 14,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 12 + Math.random() * 18,
            opacity: 0.03 + Math.random() * 0.05,
        }));
    }, [count]);

    return (
        <div className="floating-bubbles" aria-hidden="true">
            {bubbles.map(b => (
                <div
                    key={b.id}
                    className="bubble"
                    style={{
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        left: `${b.left}%`,
                        animationDelay: `${b.delay}s`,
                        animationDuration: `${b.duration}s`,
                        opacity: b.opacity,
                    }}
                />
            ))}
        </div>
    );
}
