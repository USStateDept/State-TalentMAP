import { shallow } from 'enzyme';
import PositionExpandableContent from './PositionExpandableContent';
import {
  NO_BUREAU, NO_DATE, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_STATUS, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';

describe('PositionExpandableContent', () => {
  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': NO_POSITION_NUMBER },
      { 'Skill': NO_SKILL },
      { 'Position Title': NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Bureau': NO_BUREAU },
      { 'Location': NO_POST },
      { 'Org/Code': NO_ORG },
      { 'Grade': NO_GRADE },
      { 'Status': NO_STATUS },
    ],
    bodySecondary: [
      { 'TED': NO_DATE },
      { 'Incumbent': NO_USER_LISTED },
      { 'Tour of Duty': NO_TOUR_OF_DUTY },
    ],
    textarea: {
      'Position Details': 'No Details',
    },
    metadata: [
      { 'Position Posted': NO_UPDATE_DATE },
      { 'Last Updated': NO_UPDATE_DATE },
    ],
    /* eslint-enable quote-props */
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionExpandableContent sections={sections} />);
    expect(wrapper).toBeDefined();
  });
});
