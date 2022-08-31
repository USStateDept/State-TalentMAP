import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, getBidStatisticsObject, propOrDefault } from 'utilities';
import { checkFlag } from 'flags';
import BidCount from 'Components/BidCount';
import PositionViews from 'Components/PositionViews';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import PositionTitleSubDescription from '../../PositionTitleSubDescription';
import ViewPostDataButton from '../../ViewPostDataButton';
import { POSITION_DETAILS } from '../../../Constants/PropTypes';
import { COMING_SOON } from '../../../Constants/SystemMessages';

class PositionDetailsContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowWebsiteEditor: { value: false },
      shouldShowPocEditor: { value: false },
      newWebsiteContent: { value: null },
      newPocContent: { value: null },
    };
  }

  // For each editable section, we need to set three variables:
  // 1. To check if it exists (not null)
  // 2. A plain text version (not encapsulated in html) to pass to the TextEditor component
  // 3. A formatted version for public viewing

  get postWebsite() {
    const { details } = this.props;
    const { newWebsiteContent } = this.state;
    const postWebsite = propOrDefault(details, 'description.website');
    const plainTextPostWebsite = postWebsite ? newWebsiteContent.value || postWebsite : newWebsiteContent.value || '';
    const formattedPostWebsite = postWebsite || newWebsiteContent.value ?
      <a href={plainTextPostWebsite}>{plainTextPostWebsite}</a> :
      COMING_SOON;

    return { plainTextPostWebsite, formattedPostWebsite };
  }

  get pointOfContact() {
    const { details } = this.props;
    const { newPocContent } = this.state;
    const pointOfContact = propOrDefault(details, 'description.point_of_contact');
    const plainTextPointOfContact = pointOfContact ? newPocContent.value || pointOfContact : newPocContent.value || '';
    const formattedPointOfContact = pointOfContact || newPocContent.value ?
      plainTextPointOfContact : COMING_SOON;
    return { plainTextPointOfContact, formattedPointOfContact };
  }

  toggleWebsiteEditor = () => {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowWebsiteEditor } = this.state;
    shouldShowWebsiteEditor.value = !shouldShowWebsiteEditor.value;
    this.setState({ shouldShowWebsiteEditor });
  };

  togglePocEditor = () => {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowPocEditor } = this.state;
    shouldShowPocEditor.value = !shouldShowPocEditor.value;
    this.setState({ shouldShowPocEditor });
  };

  submitWebsiteEdit = content => {
    const { newWebsiteContent } = this.state;
    newWebsiteContent.value = content;
    this.setState({ newWebsiteContent });
    this.props.editWebsiteContent(content);
    this.toggleWebsiteEditor();
  };

  submitPocEdit = content => {
    const { newPocContent } = this.state;
    newPocContent.value = content;
    this.setState({ newPocContent });
    this.props.editPocContent(content);
    this.togglePocEditor();
  };

  renderBidCount = () => {
    const { details } = this.props;
    const stats = getBidStatisticsObject(details.bidStatistics);
    return (
      <BidCount bidStatistics={stats} hideLabel altStyle isCondensed />
    );
  };

  render() {
    const { details, isProjectedVacancy } = this.props;
    const { shouldShowWebsiteEditor, shouldShowPocEditor } = this.state;

    const { plainTextPostWebsite, formattedPostWebsite } = this.postWebsite;
    const { plainTextPointOfContact, formattedPointOfContact } = this.pointOfContact;

    const isAllowedToEdit = !!(propOrDefault(details, 'description.is_editable_by_user'));

    const formattedDate = formatDate(details.description.date_updated);

    const OBCUrl = propOrDefault(details, 'post.post_overview_url');

    const hidePositionDetails = () => checkFlag('flags.static_content');

    return (
      <div className="position-details-contact" style={{ position: 'relative' }}>
        <div className="contact-container">
          <PermissionsWrapper permissions="superuser">
            <div className="usa-grid-full contact-section website-section">
              <PositionTitleSubDescription
                title="Position views"
                formattedContent={<PositionViews />}
                isAllowedToEdit={isAllowedToEdit}
              />
            </div>
          </PermissionsWrapper>
          {
            !hidePositionDetails() &&
              <>
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
              </>
          }
          {
            !isProjectedVacancy &&
              this.renderBidCount()
          }
        </div>
        <div className={`contact-container ${isProjectedVacancy ? '' : 'has-bid-count'} ${!OBCUrl ? 'no-button' : ''}`}>
          <strong>Capsule Last Updated</strong>: {formattedDate}
        </div>
        <div className="offset-bid-button-container">
          <div className="offset-bid-button-container-button">
            { !!OBCUrl && <ViewPostDataButton url={OBCUrl} altStyle /> }
          </div>
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
  isProjectedVacancy: PropTypes.bool,
};

PositionDetailsContact.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
  isProjectedVacancy: false,
};

export default PositionDetailsContact;
