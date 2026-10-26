interface KineticHeadingProps {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}

// Server-rendered so the words are in the HTML for crawlers; motion is pure CSS.
export default function KineticHeading({
  text,
  className = "",
  baseDelay = 0.1,
  step = 0.09,
}: KineticHeadingProps) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="kinetic-line" aria-hidden="true">
          <span
            className="kinetic-word"
            style={{ animationDelay: `${baseDelay + i * step}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
