import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsItem from './PositionDetailsItem';
import detailsObject from '../../Constants/TestObjects';

describe('PositionDetailsItem', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <PositionDetailsItem details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <PositionDetailsItem details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionDetailsItem details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject,
      { languages: [], is_overseas: true, organization: null, bureau: null });

    wrapper = shallow(
      <PositionDetailsItem details={detailsObject} isLoading hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
