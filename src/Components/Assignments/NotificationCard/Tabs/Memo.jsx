import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';

const Memo = () => {
  const [training, setTraining] = useState('');

  return (
    <div className="position-content position-form input-container">
      <div className="memo-header-row">
        <div className="memo-header-bold">To</div>
      </div>
      <Row fluid className="position-content--description">
        <span className="definition-title">Training</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="500"
            name="training"
            placeholder="No Description"
            defaultValue={training}
            onChange={(e) => setTraining(e.target.value)}
            className="enabled-input"
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {training?.length} / 500
        </div>
      </Row>
      <div className="position-form--actions">
        <button onClick={() => { }}>Back</button>
        <button onClick={() => { }}>Next</button>
      </div>
    </div>
  );
};

export default Memo;
