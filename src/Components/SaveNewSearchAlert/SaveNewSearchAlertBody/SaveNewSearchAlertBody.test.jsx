import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SaveNewSearchAlertBody from './SaveNewSearchAlertBody';
import * as ResponseMessages from '../../../Constants/ResponseMessages';

describe('SaveNewSearchAlertBodyComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchAlertBody
        type={ResponseMessages.NEW_SAVED_SEARCH_SUCCESS}
        text="text"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can render multuple types', () => {
    wrapper = shallow(
      <SaveNewSearchAlertBody
        type={ResponseMessages.UPDATED_SAVED_SEARCH_SUCCESS}
        text="text"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchAlertBody
        type={ResponseMessages.NEW_SAVED_SEARCH_SUCCESS}
        text="text"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
