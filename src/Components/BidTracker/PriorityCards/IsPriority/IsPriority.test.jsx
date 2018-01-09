import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import IsPriority from './IsPriority';

describe('IsPriorityComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <IsPriority>
        <div />
      </IsPriority>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <IsPriority>
        <div />
      </IsPriority>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
