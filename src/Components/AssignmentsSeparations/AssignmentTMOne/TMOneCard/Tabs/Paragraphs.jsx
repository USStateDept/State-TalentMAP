import { useState } from 'react';
import Linkify from 'react-linkify';
import { Tooltip } from 'react-tippy';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InteractiveElement from 'Components/InteractiveElement';
import CheckBox from '../../../../CheckBox/CheckBox';
import InputActions from '../Common/InputActions';

const Paragraphs = (props) => {
  const {
    selections,
    setSelections,
    paragraphs,
    getCableValue,
    handleDefaultClear,
    defaultSelections,
  } = props;

  const [expanded, setExpanded] = useState([]);

  const overridedParagraphs = () => {
    const text = getCableValue('PARAGRAPHS');
    let textArray = text.split(/\n\n/);
    textArray.shift();
    textArray.pop();
    textArray = textArray.map(t => t.substr(t.indexOf(' ') + 1));
    const paragraphArray = textArray.map(t => {
      const values = t.split(/\n/);
      return {
        NOTP_SHORT_DESC_TEXT: values[0],
        NOTP_DESC_TEXT: t.substr(t.indexOf('\n') + 1),
      };
    });
    console.log(paragraphArray);
    return paragraphArray;
  };
  overridedParagraphs();

  const getParagraphs = () => {
    const paragraphForm = paragraphs;

    return paragraphForm;
  };

  getParagraphs();

  const handleCheck = (id) => {
    let newSelections = [...selections];
    if (selections.includes(id)) {
      newSelections = newSelections.filter(s => s !== id);
    } else {
      newSelections.push(id);
    }
    setSelections(newSelections);
  };

  const handleExpand = (id) => {
    let newExpanded = [...expanded];
    if (expanded.includes(id)) {
      newExpanded = newExpanded.filter(s => s.NOTP_CODE === id);
    } else {
      newExpanded.push(id);
    }
    setExpanded(newExpanded);
  };

  // const handleOverrideText = () => {

  // };

  return (
    <div className="position-content position-form input-container">
      <InputActions
        keys={['PARAGRAPHS']}
        getCableValue={getCableValue}
        handleDefaultClear={handleDefaultClear}
        paragraphSelections={selections}
        paragraphDefault={defaultSelections}
      />
      <div className="mb-20">
        <span className="section-title">Chosen Paragraphs</span>
        {paragraphs.sort((a, b) => a.ORDER_NUM - b.ORDER_NUM).map(o => {
          const selected = selections.includes(o.NOTP_CODE);
          return (
            <div key={o.NOTP_CODE}>
              <div className="chosen-paragraph">
                <div>
                  <CheckBox
                    id={`${o.NOTP_CODE}-checkbox`}
                    name={`${o.NOTP_CODE}-checkbox`}
                    value={selected}
                    onChange={() => handleCheck(o.NOTP_CODE)}
                  />
                  <span>{o.NOTP_SHORT_DESC_TEXT}</span>
                </div>
                <div>
                  <InteractiveElement className="toggle-more" onClick={() => handleExpand(o.NOTP_CODE)}>
                    <FA id={o.NOTP_CODE} name={`chevron-${expanded.includes(o.NOTP_CODE) ? 'up' : 'down'}`} />
                  </InteractiveElement>
                </div>
              </div>
              {expanded.includes(o.NOTP_CODE) &&
                <Tooltip title="Ensure paragraph is selected before editing the text.">
                  <div>
                    <TextareaAutosize
                      maxRows={6}
                      minRows={4}
                      maxLength="500"
                      name={`${o.NOTP_CODE}-input`}
                      placeholder="No Description"
                      value={paragraphs?.find(item => item.NOTP_CODE === o.NOTP_CODE)?.NOTP_DESC_TEXT}
                      className={!selected ? 'disabled-input' : ''}
                      disabled={!selected}
                    />
                  </div>
                </Tooltip>
              }
            </div>
          );
        })}
      </div>
      <Row fluid className="position-content--description">
        <span className="definition-title">Preview Text</span>
        <Tooltip title="Save changes to generate new preview text.">
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={12}
              minRows={4}
              maxLength="500"
              name="preview-text"
              placeholder="No Description"
              value={getCableValue('PARAGRAPHS')}
              className="disabled-input"
              draggable={false}
              disabled
            />
          </Linkify>
        </Tooltip>
        <div className="word-count">
          {getCableValue('PARAGRAPHS')?.length} / 500
        </div>
      </Row>
    </div>
  );
};

Paragraphs.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelections: PropTypes.func.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.shape({})),
  getCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
  defaultSelections: PropTypes.arrayOf(PropTypes.string),
};

Paragraphs.defaultProps = {
  selections: undefined,
  setSelections: undefined,
  paragraphs: undefined,
  defaultSelections: undefined,
};

export default Paragraphs;
