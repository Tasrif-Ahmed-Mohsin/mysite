const CHAPTERS = [
    { id: 'chapter-harbor', label: 'The Harbor' },
    { id: 'chapter-sail', label: 'Setting Sail' },
    { id: 'chapter-voyage', label: 'The Voyage' },
    { id: 'chapter-deep', label: 'The Deep' },
    { id: 'chapter-lighthouse', label: 'The Lighthouse' },
];

export default function ChapterNav({ activeChapter }) {
    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="chapter-nav" aria-label="Chapter navigation">
            <div className="chapter-nav-track">
                {/* Vertical connecting line */}
                <div className="chapter-nav-line">
                    <div
                        className="chapter-nav-line-fill"
                        style={{ height: `${(activeChapter / (CHAPTERS.length - 1)) * 100}%` }}
                    />
                </div>

                {CHAPTERS.map((ch, i) => (
                    <button
                        key={ch.id}
                        className={`chapter-dot${i === activeChapter ? ' active' : ''}${i < activeChapter ? ' passed' : ''}`}
                        onClick={() => handleClick(ch.id)}
                        aria-label={ch.label}
                        aria-current={i === activeChapter ? 'step' : undefined}
                    >
                        <span className="dot-pip" />
                        <span className="dot-label">{ch.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
