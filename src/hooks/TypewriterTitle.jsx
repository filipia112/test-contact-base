import { useState, useEffect } from "react";

export default function TypewriterTitle({ words = ["Contact Base", "Not Found 404"], className = "text-[72px] leading-none font-extrabold tracking-tight" }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 60 : 120;

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      setText((prev) => {
        return isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1);
      });

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 900);
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((i) => i + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed]);

  return (
    <h1 className={className}>
      {text}
      <span className="inline-block ml-2 animate-blink">|</span>
      <style>{`.animate-blink{animation: blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </h1>
  );
}
