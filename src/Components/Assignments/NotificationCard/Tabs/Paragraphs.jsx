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
  // Because we don't know how many paragraphs will be coming in to this page,
  // these two arrays track what text was entered into which dynamically
  // generated text box in the format of
  // {id: '', open: bool} for tracking which expand icons were clicked
  // {paragraph_type: '', input: ''} for tracking text inputs for each paragraph type
  // This makes it easier to track all input data and package it for BE
  const [expandedRef, setExpandedRef] = useState([]);
  const [paragraphInputs, setParagraphInputs] = useState([]);
  const value = '';

  useEffect(() => {
    setExpandedRef(chosenParagraphs.map((p) => ({ id: p.id, open: false })));
    setParagraphInputs(chosenParagraphs.map((p) => ({ paragraph_type: p.title, input: '' })));
  }, []);

  const handleExpand = id => {
    setExpandedRef(expandedRef.map((item) => (
      item.id === id ? { ...item, open: !item.open } : item
    )));
  };

  const handleTextInput = (e, title) => {
    setParagraphInputs(paragraphInputs.map((item) => (
      item.paragraph_type === title ? { ...item, input: e.target.value } : item
    )));
  };

  return (
    <div className="position-content position-form input-container">
      <InputActions />
      <div className="mb-20">
        <span className="section-title">Chosen Paragraphs</span>
        {chosenParagraphs.map(o => (
          <div>
            <div className="chosen-paragraph">
              <div>
                <CheckBox
                  id={`ep-checkbox-${o.id}`}
                  name="exclusivePosition"
                  value={value}
                  checked={value}
                  onChange={() => console.log((e) => !e)}
                />
                <span>{o.title}</span>
              </div>
              <div>
                <InteractiveElement className="toggle-more" onClick={() => handleExpand(o.id)}>
                  <FA id={o.id} name={`chevron-${expandedRef?.find(item => item.id === o.id)?.open ? 'up' : 'down'}`} />
                </InteractiveElement>
              </div>
            </div>
            {expandedRef?.find(item => item.id === o.id)?.open &&
              <div>
                <TextareaAutosize
                  maxRows={4}
                  minRows={4}
                  maxlength="500"
                  name={`${o.title}-input`}
                  placeholder="No Description"
                  value={paragraphInputs?.find(item => item.paragraph_type === o.title)?.input}
                  onChange={(e) => handleTextInput(e, o.title)}
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
