import useFloatingLetters from './useFloatingLetters';

const WORDS = [
    { text: 'Tasrif', className: 'name-first' },
    { text: 'Ahmed', className: 'name-last' },
    { text: 'Mohsin', className: 'name-surname' },
];

export default function FloatingHeroName() {
    const headingRef = useFloatingLetters();


    return (
        <h1 ref={headingRef} className="hero-name animate-in" aria-label="Tasrif Ahmed Mohsin">
            {WORDS.map(word => (
                <span key={word.text} className={word.className} aria-hidden="true">
                    {[...word.text].map((letter, index) => (
                        <span className="floating-letter-slot" key={index}>
                            <span className="floating-letter">{letter}</span>
                        </span>
                    ))}
                </span>
            ))}
        </h1>
    );
}
