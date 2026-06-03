import { useMemo } from 'react';

// We will use inline SVG data URIs for the wave images to match the design aesthetics (paper-cut drop shadow)
// Colors match the deep water aesthetic of the design: #0d3962, #0a3055, #082645, #051d36

const wave1 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='-4' stdDeviation='6' flood-color='%23000' flood-opacity='0.4'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M0,200 C300,300 300,100 600,200 C900,300 900,100 1200,200 L1200,400 L0,400 Z' fill='%230d3962' filter='url(%23s)'/%3E%3C/svg%3E`;

const wave2 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='-4' stdDeviation='5' flood-color='%23000' flood-opacity='0.35'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M0,250 C250,150 450,350 700,250 C950,150 1100,250 1200,200 L1200,400 L0,400 Z' fill='%230a3055' filter='url(%23s)'/%3E%3C/svg%3E`;

const wave3 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='-3' stdDeviation='5' flood-color='%23000' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M0,150 C350,50 350,250 600,150 C850,50 950,200 1200,150 L1200,400 L0,400 Z' fill='%23082645' filter='url(%23s)'/%3E%3C/svg%3E`;

const wave4 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='-3' stdDeviation='4' flood-color='%23000' flood-opacity='0.25'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M0,200 C200,300 400,100 600,200 C800,300 1000,100 1200,200 L1200,400 L0,400 Z' fill='%23051d36' filter='url(%23s)'/%3E%3C/svg%3E`;


export default function WaterSurface() {
    return (
        <div className="animation-wrapper">
            <div className="water">
                <ul className="waves">
                    <li className="wave-one" style={{ backgroundImage: `url("${wave1}")` }}></li>
                    <li className="wave-two" style={{ backgroundImage: `url("${wave2}")` }}></li>
                    <li className="wave-three" style={{ backgroundImage: `url("${wave3}")` }}></li>
                    <li className="wave-four" style={{ backgroundImage: `url("${wave4}")` }}></li>
                    {/* Reusing the waves to cover the top-down vertical river */}
                    <li className="wave-five" style={{ backgroundImage: `url("${wave1}")` }}></li>
                    <li className="wave-six" style={{ backgroundImage: `url("${wave2}")` }}></li>
                </ul>
            </div>
        </div>
    );
}
