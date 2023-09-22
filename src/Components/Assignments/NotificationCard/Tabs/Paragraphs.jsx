import { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import { Row } from 'Components/Layout';
import InteractiveElement from 'Components/InteractiveElement';
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

  // Instead of making a ton of variables for tracking the various input data for all
  // paragraphs, I made a data object array that tracks all the important information
  // we need to both render the UI and to submit input data to the BE. To access the
  // data for any given paragraph, just do a simple .find

  const [paragraphDataObjects, setParagraphDataObjects] = useState([]);

  useEffect(() => {
    setParagraphDataObjects(chosenParagraphs.map((p) => (
      { id: p.id, paragraph_title: p.title, input: '', checked: false, open: false }
    )));
  }, []);

  const handleCheck = id => {
    setParagraphDataObjects(paragraphDataObjects.map((item) => (
      item.id === id ? { ...item, checked: !item.checked } : item
    )));
  };

  const handleExpand = id => {
    setParagraphDataObjects(paragraphDataObjects.map((item) => (
      item.id === id ? { ...item, open: !item.open } : item
    )));
  };

  const handleTextInput = (e, id) => {
    setParagraphDataObjects(paragraphDataObjects.map((item) => (
      item.id === id ? { ...item, input: e.target.value } : item
    )));
  };

  return (
    <div className="position-content position-form input-container">
      <InputActions />
      <div className="mb-20">
        <span className="section-title">Chosen Paragraphs</span>
        {paragraphDataObjects.map(o => (
          <div>
            <div className="chosen-paragraph">
              <div>
                <CheckBox
                  id={`ep-checkbox-${o.id}`}
                  name="exclusivePosition"
                  value={value}
                  checked={value}
                  onChange={() => handleCheck(o.id)}
                />
                <span>{o.paragraph_title}</span>
              </div>
              <div>
                <InteractiveElement className="toggle-more" onClick={() => handleExpand(o.id)}>
                  <FA id={o.id} name={`chevron-${paragraphDataObjects?.find(item => item.id === o.id)?.open ? 'up' : 'down'}`} />
                </InteractiveElement>
              </div>
            </div>
            {paragraphDataObjects?.find(item => item.id === o.id)?.open &&
              <div>
                <TextareaAutosize
                  maxRows={4}
                  minRows={4}
                  maxlength="500"
                  name={`${o.title}-input`}
                  placeholder="No Description"
                  value={paragraphDataObjects?.find(item => item.id === o.id)?.input}
                  onChange={(e) => handleTextInput(e, o.id)}
                  className="enabled-input"
                />
              </div>
            }
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
