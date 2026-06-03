import { useMemo } from 'react';
import { generateLeftWave, generateRightWave, pointsToSmoothPath } from '../utils/waveGen';

export default function Layer({ 
    layerIndex, color, openingRatio, viewW, viewH, 
    scrollOffset, mouseOffset 
}) {
    const pathData = useMemo(() => {
        const centerX = viewW / 2;
        const halfOpening = (viewW * openingRatio) / 2;
        const leftEdgeX = centerX - halfOpening;
        const rightEdgeX = centerX + halfOpening;

        // Generate unique waves for this specific layer
        const leftBasePoints = generateLeftWave(viewH, layerIndex);
        const rightBasePoints = generateRightWave(viewH, layerIndex);

        // Shift waves horizontally to form the inner cutouts for this layer
        const leftWavePoints = leftBasePoints.map(p => ({ x: leftEdgeX + p.x, y: p.y }));
        const rightWavePoints = rightBasePoints.map(p => ({ x: rightEdgeX + p.x, y: p.y }));

        const lFirst = leftWavePoints[0];
        const rLast = rightWavePoints[rightWavePoints.length - 1];

        // This path uses `fillRule="evenodd"`. 
        // We add a 10% bleed (120px on width 1200, 200px on height 2000) to the outer rectangle
        // so that the hole can safely cross 0 without being clipped by the outer boundary.
        // We expand the outer rectangle to match the expanded wave points (-400 to viewH + 400)
        return `
            M -400 -600
            L 1600 -600
            L 1600 2600
            L -400 2600
            Z
            M ${lFirst.x.toFixed(1)} ${lFirst.y.toFixed(1)}
            ${pointsToSmoothPath(leftWavePoints, false)}
            L ${rLast.x.toFixed(1)} ${rLast.y.toFixed(1)}
            ${pointsToSmoothPath(rightWavePoints.slice().reverse(), false)}
            Z
        `;
    }, [layerIndex, viewW, viewH, openingRatio]);

    return (
        <div 
            id={`wave-layer-${layerIndex}`}
            className="wave-layer" 
            style={{ 
                zIndex: 30 - layerIndex
            }}
            data-layer={layerIndex}
        >
            <svg viewBox="-120 -200 1440 2400" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path d={pathData} fill={color} fillRule="evenodd" />
            </svg>
        </div>
    );
}
