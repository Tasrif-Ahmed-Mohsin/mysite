import { useMemo } from 'react';
import { pointsToSmoothPath } from '../utils/waveGen';

export default function PaperIsland({ x, y, rotation, scale, layers }) {
    // Generates a circular jagged papercut island
    const paths = useMemo(() => {
        const generatedLayers = [];
        const numLayers = layers || 4;
        
        for (let l = 0; l < numLayers; l++) {
            const points = [];
            const segments = 20;
            // Radius shrinks as layers go higher
            const baseRadius = 40 - (l * 8); 
            
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                // Add jagged noise to radius
                const rNoise = Math.sin(angle * 5) * 4 + Math.cos(angle * 12) * 2;
                const r = baseRadius + rNoise;
                points.push({ 
                    x: 50 + Math.cos(angle) * r, 
                    y: 50 + Math.sin(angle) * r 
                });
            }
            
            generatedLayers.push(pointsToSmoothPath(points) + ' Z');
        }
        return generatedLayers;
    }, [layers]);

    // Same color gradient as main layers (starting from light blue, ending in white)
    const islandColors = ['#b0cde2', '#cfdfec', '#e5eff5', '#ffffff', '#f4f7fa'];

    return (
        <div 
            className="paper-island"
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: `${100 * scale}px`,
                height: `${100 * scale}px`,
                transform: `rotate(${rotation}deg)`,
                zIndex: 40 // sit on top of outer layers
            }}
        >
            {paths.map((pathData, i) => (
                <svg key={i} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <path 
                        d={pathData} 
                        fill={islandColors[i % islandColors.length]} 
                        filter="drop-shadow(2px 4px 6px rgba(0,0,0,0.25))" 
                    />
                </svg>
            ))}
        </div>
    );
}
