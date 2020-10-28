import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
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
  formattedContent: PropTypes.node,
  plainContent: PropTypes.string,
  shouldShowEditor: PropTypes.bool,
  onSubmitText: PropTypes.func,
  toggleEditor: PropTypes.func,
  isAllowedToEdit: PropTypes.bool,
};

PositionTitleSubDescription.defaultProps = {
  formattedContent: '',
  plainContent: '',
  shouldShowEditor: false,
  onSubmitText: EMPTY_FUNCTION,
  toggleEditor: EMPTY_FUNCTION,
  isAllowedToEdit: false,
};

export default PositionTitleSubDescription;
