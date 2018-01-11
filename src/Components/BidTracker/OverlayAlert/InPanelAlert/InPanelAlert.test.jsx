import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import InPanelAlert from './InPanelAlert';

describe('InPanelAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <InPanelAlert title="test" date="6.11.17" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <InPanelAlert title="test" date="6.11.17" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
