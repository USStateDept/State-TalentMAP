import React from 'react';
import PropTypes from 'prop-types';
import LanguageList from '../../Components/LanguageList/LanguageList';
import CondensedCardDataPoint from '../CondensedCardData/CondensedCardDataPoint';
import OBCUrl from '../OBCUrl';
import HowToBid from './HowToBid';
import PositionDetailsDescription from './PositionDetailsDescription';
import PositionDetailsContact from './PositionDetailsContact';
import ServiceNeededToggle from './ServiceNeededToggle';
import {
  formatDate,
  propOrDefault,
  getAccessiblePositionNumber,
  getDifferentialPercentage,
} from '../../utilities';

import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  POSITION_DETAILS,
  USER_PROFILE,
  HIGHLIGHT_POSITION,
  EMPTY_FUNCTION,
} from '../../Constants/PropTypes';
import {
  NO_BUREAU,
  NO_GRADE,
  NO_SKILL,
  NO_END_DATE,
  NO_TOUR_OF_DUTY,
  NO_POST_DIFFERENTIAL,
  NO_DANGER_PAY,
  NO_USER_LISTED,
} from '../../Constants/SystemMessages';

const PositionDetailsItem = (props) => {
  const {
    details,
    editDescriptionContent,
    resetDescriptionEditMessages,
    editPocContent,
    editWebsiteContent,
    userProfile,
    highlightPosition,
    onHighlight,
  } = props;

  const isHighlightLoading = highlightPosition.loading;
  const tourEndDate = propOrDefault(details, 'current_assignment.estimated_end_date');
  const formattedTourEndDate = tourEndDate ? formatDate(tourEndDate) : NO_END_DATE;

  const formattedBureau = details.bureau || NO_BUREAU;
  const formattedTOD = propOrDefault(details, 'post.tour_of_duty') || NO_TOUR_OF_DUTY;

  const postDifferential = getDifferentialPercentage(propOrDefault(details, 'post.differential_rate'), NO_POST_DIFFERENTIAL);
  const dangerPay = getDifferentialPercentage(propOrDefault(details, 'post.danger_pay'), NO_DANGER_PAY);

  const OBCId = propOrDefault(details, 'post.obc_id');
  const getFormattedObcData = (prefix) => {
    if (OBCId) {
      return (<span> {prefix} | <OBCUrl id={OBCId} type="post-data" label="View OBC Data" /></span>);
    }

    return prefix;
  };

  const incumbent = propOrDefault(details, 'current_assignment.user', NO_USER_LISTED);
  return (
    <div className="usa-grid-full padded-main-content">
      <div className="usa-grid-full position-details-description-container positions-details-about-position">
        <div className="usa-width-two-thirds about-section-left">
          <h2>About the Position</h2>
          <PositionDetailsDescription
            details={details}
            editDescriptionContent={editDescriptionContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
          />
          <div className="usa-grid-full data-point-section">
            <CondensedCardDataPoint ariaLabel={getAccessiblePositionNumber(details.position_number)} title="Position number" content={details.position_number} />
            <CondensedCardDataPoint title="Skill code" content={details.skill || NO_SKILL} />
            <CondensedCardDataPoint title="Grade" content={details.grade || NO_GRADE} />
            <CondensedCardDataPoint title="Bureau" content={formattedBureau} />
            <CondensedCardDataPoint title="Tour of duty" content={formattedTOD} />
            <CondensedCardDataPoint title="Language" content={<LanguageList languages={details.languages} propToUse="representation" />} />
            <CondensedCardDataPoint title="Post differential" content={getFormattedObcData(postDifferential)} />
            <CondensedCardDataPoint title="Danger pay" content={getFormattedObcData(dangerPay)} />
            <CondensedCardDataPoint title="TED" content={formattedTourEndDate} />
            <CondensedCardDataPoint title="Incumbent" content={incumbent} />
          </div>
        </div>
        <div className="usa-width-one-third position-details-contact-container">
          <PositionDetailsContact
            details={details}
            editWebsiteContent={editWebsiteContent}
            editPocContent={editPocContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
          />
          <ServiceNeededToggle
            userProfile={userProfile}
            position={details}
            loading={isHighlightLoading}
            onChange={onHighlight}
          />
          <HowToBid />
        </div>
      </div>
    </div>
  );
};

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
  editDescriptionContent: PropTypes.func.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  highlightPosition: HIGHLIGHT_POSITION,
  onHighlight: PropTypes.func.isRequired,
};

PositionDetailsItem.defaultProps = {
  details: null,
  userProfile: {},
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
};

export default PositionDetailsItem;
