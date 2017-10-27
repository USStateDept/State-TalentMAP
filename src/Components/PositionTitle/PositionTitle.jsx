import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import BidListButton from '../BidListButton';
import TextEditor from '../TextEditor';
import PositionTitleSubDescription from '../PositionTitleSubDescription';
import EditContentButton from '../EditContentButton';
import { POSITION_DETAILS, GO_BACK_TO_LINK, BID_LIST } from '../../Constants/PropTypes';
import { NO_POSITION_WEB_SITE, NO_POSITION_POC, NO_POSITION_DESCRIPTION } from '../../Constants/SystemMessages';
import { shortenString } from '../../utilities';

class PositionTitle extends Component {
  constructor(props) {
    super(props);
    this.toggleWebsiteEditor = this.toggleWebsiteEditor.bind(this);
    this.togglePocEditor = this.togglePocEditor.bind(this);
    this.toggleDescriptionEditor = this.toggleDescriptionEditor.bind(this);
    this.submitWebsiteEdit = this.submitWebsiteEdit.bind(this);
    this.submitPocEdit = this.submitPocEdit.bind(this);
    this.submitDescriptionEdit = this.submitDescriptionEdit.bind(this);
    this.state = {
      shouldShowWebsiteEditor: { value: false },
      shouldShowPocEditor: { value: false },
      shouldShowDescriptionEditor: { value: false },
      newWebsiteContent: { value: null },
      newPocContent: { value: null },
      newDescriptionContent: { value: null },
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

  toggleDescriptionEditor() {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowDescriptionEditor } = this.state;
    shouldShowDescriptionEditor.value = !shouldShowDescriptionEditor.value;
    this.setState({ shouldShowDescriptionEditor });
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

  submitDescriptionEdit(content) {
    const { newDescriptionContent } = this.state;
    newDescriptionContent.value = content;
    this.setState({ newDescriptionContent });
    this.props.editDescriptionContent(content);
    this.toggleDescriptionEditor();
  }

  render() {
    const { details, goBackLink, toggleBidPosition, bidList,
      bidListToggleIsLoading } = this.props;
    const { shouldShowWebsiteEditor, shouldShowPocEditor, shouldShowDescriptionEditor,
      newWebsiteContent, newPocContent, newDescriptionContent } = this.state;

    // For each editable section, we need to set three variables:
    // 1. To check if it exists (not null)
    // 2. A plain text version (not encapsulated in html) to pass to the TextEditor component
    // 3. A formatted version for public viewing

    const descriptionExists = details.description && details.description.content;
    const plainTextDescription = descriptionExists ? newDescriptionContent.value || details.description.content : '';
    const description = descriptionExists ?
      shortenString(plainTextDescription) :
      NO_POSITION_WEB_SITE;

    const postWebsiteExists = details.description && details.description.website;
    const plainTextPostWebsite = postWebsiteExists ? newWebsiteContent.value || details.description.website : '';
    const postWebsite = postWebsiteExists ?
      <a href={plainTextPostWebsite}>{plainTextPostWebsite}</a> :
    NO_POSITION_WEB_SITE;

    const pointOfContactExists = details.description && details.description.point_of_contact;
    const plainTextPointOfContact = pointOfContactExists ? newPocContent.value || details.description.point_of_contact : '';
    const pointOfContact = pointOfContactExists ?
      <a href={`tel:${plainTextPointOfContact}`}>{plainTextPointOfContact}</a> :
    NO_POSITION_POC;

    return (
      <div className="position-details-header-container">
        <div className="position-details-header">
          <div className="usa-grid positions-details-header-grid">
            <div className="usa-width-one-half">
              <div className="position-details-header-back">
                {
                goBackLink.text && // if goBackLink.text is defined, render...
                <div>
                  <FontAwesome name="arrow-left" />
                      &nbsp;
                  <a
                    className="back-link"
                    tabIndex="0"
                    role="link"
                    onClick={() => window.history.back()}
                  >
                    {goBackLink.text}
                  </a>
                </div>
              }
              </div>
              <div className="position-details-header-title">
                <strong>Position Number: {details.position_number}</strong>
              </div>
              <div className="position-details-header-body editable-position-field">
                <strong>Description: </strong>
                {
                  !shouldShowDescriptionEditor.value &&
                    <span className="usa-grid-full">
                      {
                        details.description && details.description.content ?
                          description :
                          NO_POSITION_DESCRIPTION
                      }
                      <EditContentButton
                        onToggle={this.toggleDescriptionEditor}
                      />
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
              <PositionTitleSubDescription
                title="Post website"
                formattedContent={postWebsite}
                plainContent={plainTextPostWebsite}
                shouldShowEditor={shouldShowWebsiteEditor.value}
                onSubmitText={this.submitWebsiteEdit}
                toggleEditor={this.toggleWebsiteEditor}
              />
              <PositionTitleSubDescription
                title="Point of Contact"
                formattedContent={pointOfContact}
                plainContent={plainTextPointOfContact}
                shouldShowEditor={shouldShowPocEditor.value}
                onSubmitText={this.submitPocEdit}
                toggleEditor={this.togglePocEditor}
              />
            </div>
          </div>
          <img
            className="position-details-header-image"
            alt="department of state seal"
            src="/assets/img/rsz_dos-seal-bw.png"
          />
        </div>
        <div className="offset-bid-button-container">
          <BidListButton
            toggleBidPosition={toggleBidPosition}
            compareArray={bidList.results}
            id={details.id}
            isLoading={bidListToggleIsLoading}
          />
        </div>
      </div>
    );
  }
}

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  goBackLink: GO_BACK_TO_LINK.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
  editWebsiteContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
};

PositionTitle.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
};

export default PositionTitle;
