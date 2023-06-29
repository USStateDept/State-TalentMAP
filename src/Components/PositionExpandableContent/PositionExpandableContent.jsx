import { useState } from 'react';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import CheckBox from 'Components/CheckBox';
import DefinitionList from 'Components/DefinitionList';
import InteractiveElement from 'Components/InteractiveElement';

const PositionExpandableContent = ({ sections }) => {
  const [editMode, setEditMode] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [description, setDescription] = useState(sections.textarea ?? '');

  // TODO: Replace edit mode elements with necessary form, buttons, and functions (diff checking)
  if (editMode) {
    return (
      <div className="position-content">
        <Row fluid className="position-content--section position-content--subheader">
          <div className="line-separated-fields">
            {Object.keys(sections.subheading).map(field => (
              <div>
                <span>{field}:</span>
                <span>{sections.subheading[field]}</span>
              </div>
            ))}
          </div>
          <button className="toggle-edit-mode" onClick={() => { setEditMode(!editMode); }}>
            <FA name="pencil" />
            <div>Edit</div>
          </button>
        </Row>
      </div>
    );
  }
  return (
    <div className="position-content">
      <Row fluid className="position-content--section position-content--subheader">
        <div className="line-separated-fields">
          {Object.keys(sections.subheading).map(field => (
            <div>
              <span>{field}:</span>
              <span>{sections.subheading[field]}</span>
            </div>
          ))}
        </div>
        <button className="toggle-edit-mode" onClick={() => { setEditMode(!editMode); }}>
          <FA name="pencil" />
          <div>Edit</div>
        </button>
      </Row>
      <Row fluid className="position-content--section position-content--details">
        <DefinitionList itemProps={{ excludeColon: true }} items={sections.bodyPrimary} />
      </Row>
      {
        showMore && <>
          <CheckBox
            id="deto"
            label="DETO"
            onCheckBoxClick={e => { console.log(e); }}
            value={false}
            disabled
          />
          <Row fluid className="position-content--section position-content--details">
            <DefinitionList itemProps={{ excludeColon: true }} items={sections.bodySecondary} />
          </Row>
          <div>
            <Row fluid className="position-content--description">
              <span className="definition-title">Position Details</span>
              <Linkify properties={{ target: '_blank' }}>
                <TextareaAutosize
                  maxRows={6}
                  minRows={6}
                  maxlength="4000"
                  name="position-description"
                  placeholder="No Description"
                  defaultValue={description}
                  onChange={e => setDescription(e.target.value)}
                  disabled
                  className={'disabled-input'}
                  draggable={false}
                />
              </Linkify>
              <div className="word-count">
                {description.length} / 4,000
              </div>
            </Row>
          </div>
        </>
      }
      <Row fluid className="position-content--section position-content--footer">
        <div className="position-content--metadata">
          {Object.keys(sections.metadata).map(field => (
            <span>{`${field}: ${sections.metadata[field]}`}</span>
          ))}
        </div>
      </Row>
      <div className="usa-grid-full toggle-more-container">
        <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
          <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
        </InteractiveElement>
      </div>
    </div>
  );
};

PositionExpandableContent.propTypes = {
  tabs: PropTypes.shape({
    subheading: PropTypes.shape({}),
    bodyPrimary: PropTypes.shape({}),
    deto: PropTypes.boolean,
    bodySecondary: PropTypes.shape({}),
    textarea: PropTypes.shape({}),
    metadata: PropTypes.shape({}),
  }).isRequired,
};

export default PositionExpandableContent;
