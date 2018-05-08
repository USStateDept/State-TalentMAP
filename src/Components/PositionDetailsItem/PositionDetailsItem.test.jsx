import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsItem from './PositionDetailsItem';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionDetailsItem', () => {
  const props = {
    details: detailsObject,
    editDescriptionContent: () => {},
    resetDescriptionEditMessages: () => {},
    editPocContent: () => {},
    editWebsiteContent: () => {},
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <PositionDetailsItem {...props} />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    const details = Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    const wrapper = shallow(
      <PositionDetailsItem {...props} details={details} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    const details = Object.assign(detailsObject,
      { languages: [], is_overseas: true, organization: null, bureau: null });

    const wrapper = shallow(
      <PositionDetailsItem {...props} details={details} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
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
