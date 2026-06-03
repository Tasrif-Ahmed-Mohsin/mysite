import { useMemo, useEffect, useState } from 'react';
import { getWaterCenterAt } from '../utils/waveGen';

export default function Boat({ progress, viewW, viewH, mouseOffset }) {
    const [bobOffset, setBobOffset] = useState(0);
    const [tilt, setTilt] = useState(0);

    // Calculate boat's target path position
    const topPercent = progress * 112.5 - 10;
    
    // getWaterCenterAt expects t from 0 to 1
    const t = useMemo(() => {
        return Math.max(0, Math.min(1, (topPercent + 10) / 112.5));
    }, [topPercent]);

    // The boat sits on layer 11 (the deepest water layer)
    const xPos = useMemo(() => getWaterCenterAt(t, viewW, 11, 0.14), [t, viewW]);
    
    // Calculate tilt based on the curve (derivative of X with respect to t)
    const nextX = useMemo(() => getWaterCenterAt(Math.min(1, t + 0.01), viewW, 11, 0.14), [t, viewW]);
    const prevX = useMemo(() => getWaterCenterAt(Math.max(0, t - 0.01), viewW, 11, 0.14), [t, viewW]);
    
    const targetTilt = (nextX - prevX) * 0.5;

    // Bobbing animation loop
    useEffect(() => {
        let frameId;
        let startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            
            // Gentle bobbing up and down
            setBobOffset(Math.sin(elapsed * 2.5) * 6);
            
            frameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);

    // Smooth tilt transition
    useEffect(() => {
        setTilt(prev => prev + (targetTilt - prev) * 0.1);
    }, [targetTilt]);

    const leftPercent = (xPos / viewW) * 100;

    return (
        <div 
            id="boat-container"
            style={{
                position: 'absolute',
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                width: '100px',
                height: '240px',
                transform: `translate(-50%, -50%) translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.3}px, 0)`,
                zIndex: 100,
                willChange: 'transform, top, left',
                pointerEvents: 'none'
            }}
        >
            {/* Wake / Ripples */}
            <div className="boat-wake" style={{
                position: 'absolute',
                bottom: '5%', /* Align with the bow of the ship */
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '260px',
                pointerEvents: 'none',
                zIndex: -1,
            }}>
                <svg viewBox="0 0 200 260" width="100%" height="100%">
                    <defs>
                        <linearGradient id="wakeFade" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="wakeFadeInner" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Outer Bow Waves */}
                    <path 
                        d="M 98 250 Q 65 140 30 0" 
                        fill="none" 
                        stroke="url(#wakeFade)" 
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path 
                        d="M 102 250 Q 135 140 170 0" 
                        fill="none" 
                        stroke="url(#wakeFade)" 
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    
                    {/* Inner Hull Waves */}
                    <path 
                        d="M 70 140 Q 55 70 45 0" 
                        fill="none" 
                        stroke="url(#wakeFadeInner)" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path 
                        d="M 130 140 Q 145 70 155 0" 
                        fill="none" 
                        stroke="url(#wakeFadeInner)" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Paper-cut 3D Boat SVG */}
            <div style={{
                width: '100%',
                height: '100%',
                transform: `translateY(${bobOffset}px) rotate(${tilt}deg)`,
                transition: 'transform 0.1s ease-out',
                filter: 'drop-shadow(0 8px 16px rgba(2,12,30,0.55)) drop-shadow(0 2px 4px rgba(2,12,30,0.3))'
            }}>
                <svg viewBox="0 0 100 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                        {/* Inner shadow for cutout depth */}
                        <radialGradient id="cutoutShadowTop" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
                            <stop offset="60%" stopColor="#000000" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="cutoutShadowBot" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
                            <stop offset="60%" stopColor="#000000" stopOpacity="0.04" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </radialGradient>

                        {/* Subtle highlight gradient on white hull */}
                        <linearGradient id="hullHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="40%" stopColor="#f8fbff" />
                            <stop offset="100%" stopColor="#e8eef5" />
                        </linearGradient>

                        {/* Edge light for 3D paper bevel */}
                        <linearGradient id="edgeLight" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
                        </linearGradient>

                        {/* Seat top gradient */}
                        <linearGradient id="seatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f0f4f8" />
                            <stop offset="100%" stopColor="#dce4ed" />
                        </linearGradient>
                    </defs>

                    {/* ===== LAYER 1: Bottom shadow layer (deepest, darkest) ===== */}
                    <path d="
                        M 50 9
                        C 96 50, 96 194, 50 237
                        C 4 194, 4 50, 50 9 Z
                    " fill="#061a2e" opacity="0.5" />

                    {/* ===== LAYER 2: Dark navy hull body (middle depth) ===== */}
                    <path d="
                        M 50 5
                        C 94 47, 94 193, 50 235
                        C 6 193, 6 47, 50 5 Z
                    " fill="#0c3154" stroke="#ffffff" strokeWidth="4" />

                    {/* ===== LAYER 3: Slightly lighter navy inner ring ===== */}
                    <path d="
                        M 50 9
                        C 90 48, 90 192, 50 231
                        C 10 192, 10 48, 50 9 Z
                    " fill="#143d62" />

                    {/* ===== LAYER 4: White hull top layer with cutouts ===== */}
                    {/* Uses evenodd fill to punch out the two windows */}
                    <path d="
                        M 50 13
                        C 86 50, 86 190, 50 227
                        C 14 190, 14 50, 50 13 Z
                        M 50 38
                        C 70 62, 70 80, 66 95
                        L 34 95
                        C 30 80, 30 62, 50 38 Z
                        M 34 125
                        L 66 125
                        C 70 137, 70 160, 50 200
                        C 30 160, 30 137, 34 125 Z
                    " fill="url(#hullHighlight)" fillRule="evenodd" />

                    {/* Left edge highlight bevel */}
                    <path d="
                        M 50 13
                        C 14 50, 14 190, 50 227
                    " fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

                    {/* Right edge subtle shadow */}
                    <path d="
                        M 50 13
                        C 86 50, 86 190, 50 227
                    " fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

                    {/* ===== CUTOUT INNER SHADOWS (3D depth illusion) ===== */}
                    {/* Top cutout - inner shadow ring */}
                    <path d="
                        M 50 40
                        C 68 62, 68 78, 64 93
                        L 36 93
                        C 32 78, 32 62, 50 40 Z
                    " fill="none" stroke="rgba(0,20,40,0.2)" strokeWidth="2" />

                    {/* Top cutout - top edge shadow (depth) */}
                    <path d="
                        M 50 38
                        C 70 62, 70 80, 66 95
                    " fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
                    <path d="
                        M 50 38
                        C 30 62, 30 80, 34 95
                    " fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                    {/* Bottom cutout - inner shadow ring */}
                    <path d="
                        M 36 127
                        L 64 127
                        C 68 138, 68 158, 50 198
                        C 32 158, 32 138, 36 127 Z
                    " fill="none" stroke="rgba(0,20,40,0.2)" strokeWidth="2" />

                    {/* Bottom cutout - top edge shadow (depth) */}
                    <path d="
                        M 34 125 L 66 125
                    " fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

                    {/* ===== SEAT / CROSSBAR (3D layered) ===== */}
                    {/* Seat shadow underneath */}
                    <rect x="30" y="98" width="40" height="25" rx="2" fill="rgba(0,20,40,0.15)" />
                    {/* Seat dark side (depth) */}
                    <rect x="28" y="96" width="44" height="26" rx="2" fill="#143d62" />
                    {/* Seat top surface */}
                    <rect x="28" y="94" width="44" height="24" rx="2" fill="url(#seatGrad)" />
                    {/* Seat top highlight */}
                    <rect x="29" y="95" width="42" height="1" rx="0.5" fill="rgba(255,255,255,0.7)" />
                    {/* Seat bottom edge shadow */}
                    <rect x="29" y="116" width="42" height="1" rx="0.5" fill="rgba(0,20,40,0.12)" />

                    {/* ===== OUTER HULL CRISP OUTLINE ===== */}
                    <path d="
                        M 50 5
                        C 94 47, 94 193, 50 235
                        C 6 193, 6 47, 50 5 Z
                    " fill="none" stroke="#0a2844" strokeWidth="4" strokeLinejoin="round" />

                    {/* Top point accent */}
                    <circle cx="50" cy="6" r="1.5" fill="#0a2844" />
                    {/* Bottom point accent */}
                    <circle cx="50" cy="234" r="1.5" fill="#0a2844" />
                </svg>
            </div>
        </div>
    );
}
