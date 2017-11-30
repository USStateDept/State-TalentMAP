import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Inbox from './Inbox';

describe('InboxComponent', () => {
  it('is defined', () => {
    const header = shallow(
      <Inbox number={4} />,
    );
    expect(header).toBeDefined();
  });

  it('matches snapshot', () => {
    const header = shallow(
      <Inbox number={4} />,
    );
    expect(toJSON(header)).toMatchSnapshot();
  });
});
