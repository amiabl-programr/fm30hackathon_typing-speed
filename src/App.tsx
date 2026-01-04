import { useState, useEffect } from "react";
import TypingTest from "./components/typing-test";
import Results from "./components/results";
import StartScreen from "./components/start-screen";

function App() {
  const [mode, setMode] = useState<"timed" | "passage">("timed");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);

  const getPersonalBest = () => {
    const storedBest = localStorage.getItem("personalBest");
    if (storedBest) {
      setPersonalBest(parseInt(storedBest, 10));
    } else return null;
  };
  // getPersonalBest();

  const startTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
  };

  const completeTest = (
    newWpm: number,
    newAccuracy: number,
    newCorrect: number,
    newIncorrect: number
  ) => {
    setWpm(newWpm);
    setAccuracy(newAccuracy);
    setCorrectChars(newCorrect);
    setIncorrectChars(newIncorrect);
    setTestCompleted(true);
    setTestStarted(false);

    if (personalBest === null || newWpm > personalBest) {
      setPersonalBest(newWpm);
      localStorage.setItem("personalBest", newWpm.toString());
    }
  };

  const reset = () => {
    setTestCompleted(false);
    setTestStarted(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {!testStarted && !testCompleted && (
        <StartScreen
          mode={mode}
          setMode={setMode}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startTest={startTest}
          personalBest={personalBest}
        />
      )}
      {testStarted && (
        <TypingTest
          mode={mode}
          difficulty={difficulty}
          completeTest={completeTest}
          personalBest={personalBest}
        />
      )}
      {testCompleted && (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          personalBest={personalBest}
          reset={reset}
        />
      )}
    </div>
  );
}

export default App;
