import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import CurrentUserGeneralInformation from './CurrentUserGeneralInformation';

describe('CurrentUserGeneralInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserGeneralInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when showEditLink is true', () => {
    const wrapper = shallow(
      <CurrentUserGeneralInformation showEditLink userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useGroup is true', () => {
    const wrapper = shallow(
      <CurrentUserGeneralInformation useGroup userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserGeneralInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
