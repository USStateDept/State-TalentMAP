import { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'Components/TextInput';
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
  const [combinedTodCode, setcombinedTodCode] = useState([]);

  const addTod = (input, type) => {
    setcombinedTodCode([...combinedTodCode, `${input}${type}`]);
    if (type === 'MM') setTourInput('');
    if (type === 'RR') setRrInput('');
    if (type === 'HL') setHlInput('');
  };

  const submit = () => {
    if (combinedTodCode.length) submitCustomTod(combinedTodCode);
  };

  const clear = () => {
    setcombinedTodCode('');
  };

  return (
    <div className="tod-modal-container">
      <div className="tod-modal-wrapper">
        <div className="tod-input-and-button">
          <button className="custom-tod-pill">TR</button>
          <span>
            <TextInput
              changeText={e => (setTourInput(e))}
              value={tourInput}
              id="tod-input"
              placeholder=""
              inputProps={{
                autoComplete: 'off',
              }}
            />
          </span>
          <InteractiveElement
            onClick={tourInput.length ? () => addTod(tourInput, 'MM') : () => {}}
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
          <button className="custom-tod-pill">RR</button>
          <span>
            <TextInput
              changeText={e => (setRrInput(e))}
              value={rrInput}
              id="tod-input"
              placeholder=""
              inputProps={{
                autoComplete: 'off',
              }}
            />
          </span>
          <InteractiveElement
            onClick={rrInput.length ? () => addTod(rrInput, 'RR') : () => {}}
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
          <button className="custom-tod-pill">HL</button>
          <span>
            <TextInput
              changeText={e => (setHlInput(e))}
              value={hlInput}
              id="tod-input"
              placeholder=""
              inputProps={{
                autoComplete: 'off',
              }}
            />
          </span>
          <InteractiveElement
            onClick={hlInput.length ? () => addTod(hlInput, 'HL') : () => {}}
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
      <div className="tod-buttons">
        <button onClick={submit}>OK</button>
        <button onClick={cancel}>Cancel</button>
        <button onClick={clear}>Clear</button>
      </div>
      <div className="tod-buttons">
        <div>Tour: {combinedTodCode.length
          ? combinedTodCode.map((tod, i, arr) => (i + 1 === arr.length ? tod : `${tod}/`))
          : ''}
        </div>
      </div>
    </div>
  );
};

TodModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  submitCustomTod: PropTypes.func.isRequired,
};

export default TodModal;
