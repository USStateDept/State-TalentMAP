import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionInformation from './PositionInformation';
import assignmentObject from '../../../__mocks__/assignmentObject';

describe('PositionInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionInformation assignment={assignmentObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PositionInformation assignment={assignmentObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
