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

  const api = 'http://localhost:3005';

  beforeEach(() => {
    detailsItem = TestUtils.renderIntoDocument(<Details details={details} api={api} />);
  });

  it('is defined', () => {
    expect(detailsItem).toBeDefined();
  });

  it('can set state of details', () => {
    const wrapper = shallow(<Details api={api} />);
    wrapper.setState({ details });
    expect(wrapper.instance().state.details.id).toBe(84);
  });
});
