import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Details from './Details';

describe('DetailsComponent', () => {
  let detailsItem = null;

  const details = {
    id: 84,
    skill: 1,
    skill_text: 'accounting',
    language: 1,
    language_text: 'english',
    grade: 1,
    city: 'Mazowe',
  };

  beforeEach(() => {
    detailsItem = TestUtils.renderIntoDocument(<Details details={details} />);
  });

  it('is defined', () => {
    expect(detailsItem).toBeDefined();
  });

  it('can set state of details', () => {
    const wrapper = shallow(<Details />);
    wrapper.setState({ details });
    expect(wrapper.instance().state.details.id).toBe(84);
  });
});
