import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    if (!replace) {
      setHistory(prev=> [...prev, newMode]);
      setMode(newMode);
    } else {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
      setMode(newMode);
    }

  }

  function back() {
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));
    } else {
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
};