import useFloatingLetters from './useFloatingLetters';

export default function FloatingText({ as: Tag = 'span', children, className = '', intensity = 0.45 }) {
    const textRef = useFloatingLetters(intensity);

    return (
        <Tag ref={textRef} className={className}>
            <span className="floating-text-accessible">{children}</span>
            <span aria-hidden="true">
                {children.split(/(\s+)/).map((word, wordIndex) => (
                    /\s+/.test(word) ? word : (
                        <span className="floating-word" key={wordIndex}>
                            {[...word].map((letter, index) => (
                                <span className="floating-letter-slot" key={index}>
                                    <span className="floating-letter">{letter}</span>
                                </span>
                            ))}
                        </span>
                    )
                ))}
            </span>
        </Tag>
    );
}
