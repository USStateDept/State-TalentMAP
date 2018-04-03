import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PositionTitleSubDescription from '../../PositionTitleSubDescription';
import { POSITION_DETAILS } from '../../../Constants/PropTypes';
import { NO_POSITION_WEB_SITE, NO_POSITION_POC } from '../../../Constants/SystemMessages';
import { propOrDefault, formatDate } from '../../../utilities';

class PositionDetailsContact extends Component {
  constructor(props) {
    super(props);
    this.toggleWebsiteEditor = this.toggleWebsiteEditor.bind(this);
    this.togglePocEditor = this.togglePocEditor.bind(this);
    this.submitWebsiteEdit = this.submitWebsiteEdit.bind(this);
    this.submitPocEdit = this.submitPocEdit.bind(this);
    this.state = {
      shouldShowWebsiteEditor: { value: false },
      shouldShowPocEditor: { value: false },
      newWebsiteContent: { value: null },
      newPocContent: { value: null },
    };
  }

  toggleWebsiteEditor() {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowWebsiteEditor } = this.state;
    shouldShowWebsiteEditor.value = !shouldShowWebsiteEditor.value;
    this.setState({ shouldShowWebsiteEditor });
  }

  togglePocEditor() {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowPocEditor } = this.state;
    shouldShowPocEditor.value = !shouldShowPocEditor.value;
    this.setState({ shouldShowPocEditor });
  }

  submitWebsiteEdit(content) {
    const { newWebsiteContent } = this.state;
    newWebsiteContent.value = content;
    this.setState({ newWebsiteContent });
    this.props.editWebsiteContent(content);
    this.toggleWebsiteEditor();
  }

  submitPocEdit(content) {
    const { newPocContent } = this.state;
    newPocContent.value = content;
    this.setState({ newPocContent });
    this.props.editPocContent(content);
    this.togglePocEditor();
  }

  render() {
    const { details } = this.props;
    const { shouldShowWebsiteEditor, shouldShowPocEditor,
      newWebsiteContent, newPocContent } = this.state;

    // For each editable section, we need to set three variables:
    // 1. To check if it exists (not null)
    // 2. A plain text version (not encapsulated in html) to pass to the TextEditor component
    // 3. A formatted version for public viewing
    const postWebsite = propOrDefault(details, 'description.website');
    const plainTextPostWebsite = postWebsite ? newWebsiteContent.value || postWebsite : '';
    const formattedPostWebsite = postWebsite ?
      <a href={plainTextPostWebsite}>{plainTextPostWebsite}</a> :
    NO_POSITION_WEB_SITE;

    const pointOfContact = propOrDefault(details, 'description.point_of_contact');
    const plainTextPointOfContact = pointOfContact ? newPocContent.value || pointOfContact : '';
    const formattedPointOfContact = pointOfContact ?
      <a href={`tel:${plainTextPointOfContact}`}>{plainTextPointOfContact}</a> :
    NO_POSITION_POC;

    const isAllowedToEdit = !!(propOrDefault(details, 'description.is_editable_by_user'));

    const formattedDate = formatDate(details.update_date);

    return (
      <div className="position-details-contact">
        <div className="contact-container">
          <div className="usa-grid-full contact-section website-section">
            <PositionTitleSubDescription
              title="Post website"
              formattedContent={formattedPostWebsite}
              plainContent={plainTextPostWebsite}
              shouldShowEditor={shouldShowWebsiteEditor.value}
              onSubmitText={this.submitWebsiteEdit}
              toggleEditor={this.toggleWebsiteEditor}
              isAllowedToEdit={isAllowedToEdit}
            />
          </div>
          <div className="usa-grid-full contact-section poc-section">
            <PositionTitleSubDescription
              title="Point-of-contact"
              formattedContent={formattedPointOfContact}
              plainContent={plainTextPointOfContact}
              shouldShowEditor={shouldShowPocEditor.value}
              onSubmitText={this.submitPocEdit}
              toggleEditor={this.togglePocEditor}
              isAllowedToEdit={isAllowedToEdit}
            />
          </div>
        </div>
        <div className="contact-container">
          Updated date: {formattedDate}
        </div>
      </div>
    );
  }
}

PositionDetailsContact.propTypes = {
  details: POSITION_DETAILS,
  editWebsiteContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
};

PositionDetailsContact.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
};

export default PositionDetailsContact;
