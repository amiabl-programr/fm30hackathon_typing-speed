import { useState, useEffect, useRef } from "react";
import data from "../../data.json";

interface TypingTestProps {
  mode: "timed" | "passage";
  difficulty: "easy" | "medium" | "hard";
  completeTest: (
    wpm: number,
    accuracy: number,
    correct: number,
    incorrect: number
  ) => void;
  personalBest: number | null;
  reset: () => void;
}

/* -------------------- DATA SETUP -------------------- */

const easyText = data.easy.map((t) => t.text);
const mediumText = data.medium.map((t) => t.text);
const hardText = data.hard.map((t) => t.text);

function getRandomTextByDifficulty(difficulty: "easy" | "medium" | "hard") {
  const source =
    difficulty === "easy"
      ? easyText
      : difficulty === "medium"
      ? mediumText
      : hardText;

  return source[Math.floor(Math.random() * source.length)];
}

/* -------------------- COMPONENT -------------------- */

const TypingTest: React.FC<TypingTestProps> = ({
  mode,
  difficulty,
  reset,
  completeTest,
  personalBest,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState(() => getRandomTextByDifficulty(difficulty));
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const handleComplete = () => {
    if (!startTime) return;

    const timeElapsedMinutes = elapsedTime / 60000;

    const correct = typed
      .split("")
      .filter((char, i) => char === text[i]).length;

    const incorrect = typed.length - correct;

    const wpm =
      timeElapsedMinutes > 0 ? Math.round(correct / 5 / timeElapsedMinutes) : 0;

    const accuracy =
      typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;

    completeTest(wpm, accuracy, correct, incorrect);
  };

  /* -------------------- TIMER -------------------- */

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (mode !== "timed" || !startTime) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, startTime]);

  /* -------------------- LOGIC -------------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTyped(e.target.value);
  };

  const restartTest = () => {
    setText(getRandomTextByDifficulty(difficulty));
    setTyped("");
    setStartTime(null);
    setElapsedTime(0);
    setTimeLeft(60);
    inputRef.current?.focus();
    reset();
  };

  useEffect(() => {
    if (mode === "passage" && typed.length === text.length) {
      handleComplete();
    }
  }, [typed]);

  /* -------------------- DERIVED METRICS -------------------- */

  const minutes = elapsedTime / 60000;

  const WPM = minutes > 0 ? Math.round(typed.length / 5 / minutes) : 0;

  const accuracy =
    typed.length > 0
      ? Math.round(
          (typed.split("").filter((c, i) => c === text[i]).length /
            typed.length) *
            100
        )
      : 100;

  /* -------------------- RENDER TEXT -------------------- */

  const renderText = () =>
    text.split("").map((char, i) => {
      let color = "text-gray-500";

      if (i < typed.length) {
        color = typed[i] === char ? "text-green-500" : "text-red-500";
      } else if (i === typed.length) {
        color = "underline";
      }

      return (
        <span key={i} className={color}>
          {char}
        </span>
      );
    });

  /* -------------------- UI -------------------- */

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Typing Speed Test</h1>
        {personalBest && (
          <span className="text-yellow-400">
            Personal Best: {personalBest} WPM
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span>WPM: {WPM}</span>
        <span>Accuracy: {accuracy}%</span>
        <span>Time: 0:{timeLeft.toString().padStart(2, "0")}</span>
        <span>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
        <span>Mode: {mode === "timed" ? "Timed (60s)" : "Passage"}</span>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-4 text-lg leading-relaxed">
        {renderText()}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        className="absolute opacity-0"
        autoFocus
      />

      <button
        onClick={restartTest}
        className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Restart Test
      </button>
    </div>
  );
};

export default TypingTest;
