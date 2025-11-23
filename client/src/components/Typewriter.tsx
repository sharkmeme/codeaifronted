import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 80,
  pause = 1200, // pause before restarting
}: {
  text: string;
  speed?: number;
  pause?: number;
}) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    let interval: any;

    if (forward) {
      interval = setInterval(() => {
        setDisplay(text.slice(0, index));
        setIndex((prev) => prev + 1);

        if (index > text.length + 1) {
          setForward(false);
          clearInterval(interval);
          setTimeout(() => setIndex(index - 1), pause);
        }
      }, speed);
    } else {
      interval = setInterval(() => {
        setDisplay(text.slice(0, index));
        setIndex((prev) => prev - 1);

        if (index <= 0) {
          setForward(true);
          clearInterval(interval);
          setTimeout(() => setIndex(1), pause);
        }
      }, speed);
    }

    return () => clearInterval(interval);
  }, [index, forward, text, speed, pause]);

  return (
    <span className="whitespace-pre">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}
