import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const orderedAssignments = [{
  id: 1,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}, {
  id: 2,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}, {
  id: 3,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}];

const Assignments = () => {
  const [previewText, setPreviewText] = useState('');
  const [combinedTod, setCombinedTod] = useState('');

  return (
    <div className="position-content position-form">
      <div className="mb-20">
        <span className="section-title">Ordered Assignments</span>
        {orderedAssignments.map(o => (
          <div className="ordered-assignment">
            <span>{o.value}</span>
            <FA name="fa-regular fa-arrows" />
          </div>
        ))}
      </div>
      <div className="content-divider" />
      <div className="input-container">
        <InputActions />
        <Row fluid className="position-content--description">
          <span className="definition-title">Preview Text</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxlength="500"
              name="preview-text"
              placeholder="No Description"
              defaultValue={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="enabled-input"
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {previewText?.length} / 500
          </div>
        </Row>
        <Row fluid className="position-content--description">
          <span className="definition-title">Combined TOD</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxlength="500"
              name="combined-tod"
              placeholder="No Description"
              defaultValue={combinedTod}
              onChange={(e) => setCombinedTod(e.target.value)}
              className="enabled-input"
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {combinedTod?.length} / 500
          </div>
        </Row>
        <div className="position-form--actions">
          <button onClick={() => { }}>Back</button>
          <button onClick={() => { }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
