import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import DefinitionList from 'Components/DefinitionList';
import InteractiveElement from 'Components/InteractiveElement';

const PositionExpandableContent = ({ sections, form }) => {
  const handleEdit = form?.handleEdit ?? {};
  const { editMode, setEditMode } = handleEdit;

  const [showMore, setShowMore] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (editMode) {
      setShowMore(true);
    }
  }, [editMode]);

  const onCancel = () => {
    form.handleCancel();
    setEditMode(false);
    swal.close();
  };


  const getBody = () => {
    if (editMode && form) return form.staticBody;
    if (showMore) return { ...sections.bodyPrimary, ...sections.bodySecondary };
    const minScreenWidth = 1650;
    // Append additional fields to collapsed view to fill blank space on wider screens
    if (minScreenWidth < windowWidth) {
      const appendSecondary = [];
      const numFields = Math.floor((windowWidth - minScreenWidth) / 190);
      Object.keys(sections.bodySecondary).slice(0, numFields).forEach(o => {
        appendSecondary[o] = sections.bodySecondary[o];
      });
      return { ...sections.bodyPrimary, ...appendSecondary };
    }
    return sections.bodyPrimary;
  };

  const showCancelModal = () => {
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{form.cancelText || 'Are you sure you want to discard all changes made to this position?'}</span>
          </div>
          <div className="modal-controls">
            <button onClick={onCancel}>Submit</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="position-content">
      <Row fluid className="position-content--section position-content--subheader">
        <div className="line-separated-fields">
          {Object.keys(sections.subheading).map(field => (
            <div key={`subheading-${field}`}>
              <span>{field}:</span>
              <span>{sections.subheading[field]}</span>
            </div>
          ))}
        </div>
        {(form && !editMode) &&
          <button className="toggle-edit-mode" onClick={() => setEditMode(!editMode)}>
            <FA name="pencil" />
            <div>Edit</div>
          </button>
        }
      </Row>
      <Row fluid className="position-content--section position-content--details">
        <DefinitionList
          itemProps={{ excludeColon: true }}
          items={getBody()}
        />
      </Row>
      {(showMore && !editMode) &&
        <div>
          <Row fluid className="position-content--description">
            <span className="definition-title">Position Details</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxLength="4000"
                name="position-description"
                placeholder="No Description"
                defaultValue={sections.textarea}
                disabled={!editMode}
                className={!editMode ? 'disabled-input' : 'enabled-input'}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {/* eslint-disable-next-line react/prop-types */}
              {sections.textarea.length} / 4,000
            </div>
          </Row>
        </div>
      }
      {(showMore && editMode) &&
        <div>
          <div className="content-divider" />
          {form.inputBody}
          <div className="position-form--actions">
            <button onClick={showCancelModal}>Cancel</button>
            <button onClick={form.handleSubmit}>Save Position</button>
          </div>
        </div>
      }
      {!editMode &&
        <Row fluid className="position-content--section position-content--footer">
          <div className="position-content--metadata">
            {Object.entries(sections.metadata).map(([label, value]) => (
              <span key={`metadata-${label}`}>{`${label}: ${value}`}</span>
            ))}
          </div>
        </Row>
      }
      <div className="usa-grid-full toggle-more-container">
        <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
          <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
        </InteractiveElement>
      </div>
    </div>
  );
};

PositionExpandableContent.propTypes = {
  sections: PropTypes.shape({
    subheading: PropTypes.shape({}),
    bodyPrimary: PropTypes.shape({}),
    bodySecondary: PropTypes.shape({}),
    textarea: PropTypes.string,
    metadata: PropTypes.shape({}),
  }).isRequired,
  form: PropTypes.shape({
    staticBody: PropTypes.shape({}),
    inputBody: PropTypes.element,
    cancelText: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    handleEdit: PropTypes.shape({
      editMode: PropTypes.bool,
      setEditMode: PropTypes.func,
    }),
  }),
};

PositionExpandableContent.defaultProps = {
  form: undefined,
};

export default PositionExpandableContent;
