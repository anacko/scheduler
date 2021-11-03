import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setMode(newMode);
    if (replace) {
      setHistory(history => ([...history.slice(0,-1), newMode]))
    } else {
      setHistory(history => ([...history, newMode]))
    }
  }
  
  const back = () => {
    setHistory(history => ([...history.slice(0,-1)]))
    setMode(history[history.length - 2])
  };

  return { mode, transition, back };
}