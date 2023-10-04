import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const Remarks = () => {
  const [remarks, setRemarks] = useState('');

  return (
    <div className="position-content position-form input-container">
      <InputActions />
      <Row fluid className="position-content--description">
        <span className="definition-title">Remarks</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="500"
            name="remarks"
            placeholder="No Description"
            defaultValue={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="enabled-input"
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {remarks?.length} / 500
        </div>
      </Row>
      <div className="position-form--actions">
        <button onClick={() => { }}>Back</button>
        <button onClick={() => { }}>Preview/Save</button>
      </div>
    </div>
  );
};

export default Remarks;
