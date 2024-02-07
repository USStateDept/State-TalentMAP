import PropTypes from 'prop-types';
import { get } from 'lodash';
import Differentials from 'Components/Differentials';
import BidCount from 'Components/BidCount';
import PositionSkillCodeList from 'Components/PositionSkillCodeList';
import { checkFlag } from 'flags';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import LanguageList from '../../Components/LanguageList/LanguageList';
import CondensedCardDataPoint from '../CondensedCardData/CondensedCardDataPoint';
import PositionDetailsDescription from './PositionDetailsDescription';
import PositionDetailsContact from './PositionDetailsContact';
import ServiceNeededToggle from './ServiceNeededToggle';
import GlossaryTermTrigger from '../GlossaryTermTrigger';
import { Handshake, HistDiffToStaff, IsHardToFill, ServiceNeedDifferential } from '../Ribbon';
import {
  formatDate,
  getAccessiblePositionNumber,
  getBidStatisticsObject,
  propOrDefault,
} from '../../utilities';

import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  EMPTY_FUNCTION,
  HIGHLIGHT_POSITION,
  POSITION_DETAILS,
  USER_PROFILE,
} from '../../Constants/PropTypes';
import {
  NO_BUREAU,
  NO_END_DATE,
  NO_GRADE,
  NO_TOUR_OF_DUTY,
  NO_UPDATE_DATE,
  NO_USER_LISTED,
} from '../../Constants/SystemMessages';

export const renderHandshake = (stats, ribbonClass) => (
  get(stats, 'has_handshake_offered', false) && <Handshake cutSide="both" className={ribbonClass} />
);

export const renderHistDiffToStaff = (details, ribbonClass) => (
  get(details, 'isDifficultToStaff', false) && <HistDiffToStaff cutSide="both" className={ribbonClass} />
);

export const renderServiceNeedDifferential = (details, ribbonClass) => (
  get(details, 'isServiceNeedDifferential', false) && <ServiceNeedDifferential cutSide="both" className={ribbonClass} />
);

export const renderIsHardToFill = (details, ribbonClass) => (
  get(details, 'isHardToFill', false) && <IsHardToFill cutSide="both" className={ribbonClass} />
);

