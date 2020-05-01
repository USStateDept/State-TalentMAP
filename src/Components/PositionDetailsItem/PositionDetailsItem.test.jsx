import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { COMMON_PROPERTIES } from 'Constants/EndpointParams';
import PositionDetailsItem, { renderHandshake } from './PositionDetailsItem';
import resultsObject from '../../__mocks__/resultsObject';

const detailsObject = resultsObject.results[0];

describe('PositionDetailsItem', () => {
  const props = {
    details: detailsObject,
    editDescriptionContent: () => {},
    resetDescriptionEditMessages: () => {},
    editPocContent: () => {},
    editWebsiteContent: () => {},
  };

  it('renders handshake', () => {
    expect(renderHandshake({ has_handshake_offered: true })).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(
      <PositionDetailsItem {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when posted date is null', () => {
    const details$ = { ...props.details };
    details$.position[COMMON_PROPERTIES.posted] = null;
    const wrapper = shallow(
      <PositionDetailsItem {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles different props and different position objects', () => {
    const details = Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    const wrapper = shallow(
      <PositionDetailsItem {...props} details={details} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles different types of position objects', () => {
    const details = Object.assign(detailsObject,
      { languages: [], is_overseas: true, organization: null, bureau: null });

    const wrapper = shallow(
      <PositionDetailsItem {...props} details={details} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionDetailsItem {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there is an obc id', () => {
    const newDetails = { ...props.details };
    newDetails.post = { obc_id: 1 };
    const wrapper = shallow(
      <PositionDetailsItem {...props} details={newDetails} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when various data is missing from the position', () => {
    const newDetails = { ...props.details, grade: null, skill: null };
    newDetails.current_assignment = { estimated_end_date: null };
    const wrapper = shallow(
      <PositionDetailsItem {...props} details={newDetails} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
