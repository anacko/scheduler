import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setMode(newMode);
    if (replace) {
      history.pop();
    }
    setHistory([...history, newMode])
  }
  
  const back = () => {
    history.pop();
    setHistory([...history])
    setMode(history[history.length - 1])
  };

  return { mode, transition, back };
}