const DETO_RWA_FLAG = () => checkFlag('flags.deto_rwa');

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
    isProjectedVacancy,
    hideHeader,
    hideContact,
  } = props;

  const { position } = details;

  const ribbonClass = 'ribbon-position-details';

  const isHighlightLoading = highlightPosition.loading;
  const tourEndDate = propOrDefault(details, 'ted');
  const formattedTourEndDate = tourEndDate ? formatDate(tourEndDate) : NO_END_DATE;

  const formattedBureau = get(position, 'bureau', NO_BUREAU);
  const formattedTOD = propOrDefault(position, 'post.tour_of_duty') || NO_TOUR_OF_DUTY;

  const dangerPay = get(position, 'post.danger_pay');
  const postDifferential = get(position, 'post.differential_rate');
  const obcUrl = get(position, 'post.post_bidding_considerations_url');
  const diffProps = { dangerPay, postDifferential, obcUrl };
  const differentials = <Differentials {...diffProps} />;

  const incumbent = get(position, 'current_assignment.user') || NO_USER_LISTED;
  const assignee = get(position, 'assignee') || NO_USER_LISTED;
  const cycle = get(position, 'latest_bidcycle.name', 'None Listed');
  const deto = position?.deto_rwa ? 'Eligible' : 'Not Eligible';

  const getPostedDate = () => {
    const posted = get(position, COMMON_PROPERTIES.posted);
    if (posted) {
      return formatDate(posted);
    }
    return NO_UPDATE_DATE;
  };
  const postedDate = getPostedDate();

  const stats = getBidStatisticsObject(get(details, 'bid_statistics', [{}]));

  const formattedDate = formatDate(get(details, 'position.description.date_updated'));

  const isHighlighted = get(position, 'is_highlighted');
  return (
    <div className="usa-grid-full padded-main-content position-details-outer-container">
      <div className="handshake-offset-container">
        {renderHandshake(stats, position, ribbonClass)}
        {renderHistDiffToStaff(details, ribbonClass)}
        {renderServiceNeedDifferential(details, ribbonClass)}
        {renderIsHardToFill(details, ribbonClass)}
      </div>
      <div className="usa-grid-full position-details-description-container positions-details-about-position">
        <div className={`usa-width-${hideContact ? 'one-whole' : 'two-thirds'} about-section-left`}>
          { !hideHeader && <h2>About the Position</h2> }
          <PositionDetailsDescription
            details={position}
            editDescriptionContent={editDescriptionContent}
            resetDescriptionEditMessages={resetDescriptionEditMessages}
            updatedDate={hideContact ? formattedDate : null}
          />
          {
            isHighlighted &&
            <div className="featured-description-container">
              {`
                This is a featured position. To learn more about the benefits of filling a featured position, click on each term:
              `}
              <GlossaryTermTrigger className="featured-description--link" text="volunteer" term="Vol Cable - Volunteer Cable" />
              {', '}
              <GlossaryTermTrigger className="featured-description--link" text="hard-to-fill" term="HDS - Historically Difficult to Staff" />
              {', or '}
              <GlossaryTermTrigger className="featured-description--link" text="urgent vacancies" term="UV - Urgent Vacancy" />
              {'.'}
            </div>
          }
          <div className="usa-grid-full data-point-section">
            {hideContact && <BidCount bidStatistics={stats} altStyle isCondensed />}
            <CondensedCardDataPoint ariaLabel={getAccessiblePositionNumber(get(position, 'position_number'))} title="Position number" content={get(position, 'position_number')} />
            <CondensedCardDataPoint title="Skill" content={<PositionSkillCodeList primarySkill={get(position, 'skill')} secondarySkill={get(position, 'skill_secondary')} />} />
            <CondensedCardDataPoint title="Grade" content={get(position, 'grade', NO_GRADE)} />
            <CondensedCardDataPoint title="Bureau" content={formattedBureau} />
            <CondensedCardDataPoint title="Tour of Duty" content={formattedTOD} />
            <CondensedCardDataPoint title="Language" content={<LanguageList languages={get(position, 'languages')} propToUse="representation" />} />
            <CondensedCardDataPoint title="Post Differential | Danger Pay" content={differentials} />
            <CondensedCardDataPoint title={isProjectedVacancy ? 'Bid Season' : 'Bid Cycle'} content={cycle} />
            <CondensedCardDataPoint title="TED" content={formattedTourEndDate} />
            <CondensedCardDataPoint title="Incumbent" content={incumbent} />
            { isProjectedVacancy && <CondensedCardDataPoint title="Assignee" content={assignee} /> }
            { !isProjectedVacancy && <CondensedCardDataPoint title="Posted" content={postedDate} />}
            { DETO_RWA_FLAG() && <CondensedCardDataPoint title="RWA/DETO Eligible" content={deto} /> }
          </div>
        </div>
        {
          !hideContact &&
          <div className="usa-width-one-third position-details-contact-container">
            <PositionDetailsContact
              details={{
                ...position,
                bidStatistics: get(details, 'bid_statistics', [{}]),
              }}
              editWebsiteContent={editWebsiteContent}
              editPocContent={editPocContent}
              resetDescriptionEditMessages={resetDescriptionEditMessages}
              isProjectedVacancy={isProjectedVacancy}
            />
            {
              !isProjectedVacancy &&
              <ServiceNeededToggle
                userProfile={userProfile}
                position={details}
                loading={isHighlightLoading}
                onChange={onHighlight}
              />
            }
          </div>
        }
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
  isProjectedVacancy: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideContact: PropTypes.bool,
};

PositionDetailsItem.defaultProps = {
  details: null,
  userProfile: {},
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
  isProjectedVacancy: false,
  hideHeader: false,
  hideContact: false,
};

export default PositionDetailsItem;
