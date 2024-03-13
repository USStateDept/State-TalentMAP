import { useState } from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from 'Components/InteractiveElement';
import FA from 'react-fontawesome';

const TodModal = (props) => {
  const {
    cancel,
    submitCustomTod,
  } = props;

  const [tourInput, setTourInput] = useState('');
  const [rrInput, setRrInput] = useState('');
  const [hlInput, setHlInput] = useState('');
  const [months, setMonths] = useState(0);
  const [combinedTodCode, setcombinedTodCode] = useState([]);

  const addTod = (input, type) => {
    if (input.length) {
      setcombinedTodCode([...combinedTodCode, `${input}${type}`]);
      if (type === 'MM') {
        setMonths(Number(input) + months);
        setTourInput('');
      }
      if (type === 'HL') {
        setMonths(Number(input) + months);
        setHlInput('');
      }
      if (type === 'RR') setRrInput('');
    }
  };

  const submit = () => {
    if (combinedTodCode.length) submitCustomTod(combinedTodCode, months);
  };

  const clear = () => {
    setMonths(0);
    setcombinedTodCode('');
  };

  const handleKeyDown = (event, updateFn) => {
    if (event.key === 'Enter') {
      updateFn();
    }
  };

  return (
    <div className="tod-modal-container">
      <div className="tod-modal-wrapper">
        <div className="tod-input-and-button">
          <label htmlFor="tour">Tour:</label>
          <input
            type="number"
            id="tour"
            value={tourInput}
            onChange={e => setTourInput(e.target.value)}
            min="1"
            max="99"
            onKeyDown={(e) => handleKeyDown(e, () => addTod(tourInput, 'MM'))}
          />
          <InteractiveElement
            onClick={() => addTod(tourInput, 'MM')}
            title="Add to Tour Length"
            className="tod-add-clickable"
          >
            <FA
              name="plus-circle"
              className={tourInput.length ? 'tod-icon' : 'tod-unclickable'}
            />
          </InteractiveElement>
        </div>
        <div className="tod-input-and-button">
          <label htmlFor="rr">RR:</label>
          <input
            type="number"
            id="rr"
            value={rrInput}
            onChange={e => setRrInput(e.target.value)}
            min="1"
            max="99"
            onKeyDown={(e) => handleKeyDown(e, () => addTod(rrInput, 'RR'))}
          />
          <InteractiveElement
            onClick={() => addTod(rrInput, 'RR')}
            title="Add R&R"
            className="tod-add-clickable"
          >
            <FA
              name="plus-circle"
              className={rrInput.length ? 'tod-icon' : 'tod-unclickable'}
            />
          </InteractiveElement>
        </div>
        <div className="tod-input-and-button">
          <label htmlFor="hl">HL:</label>
          <input
            type="number"
            id="hl"
            value={hlInput}
            onChange={e => setHlInput(e.target.value)}
            min="1"
            max="99"
            onKeyDown={(e) => handleKeyDown(e, () => addTod(hlInput, 'HL'))}
          />
          <InteractiveElement
            onClick={() => addTod(hlInput, 'HL')}
            title="Add Home Leave"
            className="tod-add-clickable"
          >
            <FA
              name="plus-circle"
              className={hlInput.length ? 'tod-icon' : 'tod-unclickable'}
            />
          </InteractiveElement>
        </div>
      </div>
      <div className="tod-preview">
        <span>Preview</span>
        <div>{combinedTodCode.length
          ? combinedTodCode.map((tod, i, arr) => (i + 1 === arr.length ? tod : `${tod}/`))
          : ''}
        </div>
        <button className={`unstyled-button ${combinedTodCode.length ? '' : 'hide-clear'}`} onClick={clear}>
          <FA name="times" />
          Clear
        </button>
      </div>
      <div className="tod-buttons">
        <button onClick={submit}>OK</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};

TodModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  submitCustomTod: PropTypes.func.isRequired,
};

export default TodModal;
