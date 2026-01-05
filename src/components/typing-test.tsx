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
}

// get random text - ensure the text gets randomised not only on refresh, but also when you click the restart btn

const easy = data.easy;
const medium = data.medium;
const hard = data.hard;

const easy_text = easy.map((text) => {
  return text.text;
});
const medium_text = medium.map((text) => {
  return text.text;
});
const hard_text = hard.map((text) => {
  return text.text;
});

function getRandomText(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const randomEasyText = getRandomText(easy_text);
const randomMediumText = getRandomText(medium_text);
const randomHardText = getRandomText(hard_text);

console.log(easy_text);
const passages = {
  easy: randomEasyText,
  medium: randomMediumText,
  hard: randomHardText,
};
const currentTime = Date.now();
const TypingTest: React.FC<TypingTestProps> = ({
  mode,
  difficulty,
  completeTest,
  personalBest,
}) => {
  const [text] = useState(passages[difficulty]);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = () => {
    const timeElapsed = (currentTime - startTime) / 60000; // in minutes
    const correct = typed
      .split("")
      .filter((char, i) => char === text[i]).length;
    const incorrect = typed.length - correct;
    const wpm = Math.round(correct / 5 / timeElapsed);
    const accuracy =
      typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
    completeTest(wpm, accuracy, correct, incorrect);
  };

  useEffect(() => {
    inputRef.current?.focus();
    setStartTime(currentTime);
    if (mode === "timed") {
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
    }
  }, []);

  useEffect(() => {
    if (mode === "passage" && typed.length === text.length) {
      handleComplete();
    }
  }, [typed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(e.target.value);
  };

  const renderText = () => {
    return text.split("").map((char: string, i: number) => {
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
  };

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
      <div className="flex items-center space-x-4 mb-4">
        <span>
          WPM:{" "}
          {Math.round(
            typed.length / 5 / ((currentTime - startTime) / 60000) || 0
          )}
        </span>
        <span>
          Accuracy:{" "}
          {typed.length > 0
            ? Math.round(
                (typed.split("").filter((c, i) => c === text[i]).length /
                  typed.length) *
                  100
              )
            : 100}
          %
        </span>
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
        className="bg-gray-700 text-white px-4 py-2 rounded"
        onClick={handleComplete}
      >
        Restart Test
      </button>
    </div>
  );
};

export default TypingTest;
