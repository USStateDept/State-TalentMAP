import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SaveNewSearchAlert from './SaveNewSearchAlert';

describe('SaveNewSearchAlertComponent', () => {
  let wrapper = null;

  const message = { title: 'Title', message: 'A test message.' };

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchAlert
        newSavedSearchSuccess={message}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchAlert
        newSavedSearchSuccess={message}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
