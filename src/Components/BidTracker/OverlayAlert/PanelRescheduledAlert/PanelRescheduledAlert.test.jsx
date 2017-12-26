import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PanelRescheduledAlert from './PanelRescheduledAlert';

describe('PanelRescheduledAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PanelRescheduledAlert date="6.11.17" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PanelRescheduledAlert date="6.11.17" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
