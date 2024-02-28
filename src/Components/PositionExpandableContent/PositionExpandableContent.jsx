import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Definition } from '../DefinitionList';

const PositionExpandableContent = ({
  sections, form, appendAdditionalFieldsToBodyPrimary, tempHideEdit,
  showLoadingAnimation, onShowMore, isCondensed, isEL }) => {
  const handleEdit = form?.handleEdit ?? {};
  const { editMode, setEditMode, disableEdit } = handleEdit;

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
    if (setEditMode) setEditMode(false);
    swal.close();
  };

  const getBody = () => {
    if (!setEditMode) return [];
    if (editMode && form && form.staticBody) return form.staticBody;
    if (editMode && form && !form.staticBody) return [];
    if (showMore && sections.bodySecondary) {
      return [...sections.bodyPrimary, ...sections.bodySecondary];
    }
    const minScreenWidth = 1650;
    // Append additional fields to collapsed view to fill blank space on wider screens
    if (appendAdditionalFieldsToBodyPrimary
      && (minScreenWidth < windowWidth) && sections.bodySecondary) {
      const appendSecondary = [];
      const numFields = Math.floor((windowWidth - minScreenWidth) / 190);
      sections.bodySecondary.slice(0, numFields).forEach(o => {
        appendSecondary.push(o);
      });
      return [...sections.bodyPrimary, ...appendSecondary];
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

  useEffect(() => {
    onShowMore(showMore);
  }, [showMore]);

  return (
    <div className="position-content">
      {
        showLoadingAnimation ?
          <div className="loading-animation--5">
            <div className="loading-message pbl-20">
              Loading additional data
            </div>
          </div>
          :
          <>
            <Row fluid className="position-content--section position-content--subheader">
              <div className="line-separated-fields">
                {sections?.subheading &&
                  sections.subheading.map(item => {
                    const key = Object.keys(item)[0];
                    return (
                      <div key={`subheading-${key}`}>
                        <span>{key}:</span>
                        <span>{item[key]}</span>
                      </div>
                    );
                  })
                }
              </div>
              {(form && !editMode && !tempHideEdit) &&
              <button
                className={`toggle-edit-mode ${disableEdit ? 'toggle-edit-mode-disabled' : ''}`}
                onClick={disableEdit ? () => {} : () => setEditMode(!editMode)}
                disabled={isEL}
              >
                <FA name="pencil" />
                <div>Edit</div>
              </button>
              }
            </Row>
            <Row fluid className={`position-content--section position-content--details ${isCondensed ? 'condensed' : ''}`}>
              <dl className="definitions">
                {getBody().map(item => {
                  const key = Object.keys(item)[0];
                  return (
                    <Definition
                      key={shortid.generate()}
                      term={key}
                      definition={item[key]}
                      excludeColon
                    />
                  );
                })}
              </dl>
            </Row>
            {(showMore && !editMode && sections?.textarea) &&
            <div>
              <Row fluid className="position-content--description">
                <span className="definition-title">Position Details</span>
                <Linkify properties={{ target: '_blank' }}>
                  <TextareaAutosize
                    maxRows={6}
                    minRows={6}
                    maxLength="2000"
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
                  {sections.textarea.length} / 2,000
                </div>
              </Row>
            </div>
            }
            {(showMore && editMode) &&
            <div>
              {setEditMode && <div className="content-divider" />}
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
                {sections.metadata && sections.metadata.map(item => {
                  const key = Object.keys(item)[0];
                  return (
                    <span key={`metadata-${key}`}>{`${key}: ${item[key]}`}</span>
                  );
                })}
              </div>
            </Row>
            }
            {sections.bodySecondary &&
            <div className="usa-grid-full toggle-more-container">
              <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
                <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
              </InteractiveElement>
            </div>
            }
          </>}
    </div>
  );
};

PositionExpandableContent.propTypes = {
  sections: PropTypes.shape({
    subheading: PropTypes.arrayOf(PropTypes.shape({})),
    bodyPrimary: PropTypes.arrayOf(PropTypes.shape({})),
    bodySecondary: PropTypes.arrayOf(PropTypes.shape({})),
    textarea: PropTypes.string,
    metadata: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  form: PropTypes.shape({
    staticBody: PropTypes.arrayOf(PropTypes.shape({})),
    inputBody: PropTypes.element,
    cancelText: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    handleEdit: PropTypes.shape({
      editMode: PropTypes.bool,
      setEditMode: PropTypes.func,
      disableEdit: PropTypes.bool,
    }),
  }),
  appendAdditionalFieldsToBodyPrimary: PropTypes.bool,
  showLoadingAnimation: PropTypes.bool,
  tempHideEdit: PropTypes.bool,
  onShowMore: PropTypes.func,
  isCondensed: PropTypes.bool,
  isEL: PropTypes.bool,
};

PositionExpandableContent.defaultProps = {
  form: undefined,
  sections: undefined,
  appendAdditionalFieldsToBodyPrimary: true,
  showLoadingAnimation: false,
  tempHideEdit: false,
  onShowMore: EMPTY_FUNCTION,
  isCondensed: false,
  isEL: false,
};

export default PositionExpandableContent;
