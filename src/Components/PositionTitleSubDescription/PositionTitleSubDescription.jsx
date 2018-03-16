import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';
import EditContentButton from '../EditContentButton';

const PositionTitleSubDescription = ({ title, formattedContent, plainContent, shouldShowEditor,
  onSubmitText, toggleEditor, isAllowedToEdit }) => (
    <div
      className="usa-width-one-whole position-details-header-body editable-position-field"
    >
      <div className="editable-position-field-title">{title}: </div>
      {
        !shouldShowEditor &&
          <div className="usa-grid-full">
            {formattedContent}
            {
              isAllowedToEdit &&
                <EditContentButton
                  onToggle={toggleEditor}
                />
            }
          </div>
      }
      {
        shouldShowEditor &&
        <TextEditor
          initialText={plainContent}
          onSubmitText={onSubmitText}
          cancel={toggleEditor}
        />
      }
    </div>
);

PositionTitleSubDescription.propTypes = {
  title: PropTypes.string.isRequired,
  formattedContent: PropTypes.node.isRequired,
  plainContent: PropTypes.string.isRequired,
  shouldShowEditor: PropTypes.bool.isRequired,
  onSubmitText: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  isAllowedToEdit: PropTypes.bool.isRequired,
};

export default PositionTitleSubDescription;
