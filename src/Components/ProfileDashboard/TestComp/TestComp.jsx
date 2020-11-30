import FA from 'react-fontawesome';
import { useState } from 'react';

function TestComp() {
  const [showComp, setShowComp] = useState(false);

  let changeColor = 'blue';

  if (showComp) {
    changeColor = 'red';
  }

  return (
    <div className="section-padded-inner-container small-link-container view-more-link-centered" style={{ color: changeColor }}>
      Test Comp
      <FA
        name="bars"
        onClick={() => setShowComp(!showComp)}
      />
    </div>
  );
}

export default TestComp;
