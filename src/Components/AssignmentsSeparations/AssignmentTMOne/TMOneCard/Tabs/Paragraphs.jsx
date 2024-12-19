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
    modCableValue,
    handleDefaultClear,
    disableParagraphSelect,
  } = props;

  const [expanded, setExpanded] = useState([]);

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

  return (
    <div className="position-content position-form input-container">
      <InputActions
        keys={['PARAGRAPHS']}
        getCableValue={getCableValue}
        handleDefaultClear={handleDefaultClear}
      />
      <div className="mb-20">
        <span className="section-title">Chosen Paragraphs</span>
        {paragraphs.sort((a, b) => a.ORDER_NUM - b.ORDER_NUM).map(o => {
          const selected = selections.includes(o.NOTP_CODE);
          return (
            <div key={o.NOTP_CODE}>
              <div className="chosen-paragraph">
                <div>
                  {disableParagraphSelect ?
                    <Tooltip title="Reset this tab to default and save in order to reselect paragraph options.">
                      <CheckBox
                        id={`${o.NOTP_CODE}-checkbox`}
                        name={`${o.NOTP_CODE}-checkbox`}
                        value={selected}
                        disabled
                      />
                    </Tooltip> :
                    <Tooltip title="Please save after reselecting paragraph options in order to see updates in the preview.">
                      <CheckBox
                        id={`${o.NOTP_CODE}-checkbox`}
                        name={`${o.NOTP_CODE}-checkbox`}
                        value={selected}
                        onChange={() => handleCheck(o.NOTP_CODE)}
                      />
                    </Tooltip>
                  }
                  <span>{o.NOTP_SHORT_DESC_TEXT}</span>
                </div>
                <div>
                  <InteractiveElement className="toggle-more" onClick={() => handleExpand(o.NOTP_CODE)}>
                    <FA id={o.NOTP_CODE} name={`chevron-${expanded.includes(o.NOTP_CODE) ? 'up' : 'down'}`} />
                  </InteractiveElement>
                </div>
              </div>
              {expanded.includes(o.NOTP_CODE) &&
                <div>
                  <TextareaAutosize
                    maxRows={6}
                    minRows={4}
                    maxLength="500"
                    name={`${o.NOTP_CODE}-input`}
                    placeholder="No Description"
                    value={paragraphs?.find(item => item.NOTP_CODE === o.NOTP_CODE)?.NOTP_DESC_TEXT}
                    className="disabled-input"
                    disabled
                  />
                </div>
              }
            </div>
          );
        })}
      </div>
      <Row fluid className="position-content--description">
        <span className="definition-title">Preview Text</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={12}
            minRows={4}
            maxLength="500"
            name="preview-text"
            placeholder="No Description"
            value={getCableValue('PARAGRAPHS')}
            onChange={(e) => modCableValue('PARAGRAPHS', e.target.value)}
            draggable={false}
          />
        </Linkify>
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
  modCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
  disableParagraphSelect: PropTypes.bool.isRequired,
};

Paragraphs.defaultProps = {
  selections: undefined,
  setSelections: undefined,
  paragraphs: undefined,
};

export default Paragraphs;
