import { useState, useEffect } from "react";

function Stopwatch() {
  const [stopwatch, setStopwatch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStopwatch((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <>
      <div className="text-4xl text-center p-5">{stopwatch}</div>
      <div className="flex">
        {isRunning ? (
          <div
            className="text-center p-3 m-1 w-30 border-2 border-sky-200"
            onClick={() => {
              setIsRunning(false);
              setStopwatch(0);
            }}
          >
            Reset
          </div>
        ) : (
          <div
            className="text-center p-3 m-1 w-30 border-2 border-sky-200"
            onClick={() => setIsRunning(true)}
          >
            Start
          </div>
        )}
        <div
          className="text-center p-3 m-1 w-30 border-2 border-sky-200"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
