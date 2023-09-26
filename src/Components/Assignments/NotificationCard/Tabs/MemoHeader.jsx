import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const MemoHeader = () => {
  const [toInput, setToInput] = useState('{{First Name, Last Name}}');
  const [fromInput, setFromInput] = useState('{{First Name, Last Name}}');
  const [subjectInput, setSubjectInput] = useState('Lorem ipsum dolar sit amet');

  return (
    <div className="position-content position-form input-container">
      <div className="memo-input-container">
        <InputActions />
        <div className="position-form--label-input-container">
          <label htmlFor="drafting-office">To</label>
          <input
            id="to-input"
            defaultValue={toInput}
            onChange={(e) => setToInput(e.target.value)}
          />
        </div>
        <div className="position-form--label-input-container">
          <label htmlFor="drafting-office">From</label>
          <input
            id="from-input"
            defaultValue={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
          />
        </div>
        <Row fluid className="position-content--description">
          <span className="definition-title">Subject</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxlength="500"
              name="combined-tod"
              placeholder="No Description"
              defaultValue={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              className="enabled-input"
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {subjectInput?.length} / 500
          </div>
        </Row>
      </div>
      <div className="position-form--actions">
        <button onClick={() => { }}>Cancel</button>
        <button onClick={() => { }}>Next</button>
      </div>
    </div>
  );
};

export default MemoHeader;
