import { useState, useEffect } from "react";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0 && isRunning) {
      setIsRunning(false);
      alert("Time's Up!");
    }
  }, [timer, isRunning]);

  return (
    <>
      <div className="text-4xl text-center p-5">{timer}</div>
      <div className="flex">
        {isRunning ? (
          <>
            <div
              className="text-center p-3 m-1 w-30 border-2 border-sky-200"
              onClick={() => {
                setIsRunning(false);
              }}
            >
              Stop
            </div>
            <div
              className="text-center p-3 m-1 w-30 border-2 border-sky-200"
              onClick={() => {
                setIsRunning(false);
                setTimer(0);
              }}
            >
              Reset
            </div>
          </>
        ) : (
          <>
            <div
              className="text-center p-3 m-1 w-30 border-2 border-sky-200"
              onClick={() => setIsRunning(true)}
            >
              Start
            </div>
            <div
              className="text-center p-3 m-1 w-14 border-2 border-sky-200"
              onClick={() => setTimer((prev) => prev + 1)}
            >
              ↑
            </div>
            <div
              className="text-center p-3 m-1 w-14 border-2 border-sky-200"
              onClick={() => setTimer((prev) => Math.max(prev - 1, 0))}
            >
              ↓
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Timer;
