import { Component } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import ViewMoreLink from './ViewMoreLink';
import TextEditor from '../../TextEditor';
import EditContentButton from '../../EditContentButton';
import { POSITION_DETAILS } from '../../../Constants/PropTypes';
import { NO_POSITION_DESCRIPTION } from '../../../Constants/SystemMessages';
import { propOrDefault, shortenString } from '../../../utilities';

class PositionDetailsDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowDescriptionEditor: { value: false },
      newDescriptionContent: { value: null },
      shouldDisplayFullDescription: true,
    };
  }

  onDescriptionLengthToggle = value => {
    this.setState({ shouldDisplayFullDescription: !value });
  };

  // We need to set three variables:
  // 1. To check if it exists (not null)
  // 2. A plain text version (not encapsulated in html) to pass to the TextEditor component
  // 3. A formatted version for public viewing
  get description() {
    const { details } = this.props;
    const { newDescriptionContent, shouldDisplayFullDescription } = this.state;
    const description = propOrDefault(details, 'description.content');
    const plainTextDescription = newDescriptionContent.value || description || '';
    let formattedDescription = description || newDescriptionContent.value ?
      shortenString(plainTextDescription) :
      NO_POSITION_DESCRIPTION;
    if (description && shouldDisplayFullDescription) {
      formattedDescription = plainTextDescription;
    }
    return { plainTextDescription, formattedDescription };
  }

  toggleDescriptionEditor = () => {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowDescriptionEditor } = this.state;
    shouldShowDescriptionEditor.value = !shouldShowDescriptionEditor.value;
    this.setState({ shouldShowDescriptionEditor });
  };

  submitDescriptionEdit = content => {
    const { newDescriptionContent } = this.state;
    newDescriptionContent.value = content;
    this.setState({ newDescriptionContent });
    this.props.editDescriptionContent(content);
    this.toggleDescriptionEditor();
  };

  render() {
    const { details, updatedDate } = this.props;
    const { shouldShowDescriptionEditor, shouldDisplayFullDescription } = this.state;

    const { plainTextDescription, formattedDescription } = this.description;
    // Determine if the ViewMoreLink needs to be rendered based on description length.
    // Example: if shortened string is same length as original, there is no need to display
    // the "View More" link.
    const hideViewMoreLink = (shortenString(plainTextDescription).length || 0) >=
      (plainTextDescription ? plainTextDescription.length : 0);

    const isAllowedToEdit = !!(propOrDefault(details, 'description.is_editable_by_user'));
    return (
      <div className="position-details-header-body editable-position-field">
        {
          !shouldShowDescriptionEditor.value &&
            <span className="usa-grid-full">
              <Linkify properties={{ target: '_blank' }}>
                {formattedDescription}
              </Linkify>
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
        {
          !!updatedDate &&
          <div className="capsule-updated-date">
            <strong>Last Updated</strong>: {updatedDate}
          </div>
        }
      </div>
    );
  }
}

PositionDetailsDescription.propTypes = {
  details: POSITION_DETAILS,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  updatedDate: PropTypes.string,
};

PositionDetailsDescription.defaultProps = {
  details: null,
  updatedDate: '',
};

export default PositionDetailsDescription;
