export function generateLeftWave(height, layerIndex) {
    const points = [];
    const segments = 100; // Higher resolution for expanded range
    const startY = -400;
    const endY = height + 400;
    const totalHeight = endY - startY;
    const segHeight = totalHeight / segments;
    
    // Phase shift makes the shape morph organically as layers get deeper
    const phase = layerIndex * 0.15;
    const depthScale = 1 - (layerIndex * 0.02);

    for (let i = 0; i <= segments; i++) {
        const y = startY + (i * segHeight);
        const t = y / height; // Keep t relative to original height
        // Highly irregular, non-symmetrical combination for left edge
        let offsetX = (Math.sin(t * Math.PI * 2.2 + phase) * 90 
                    - Math.cos(t * Math.PI * 4.7 + phase * 1.3) * 45 
                    + Math.sin(t * Math.PI * 9.1 - phase * 0.8) * 25 
                    - Math.cos(t * Math.PI * 13.5 + phase * 2.1) * 12
                    + Math.sin(t * Math.PI * 22 + phase * 3.1) * 8) * depthScale * 0.55;
        points.push({ x: offsetX, y });
    }
    return points;
}

export function generateRightWave(height, layerIndex) {
    const points = [];
    const segments = 100; 
    const startY = -400;
    const endY = height + 400;
    const totalHeight = endY - startY;
    const segHeight = totalHeight / segments;

    // Slightly different morphing speed for the right side
    const phase = layerIndex * 0.18;
    const depthScale = 1 - (layerIndex * 0.02);

    for (let i = 0; i <= segments; i++) {
        const y = startY + (i * segHeight);
        const t = y / height;
        // Completely different shape for the right side
        let offsetX = (-Math.cos(t * Math.PI * 1.8 + phase) * 100 
                    + Math.sin(t * Math.PI * 3.9 - phase * 1.1) * 55 
                    + Math.cos(t * Math.PI * 8.4 + phase * 1.7) * 30 
                    - Math.sin(t * Math.PI * 15.2 - phase * 2.3) * 15
                    - Math.cos(t * Math.PI * 27 + phase * 3.5) * 8) * depthScale * 0.55;
        points.push({ x: offsetX, y });
    }
    return points;
}

export function pointsToSmoothPath(points, includeMoveTo = true) {
    if (points.length < 2) return '';
    let d = includeMoveTo ? `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}` : '';
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1] || curr;
        
        // Control points for smooth bezier curve interpolation
        const cp1x = prev.x + (curr.x - (points[i - 2] || prev).x) / 4;
        const cp1y = prev.y + (curr.y - prev.y) / 2;
        const cp2x = curr.x - (next.x - prev.x) / 4;
        const cp2y = curr.y - (curr.y - prev.y) / 2;
        
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }
    return d;
}

export function generateHorizontalWave(width, layerIndex) {
    const points = [];
    const segments = 40;
    const segWidth = width / segments;
    const phase = layerIndex * 0.5;

    for (let i = 0; i <= segments; i++) {
        const x = i * segWidth;
        const t = i / segments;
        // Subtle, deep water ripples
        let offsetY = Math.sin(t * Math.PI * 5 + phase) * 8 
                    + Math.cos(t * Math.PI * 11 + phase * 1.5) * 4
                    + Math.sin(t * Math.PI * 18 - phase) * 2;
        points.push({ x, y: offsetY });
    }
    return points;
}

export function getWaterCenterAt(t, viewW, layerIndex, openingRatio) {
    const phaseL = layerIndex * 0.15;
    const phaseR = layerIndex * 0.18;
    const depthScale = 1 - (layerIndex * 0.02);

    const offsetL = (Math.sin(t * Math.PI * 2.2 + phaseL) * 90 
                - Math.cos(t * Math.PI * 4.7 + phaseL * 1.3) * 45 
                + Math.sin(t * Math.PI * 9.1 - phaseL * 0.8) * 25 
                - Math.cos(t * Math.PI * 13.5 + phaseL * 2.1) * 12
                + Math.sin(t * Math.PI * 22 + phaseL * 3.1) * 8) * depthScale * 0.55;
                
    const offsetR = (-Math.cos(t * Math.PI * 1.8 + phaseR) * 100 
                + Math.sin(t * Math.PI * 3.9 - phaseR * 1.1) * 55 
                + Math.cos(t * Math.PI * 8.4 + phaseR * 1.7) * 30 
                - Math.sin(t * Math.PI * 15.2 - phaseR * 2.3) * 15
                - Math.cos(t * Math.PI * 27 + phaseR * 3.5) * 8) * depthScale * 0.55;

    const centerX = viewW / 2;
    const halfOpening = (viewW * openingRatio) / 2;
    const leftEdgeX = centerX - halfOpening + offsetL;
    const rightEdgeX = centerX + halfOpening + offsetR;

    return (leftEdgeX + rightEdgeX) / 2;
}
