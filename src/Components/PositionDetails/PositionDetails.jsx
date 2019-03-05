import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from '../Layout';
import Spinner from '../Spinner/Spinner';
import PositionTitle from '../PositionTitle/PositionTitle';
import PositionDetailsItem from '../PositionDetailsItem/PositionDetailsItem';
import PositionSimilarPositions from '../../Containers/PositionSimilarPositions';
import GoBackLink from '../BackButton';

import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  BID_LIST,
  GO_BACK_TO_LINK,
  POSITION_DETAILS,
  USER_PROFILE,
  HIGHLIGHT_POSITION,
  EMPTY_FUNCTION,
} from '../../Constants/PropTypes';

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.editDescriptionContent = this.editDescriptionContent.bind(this);
    this.state = {
      newDescriptionContent: { value: null },
    };
  }

  // The additional details section should match after edits are made,
  // so we set the content to a value in local state when ever any edits are made.
  editDescriptionContent(content) {
    this.props.editDescriptionContent(content);
    const { newDescriptionContent } = this.state;
    newDescriptionContent.value = content;
    this.setState({ newDescriptionContent });
  }

  render() {
    const {
      details,
      isLoading,
      hasErrored,
      goBackLink,
      userProfile,
      bidList,
      editPocContent,
      editWebsiteContent,
      resetDescriptionEditMessages,
      highlightPosition,
      onHighlight,
    } = this.props;

    const isReady = details.id && userProfile.id && !isLoading && !hasErrored;

    return (
      <div className="content-container position-details-container">
        <Row className="position-details-description-container positions-details-about-position back-container padded-main-content" fluid>
          <GoBackLink />
        </Row>
        { isReady &&
        <div>
          <PositionTitle
            details={details}
            goBackLink={goBackLink}
            bidList={bidList}
            editDescriptionContent={this.editDescriptionContent}
            editPocContent={editPocContent}
            editWebsiteContent={editWebsiteContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
            userProfile={userProfile}
          />
          <PositionDetailsItem
            details={details}
            editDescriptionContent={this.editDescriptionContent}
            editPocContent={editPocContent}
            editWebsiteContent={editWebsiteContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
            userProfile={userProfile}
            highlightPosition={highlightPosition}
            onHighlight={onHighlight}
          />
          <hr />
          <Row className="position-details-description-container padded-main-content" fluid>
            <PositionSimilarPositions id={details.id} />
          </Row>
        </div>}
        {!isReady && <Spinner type="position-details" size="big" />}
      </div>
    );
  }
}

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  goBackLink: GO_BACK_TO_LINK.isRequired,
  userProfile: USER_PROFILE,
  bidList: BID_LIST.isRequired,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  highlightPosition: HIGHLIGHT_POSITION,
  onHighlight: PropTypes.func.isRequired,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
  userProfile: {},
  bidListToggleIsLoading: false,
  descriptionEditHasErrored: false,
  descriptionEditSuccess: false,
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
};

export default PositionDetails;
