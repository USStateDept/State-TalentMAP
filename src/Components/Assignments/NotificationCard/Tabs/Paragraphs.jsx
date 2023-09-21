import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import { Row } from 'Components/Layout';
import CheckBox from '../../../CheckBox/CheckBox';
import InputActions from '../Common/InputActions';

const chosenParagraphs = [{
  id: 1,
  active: true,
  title: 'Additional Information',
  value: 'Lorem ipsum',
}, {
  id: 2,
  active: true,
  title: 'Arrival',
  value: 'Lorem ipsum',
}, {
  id: 3,
  active: false,
  title: 'Check-in/QIP Support',
  value: 'Lorem ipsum',
}];

const Paragraphs = () => {
  const [previewText, setPreviewText] = useState('');
  const value = '';

  return (
    <div className="position-content position-form input-container">
      <InputActions />
      <div className="mb-20">
        <span className="section-title">Chosen Paragraphs</span>
        {chosenParagraphs.map(o => (
          <div className="chosen-paragraph">
            <div>
              <CheckBox
                id="exclusivePosition"
                name="exclusivePosition"
                value={value}
                checked={value}
                onChange={() => console.log((e) => !e)}
              />
              <span>{o.title}</span>
            </div>
            <FA name="fa-regular fa-chevron-down" />
          </div>
        ))}
      </div>
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
      <div className="position-form--actions">
        <button onClick={() => { }}>Back</button>
        <button onClick={() => { }}>Next</button>
      </div>
    </div>
  );
};

export default Paragraphs;
