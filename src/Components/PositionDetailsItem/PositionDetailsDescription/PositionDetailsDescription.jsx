import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewMoreLink from './ViewMoreLink';
import TextEditor from '../../TextEditor';
import EditContentButton from '../../EditContentButton';
import { POSITION_DETAILS } from '../../../Constants/PropTypes';
import { NO_POSITION_DESCRIPTION } from '../../../Constants/SystemMessages';
import { shortenString, propOrDefault } from '../../../utilities';

class PositionDetailsDescription extends Component {
  constructor(props) {
    super(props);
    this.toggleDescriptionEditor = this.toggleDescriptionEditor.bind(this);
    this.submitDescriptionEdit = this.submitDescriptionEdit.bind(this);
    this.onDescriptionLengthToggle = this.onDescriptionLengthToggle.bind(this);
    this.state = {
      shouldShowDescriptionEditor: { value: false },
      newDescriptionContent: { value: null },
      shouldDisplayFullDescription: true,
    };
  }

  onDescriptionLengthToggle(value) {
    this.setState({ shouldDisplayFullDescription: !value });
  }

  toggleDescriptionEditor() {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowDescriptionEditor } = this.state;
    shouldShowDescriptionEditor.value = !shouldShowDescriptionEditor.value;
    this.setState({ shouldShowDescriptionEditor });
  }

  submitDescriptionEdit(content) {
    const { newDescriptionContent } = this.state;
    newDescriptionContent.value = content;
    this.setState({ newDescriptionContent });
    this.props.editDescriptionContent(content);
    this.toggleDescriptionEditor();
  }

  render() {
    const { details } = this.props;
    const { shouldShowDescriptionEditor, newDescriptionContent,
      shouldDisplayFullDescription } = this.state;

    // We need to set three variables:
    // 1. To check if it exists (not null)
    // 2. A plain text version (not encapsulated in html) to pass to the TextEditor component
    // 3. A formatted version for public viewing

    const description = propOrDefault(details, 'description.content');
    const plainTextDescription = description ? newDescriptionContent.value || description : newDescriptionContent.value || '';
    let formattedDescription = description || newDescriptionContent.value ?
      shortenString(plainTextDescription) :
      NO_POSITION_DESCRIPTION;
    if (description && shouldDisplayFullDescription) {
      formattedDescription = plainTextDescription;
    }

    // Determine if the ViewMoreLink needs to be rendered based on description length.
    // Example: if shortened string is same length as original, there is no need to display
    // the "View More" link.
    let hideViewMoreLink = false;
    if ((shortenString(plainTextDescription).length || 0) >=
    (plainTextDescription ? plainTextDescription.length : 0)) {
      hideViewMoreLink = true;
    }

    const isAllowedToEdit = !!(propOrDefault(details, 'description.is_editable_by_user'));
    return (
      <div className="position-details-header-body editable-position-field">
        {
          !shouldShowDescriptionEditor.value &&
            <span className="usa-grid-full">
              {formattedDescription}
              {
                isAllowedToEdit &&
                  <EditContentButton
                    onToggle={this.toggleDescriptionEditor}
                  />
              }
              {
                !hideViewMoreLink &&
                <ViewMoreLink
                  defaultValue={!shouldDisplayFullDescription}
                  onChange={this.onDescriptionLengthToggle}
                />
              }
            </span>
        }
        {
          shouldShowDescriptionEditor.value &&
          <TextEditor
            initialText={plainTextDescription}
            onSubmitText={this.submitDescriptionEdit}
            cancel={this.toggleDescriptionEditor}
          />
        }
      </div>
    );
  }
}

PositionDetailsDescription.propTypes = {
  details: POSITION_DETAILS,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
};

PositionDetailsDescription.defaultProps = {
  details: null,
};

export default PositionDetailsDescription;
