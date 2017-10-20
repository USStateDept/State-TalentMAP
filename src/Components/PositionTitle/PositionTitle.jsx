import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import BidListButton from '../BidListButton';
import TextEditor from '../TextEditor';
import { POSITION_DETAILS, GO_BACK_TO_LINK, BID_LIST } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import { shortenString } from '../../utilities';

class PositionTitle extends Component {
  constructor(props) {
    super(props);
    this.toggleWebsiteEditor = this.toggleWebsiteEditor.bind(this);
    this.togglePocEditor = this.togglePocEditor.bind(this);
    this.submitWebsiteEdit = this.submitWebsiteEdit.bind(this);
    this.submitPocEdit = this.submitPocEdit.bind(this);
    // this.submitDescriptionEdit = this.submitDescriptionEdit.bind(this);
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
    const { details, goBackLink, toggleBidPosition, bidList,
      bidListToggleIsLoading } = this.props;
    const { shouldShowWebsiteEditor, shouldShowPocEditor, newWebsiteContent, newPocContent } = this.state; // eslint-disable-line
    const postWebsiteExists = details.description && details.description.website;
    const plainTextPostWebsite = postWebsiteExists ? newWebsiteContent.value || details.description.website : '';
    const postWebsite = postWebsiteExists ?
      <a href={plainTextPostWebsite}>{plainTextPostWebsite}</a> :
    SystemMessages.NO_POSITION_WEB_SITE;
    const pointOfContactExists = details.description && details.description.point_of_contact;
    const plainTextPointOfContact = pointOfContactExists ? newPocContent.value || details.description.point_of_contact : '';
    const pointOfContact = pointOfContactExists ?
      <a href={`tel:${plainTextPointOfContact}`}>{plainTextPointOfContact}</a> :
    SystemMessages.NO_POSITION_POC;
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
              <p className="position-details-header-body">
                <strong>Description: </strong>
                {
              details.description && details.description.content ?
                shortenString(details.description.content) :
                SystemMessages.NO_POSITION_DESCRIPTION
              }
              </p>
              <div
                className="usa-width-one-half position-details-header-body editable-position-field"
              >
                <strong>Post website: </strong>
                {
                  !shouldShowWebsiteEditor.value &&
                    <div className="usa-grid-full">
                      {postWebsite}
                      <FontAwesome
                        onClick={this.toggleWebsiteEditor}
                        name="pencil"
                      />
                    </div>
                }
                {
                  shouldShowWebsiteEditor.value &&
                  <TextEditor
                    initialText={plainTextPostWebsite}
                    onSubmitText={this.submitWebsiteEdit}
                    cancel={this.toggleWebsiteEditor}
                  />
                }
              </div>
              <div
                className="usa-width-one-half position-details-header-body editable-position-field"
              >
                <strong>Point of Contact: </strong>
                {
                  !shouldShowPocEditor.value &&
                    <div className="usa-grid-full">
                      {pointOfContact}
                      <FontAwesome
                        onClick={this.togglePocEditor}
                        name="pencil"
                      />
                    </div>
                }
                {
                  shouldShowPocEditor.value &&
                  <TextEditor
                    initialText={plainTextPointOfContact}
                    onSubmitText={this.submitPocEdit}
                    cancel={this.togglePocEditor}
                  />
                }
              </div>
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
  resetDescriptionEditMessages: PropTypes.func.isRequired,
};

PositionTitle.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
};

export default PositionTitle;
