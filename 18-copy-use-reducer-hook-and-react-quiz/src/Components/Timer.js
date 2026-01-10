import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        //   console.log("Tick");
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div>
      {/* <p className="timer">05:00</p> */}
      <p className="timer">
        {minutes < 10 && 0}
        {minutes}:{secs < 10 && 0}
        {secs}
      </p>
    </div>
  );
}

export default Timer;
