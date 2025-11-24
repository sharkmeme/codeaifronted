import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 220,
  pause = 0, // no loop pause needed
}: {
  text: string;
  speed?: number;
  pause?: number;
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="whitespace-pre">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}

