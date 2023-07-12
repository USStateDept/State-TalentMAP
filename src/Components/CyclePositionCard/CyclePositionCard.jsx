import { get } from 'lodash';
import { getDifferentials, getResult } from 'Components/ResultsCard/ResultsCard';
import { getPostName } from 'utilities';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_DATE, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_STATUS, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import LanguageList from 'Components/LanguageList';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { NO_TOUR_END_DATE } from '../../Constants/SystemMessages';


const CyclePositionCard = ({ data }) => {
  const pos = get(data, 'position') || data;

  const description$ = get(pos, 'description.content') || 'No description.';
  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');

  const sections = {
    /* eslint-disable quote-props */
    subheading: {
      'Position Number': getResult(pos, 'position_number', NO_POSITION_NUMBER),
      'Skill': getResult(pos, 'skill_code') || NO_SKILL,
      'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE,
    },
    bodyPrimary: {
      'Location': getPostName(get(pos, 'post')) || NO_POST,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Status': getResult(pos, 'status') || NO_STATUS,
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
    },
    bodySecondary: {
      '': <CheckBox id="deto" label="DETO" value disabled />,
      'Bid Cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
      'Cycle Position': '---',
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Incumbent TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Incumbent Status': getResult(pos, 'current_assignment.user') || NO_USER_LISTED,
      'Pay Plan': '---',
      'TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Post Differential | Danger Pay': getDifferentials(pos),
      'Assignee TED': getResult(data, 'ted') || NO_DATE,
    },
    textarea: description$,
    metadata: {
      'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE),
    },
    /* eslint-enable quote-props */
  };

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Information',
        value: 'INFORMATION',
        content: <PositionExpandableContent sections={sections} />,
      }]}
    />
  );
};

CyclePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
};

export default CyclePositionCard;
