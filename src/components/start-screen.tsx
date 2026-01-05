import type { Dispatch, SetStateAction } from "react";
import logo_small from "../assets/images/logo-small.svg";
import logo_large from "../assets/images/logo-large.svg";

interface StartScreenProps {
  mode: "timed" | "passage";
  setMode: Dispatch<SetStateAction<"timed" | "passage">>;
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: Dispatch<SetStateAction<"easy" | "medium" | "hard">>;
  startTest: () => void;
  personalBest: number | null;
}

const StartScreen: React.FC<StartScreenProps> = ({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  startTest,
  personalBest,
}) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <img src={logo_small} alt="logo" className="md:hidden" />
        <img src={logo_large} alt="logo" className="hidden md:flex" />
        {personalBest && (
          <span className="text-yellow-400">
            Personal Best: {personalBest} WPM
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <span>WPM: 0</span>
        <span>Accuracy: 100%</span>
        <span>Time: 0:60</span>
        <div>
          Difficulty:
          <button
            className={`ml-2 ${
              difficulty === "easy" ? "bg-blue-500" : "bg-gray-700"
            } px-2 py-1 rounded`}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`ml-2 ${
              difficulty === "medium" ? "bg-blue-500" : "bg-gray-700"
            } px-2 py-1 rounded`}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`ml-2 ${
              difficulty === "hard" ? "bg-blue-500" : "bg-gray-700"
            } px-2 py-1 rounded`}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </button>
        </div>
        <div>
          Mode:
          <button
            className={`ml-2 ${
              mode === "timed" ? "bg-blue-500" : "bg-gray-700"
            } px-2 py-1 rounded`}
            onClick={() => setMode("timed")}
          >
            Timed (60s)
          </button>
          <button
            className={`ml-2 ${
              mode === "passage" ? "bg-blue-500" : "bg-gray-700"
            } px-2 py-1 rounded`}
            onClick={() => setMode("passage")}
          >
            Passage
          </button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded mb-4 text-gray-500">
        {/* Blurred placeholder text */}
        <p>The text to type will appear here once you start...</p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={startTest}
      >
        Start Typing Test
      </button>
      <p className="text-sm text-gray-400 mt-2">
        Or click the text and start typing
      </p>
    </div>
  );
};

export default StartScreen;
