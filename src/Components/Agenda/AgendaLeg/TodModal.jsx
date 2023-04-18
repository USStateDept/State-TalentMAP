import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'Components/TextInput';

const TodModal = (props) => {
  const {
    cancel,
    submitCustomTod,
  } = props;

  const [tourInput, setTourInput] = useState('');
  const [rrInput, setRrInput] = useState('');
  const [hlInput, setHlInput] = useState('');
  const [combinedTodCode, setcombinedTodCode] = useState('');

  useEffect(() => {
    setcombinedTodCode(`${tourInput}${tourInput.length ? 'MM' : ''}${rrInput}${rrInput.length ? 'RR' : ''}${hlInput}${hlInput.length ? 'HL' : ''}`);
  }, [tourInput, rrInput, hlInput]);

  const submit = () => {
    submitCustomTod(combinedTodCode);
  };

  return (
    <div className="tod-modal-container">
      <div className="tod-modal-wrapper">
        <div className="tod-input-and-button">
          <button className="custom-tod-pill">Tour</button>
          <TextInput
            changeText={e => (setTourInput(e))}
            value={tourInput}
            id={'tod-tour-input'}
            placeholder=""
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </div>
        <div className="tod-input-and-button">
          <button className="custom-tod-pill">RR</button>
          <TextInput
            changeText={e => (setRrInput(e))}
            value={rrInput}
            id={'tod-rr-input'}
            placeholder=""
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </div>
        <div className="tod-input-and-button">
          <button className="custom-tod-pill">HL</button>
          <TextInput
            changeText={e => (setHlInput(e))}
            value={hlInput}
            id={'tod-hl-input'}
            placeholder=""
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </div>
      </div>
      <div className="ted-button">
        <button onClick={submit}>OK</button>
        <button onClick={cancel}>Cancel</button>
      </div>
      <div className="ted-button">
        <div>{combinedTodCode}</div>
      </div>
    </div>
  );
};

TodModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  submitCustomTod: PropTypes.func.isRequired,
};

export default TodModal;
