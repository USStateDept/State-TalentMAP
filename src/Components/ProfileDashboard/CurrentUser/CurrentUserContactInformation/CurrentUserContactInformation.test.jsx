import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import CurrentUserContactInformation from './CurrentUserContactInformation';

describe('CurrentUserContactInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserContactInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserContactInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
