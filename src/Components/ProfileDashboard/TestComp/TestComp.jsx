import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';


const TestComp = props => {
  // Props
  const {
    showComp,
  } = props;
  // bring in props here
  // function TestComp() {
  const [newColor, setNewColor] = useState(false);
  const [hideComp, setHideComp] = useState(false);

  let changeColor = 'blue';

  // setup function here
  // that gets called when clicking setHideComp
  // when clicking the "x"
  // should be like "change text" in pos manger search
  function changeHiddenComp() {
    // this should call hideComp (parent) in my example
    props.hideComp(showComp);
    setHideComp(true);
  }

  if (newColor) {
    changeColor = 'red';
  }

  return (
    <div>
      <div style={{ color: changeColor }}>
        Test Comp
        <FA
          name="bars"
          onClick={() => setNewColor(!newColor)}
        />
      </div>
      <FA
        name="times-circle"
        // onClick={() => setHideComp(!hideComp)}
        onClick={() => changeHiddenComp(!hideComp)}
        // prop functionality in Classifications
        // call function in parent
      />
      { hideComp.toString() }
    </div>
  );
};

// set up props
TestComp.propTypes = {
  showComp: PropTypes.bool,
  hideComp: PropTypes.func,
};

TestComp.defaultProps = {
  showComp: false,
  hideComp: EMPTY_FUNCTION,
};

export default TestComp;
