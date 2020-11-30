import FA from 'react-fontawesome';
import { useState } from 'react';

function TestComp() {
  const [newColor, setNewColor] = useState(false);
  const [hideComp, setHideComp] = useState(false);

  let changeColor = 'blue';
  let hide = false;

  if (newColor) {
    changeColor = 'red';
  }

  if (hideComp) {
    hide = true;
  }

  return (
    <div>
      {
        hide && (
          <div style={{ color: changeColor }}>
            Test Comp
            <FA
              name="bars"
              onClick={() => setNewColor(!newColor)}
            />
          </div>
        )
      }
      <FA
        name="times-circle"
        onClick={() => setHideComp(!hideComp)}
      />
    </div>
  );
}

export default TestComp;
