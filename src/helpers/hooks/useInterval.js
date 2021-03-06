//useInterval.js
//This component will build a custom function that will setup a timeout.

import { useEffect, useRef } from "react";

export default function useInterval(callback, delay, ...args) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(...args);
    }
    if (delay !== null && delay !== undefined) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [args, delay]);
}
