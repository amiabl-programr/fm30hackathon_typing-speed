import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ResultsProps {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  personalBest: number | null;
  reset: () => void;
}

const Results: React.FC<ResultsProps> = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  personalBest,
  reset,
}) => {
  const { width, height } = useWindowSize();
  const isBaseline = personalBest === null || wpm === personalBest; // First time or equal
  const isHighScore = personalBest !== null && wpm > personalBest;
  const title = isHighScore
    ? "High Score Smashed!"
    : isBaseline
    ? "Baseline Established!"
    : "Test Complete!";
  const message = isHighScore
    ? "You're getting faster. That was incredible typing."
    : isBaseline
    ? "You've set the bar. Now the real challenge begins—time to beat it."
    : "Solid run. Keep pushing to beat your high score.";
  const buttonText = isBaseline ? "Beat This Score" : "Go Again";

  return (
    <div className="w-full max-w-2xl text-center">
      {isHighScore && <Confetti width={width} height={height} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Typing Speed Test</h1>
        <span className="text-yellow-400">
          Personal Best: {personalBest ?? wpm} WPM
        </span>
      </div>
      <div className="bg-green-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{message}</p>
      <div className="flex justify-center space-x-4 mb-4">
        <div className="bg-gray-800 p-2 rounded">
          <span>WPM:</span>
          <p className="text-red-500 text-2xl">{wpm}</p>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <span>Accuracy:</span>
          <p className="text-green-500 text-2xl">{accuracy}%</p>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <span>Characters:</span>
          <p className="text-pink-500 text-2xl">
            {correctChars}/{incorrectChars}
          </p>
        </div>
      </div>
      <button className="bg-white text-black px-4 py-2 rounded" onClick={reset}>
        {buttonText}
      </button>
    </div>
  );
};

export default Results;
