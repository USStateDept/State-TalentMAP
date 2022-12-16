import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Row } from '../Layout';
import Spinner from '../Spinner/Spinner';
import PositionTitle from '../PositionTitle/PositionTitle';
import PositionDetailsItem from '../PositionDetailsItem/PositionDetailsItem';
import PositionSimilarPositions from '../../Containers/PositionSimilarPositions';
import GoBackLink from '../BackButton';

import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  BID_LIST,
  EMPTY_FUNCTION,
  HIGHLIGHT_POSITION,
  POSITION_DETAILS,
  USER_PROFILE,
} from '../../Constants/PropTypes';

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDescriptionContent: { value: null },
    };
  }

  getChildContext() {
    return { isClient: this.props.isClient };
  }

  // The additional details section should match after edits are made,
  // so we set the content to a value in local state when ever any edits are made.
  editDescriptionContent = content => {
    this.props.editDescriptionContent(content);
    const { newDescriptionContent } = this.state;
    newDescriptionContent.value = content;
    this.setState({ newDescriptionContent });
  };

  render() {
    const {
      details,
      isLoading,
      hasErrored,
      userProfile,
      bidList,
      editPocContent,
      editWebsiteContent,
      resetDescriptionEditMessages,
      highlightPosition,
      onHighlight,
      userProfileIsLoading,
      isProjectedVacancy,
    } = this.props;

    const isReady = details.id && userProfile.id && !isLoading && !hasErrored;

    const isLoading$ = isLoading || userProfileIsLoading;

    const isError = hasErrored && !isLoading && !userProfileIsLoading;

    const { position } = details;

    return (
      <div className="content-container position-details-container">
        <Row className="position-details-description-container positions-details-about-position back-container padded-main-content" fluid>
          <GoBackLink />
        </Row>
        { isReady &&
        <div>
          <PositionTitle
            details={{
              ...position,
              cpId: details.id,
              status: details.status_code,
              availability: get(details, 'availability', {}),
              bidStatistics: get(details, 'bid_statistics', [{}]),
            }}
            bidList={bidList}
            editDescriptionContent={this.editDescriptionContent}
            editPocContent={editPocContent}
            editWebsiteContent={editWebsiteContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
            userProfile={userProfile}
            isProjectedVacancy={isProjectedVacancy}
          />
          wefoinwiowenf
          <PositionDetailsItem
            details={details}
            editDescriptionContent={this.editDescriptionContent}
            editPocContent={editPocContent}
            editWebsiteContent={editWebsiteContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
            userProfile={userProfile}
            highlightPosition={highlightPosition}
            onHighlight={onHighlight}
            isProjectedVacancy={isProjectedVacancy}
          />
          <hr />
          <Row className="position-details-description-container padded-main-content" fluid>
            { !isProjectedVacancy && <PositionSimilarPositions id={details.id} /> }
          </Row>
        </div>}
        {isLoading$ && <Spinner type="position-details" size="big" />}
        {isError &&
          <div className="usa-grid-full position-error">
            <h2>There was an error loading this position</h2>
            <p><Link to="/results">Return to search</Link> and select filters to look for a similar position.</p>
          </div>
        }
      </div>
    );
  }
}

PositionDetails.childContextTypes = {
  isClient: PropTypes.bool,
};

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  userProfile: USER_PROFILE,
  userProfileIsLoading: PropTypes.bool,
  bidList: BID_LIST.isRequired,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  highlightPosition: HIGHLIGHT_POSITION,
  onHighlight: PropTypes.func.isRequired,
  isProjectedVacancy: PropTypes.bool,
  isClient: PropTypes.bool,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
  userProfile: {},
  userProfileIsLoading: false,
  bidListToggleIsLoading: false,
  descriptionEditHasErrored: false,
  descriptionEditSuccess: false,
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
  isProjectedVacancy: false,
  isClient: false,
};

export default PositionDetails;
