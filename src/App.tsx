import { MouseEvent, useState } from 'react';
import './App.css';

//Each dot contains x and y coordinates
type TDot = {
  x: number;
  y: number;
};

function App() {
  //State
  const [dots, setDots] = useState<TDot[]>([]);
  const [popped, setPopped] = useState<TDot[]>([]);

  //Functions
  //Function which adds the dots to dot array when user clicks on the screen
  const handleClick = (e: MouseEvent) => {
    setDots((prevVal) => [
      ...prevVal,
      {
        x: e.clientX,
        y: e.clientY,
      },
    ]);
  };

  //Function which pops the last dot from the dots array and adds it to the end of popped array 
  const handleUndo = (e: MouseEvent) => {
    e.stopPropagation();
    if (dots.length < 1) return;
    const last = dots[dots.length - 1];
    setPopped((prev) => [...prev, last]);
    setDots((prev) => {
      prev.pop();
      return [...prev];
    });
  };

  //Function which pops the last dot from the popped array and adds it to the end of dots array
  const handleRedo = (e: MouseEvent) => {
    e.stopPropagation();
    if (popped.length < 1) return;
    const last = popped[popped.length - 1];
    setDots((prev) => [...prev, last]);
    setPopped((prev) => {
      prev.pop();
      return [...prev];
    });
  };

  return (
    <>
      <div className="wrapper" onClick={handleClick}>
        {/* Here we map the dots */}
        {dots.map((dot, index) => (
          <div
            // We set the dots position on the screen
            style={{
              top: dot.y + 'px',
              left: dot.x + 'px',
            }}
            className="dot"
            key={index}
          ></div>
        ))}
        <div className="btn-wrapper">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
      </div>
    </>
  );
}

export default App;
