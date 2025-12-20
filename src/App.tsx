import data from "../data.json";
import logo_small from "./assets/images/logo-small.svg";
import logo_large from "./assets/images/logo-large.svg";
import personal_best from "./assets/images/icon-personal-best.svg";
import restart from "./assets/images/icon-restart.svg";

export default function App() {
  console.log(data);

  return (
    <>
      <header className="flex justify-between ">
        <div>
          <img src={logo_small} className="md:hidden" alt="" />
          <img src={logo_large} className="hidden md:inline" alt="" />
        </div>

        <div className="flex items-center gap-2">
          <img src={personal_best} alt="" />
          <div className="text-neutral-400">
            <span className="hidden md:inline">Personal </span>
            Best:
            <span className="text-neutral-0">92 WPM</span>
          </div>
        </div>
      </header>

      <main className="">
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="stats flex items-center gap-8">
              <div>
                <span className="text-neutral-400">WPM: </span>
                <span className="text-neutral-0">0</span>
              </div>
              <div>
                <span className="text-neutral-400">Accuracy </span>
                <span className="text-neutral-0">%</span>
              </div>
              <div>
                <span className="text-neutral-400">Time: </span>
                <span className="text-neutral-0">0</span>
              </div>
            </div>

            {/* difficulty */}
            <div className="settings flex items-center gap-4">
              <div>
                <select name="difficulty" id="" className="text-neutral-0">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <select name="timer" id="" className="text-neutral-0">
                  <option value="Timed">Timed(60s)</option>
                  <option value="Passage">Passage</option>
                </select>
              </div>
            </div>
          </div>

          {/* text area */}
          <div>
            <textarea name="" id=""></textarea>
          </div>
        </div>

        <div>
          <button className="bg-neutral-800 text-neutral-0 flex items-center gap-2 p-4 rounded-xl">
            <span>Restart Test</span>
            <img src={restart} alt="restart_icon" />
          </button>
        </div>
      </main>
    </>
  );
}
