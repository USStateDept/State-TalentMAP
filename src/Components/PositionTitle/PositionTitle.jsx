import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import BidListButton from '../BidListButton';
import TextEditor from '../TextEditor';
import PositionTitleSubDescription from '../PositionTitleSubDescription';
import EditContentButton from '../EditContentButton';
import BidCount from '../BidCount';
import { POSITION_DETAILS, GO_BACK_TO_LINK, BID_LIST } from '../../Constants/PropTypes';
import { NO_POSITION_WEB_SITE, NO_POSITION_POC, NO_POSITION_DESCRIPTION } from '../../Constants/SystemMessages';
import { getAssetPath, shortenString, propOrDefault } from '../../utilities';

const seal = getAssetPath('/assets/img/rsz_dos-seal-bw.png');

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

    const description = propOrDefault(details, 'description.content');
    const plainTextDescription = description ? newDescriptionContent.value || description : '';
    const formattedDescription = description ?
      shortenString(plainTextDescription) :
      NO_POSITION_DESCRIPTION;

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

    const bidStatistics = Array.isArray(details.bid_statistics) ? details.bid_statistics[0] : null;

    const shouldShowBidStats = !!details.bid_statistics && !!bidStatistics;

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
                      {formattedDescription}
                      {
                        isAllowedToEdit &&
                          <EditContentButton
                            onToggle={this.toggleDescriptionEditor}
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
              <PositionTitleSubDescription
                title="Post website"
                formattedContent={formattedPostWebsite}
                plainContent={plainTextPostWebsite}
                shouldShowEditor={shouldShowWebsiteEditor.value}
                onSubmitText={this.submitWebsiteEdit}
                toggleEditor={this.toggleWebsiteEditor}
                isAllowedToEdit={isAllowedToEdit}
              />
              <PositionTitleSubDescription
                title="Point of Contact"
                formattedContent={formattedPointOfContact}
                plainContent={plainTextPointOfContact}
                shouldShowEditor={shouldShowPocEditor.value}
                onSubmitText={this.submitPocEdit}
                toggleEditor={this.togglePocEditor}
                isAllowedToEdit={isAllowedToEdit}
              />
            </div>
          </div>
          <img
            className="position-details-header-image"
            alt="department of state seal"
            src={seal}
          />
        </div>
        <div className="offset-bid-button-container">
          <div className="offset-bid-button-container-count">
            {
              shouldShowBidStats &&
                <BidCount
                  totalBids={bidStatistics.total_bids}
                  inGradeBids={bidStatistics.in_grade}
                  atSkillBids={bidStatistics.at_skill}
                  inGradeAtSkillBids={bidStatistics.in_grade_at_skill}
                />
            }
          </div>
          <div className="offset-bid-button-container-button">
            <BidListButton
              toggleBidPosition={toggleBidPosition}
              compareArray={bidList.results}
              id={details.id}
              isLoading={bidListToggleIsLoading}
            />
          </div>
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
