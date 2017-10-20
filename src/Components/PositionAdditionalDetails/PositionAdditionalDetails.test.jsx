import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionAdditionalDetails from './PositionAdditionalDetails';

describe('PositionAdditionalDetails', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PositionAdditionalDetails
        content="test"
        editDescriptionContent={() => {}}
        descriptionEditHasErrored={false}
        descriptionEditIsLoading={false}
        descriptionEditSuccess={false}
        resetDescriptionEditMessages={() => {}}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can toggle the description editor', () => {
    const wrapper = shallow(
      <PositionAdditionalDetails
        content="test"
        editDescriptionContent={() => {}}
        descriptionEditHasErrored={false}
        descriptionEditIsLoading={false}
        descriptionEditSuccess={false}
        resetDescriptionEditMessages={() => {}}
      />);
    wrapper.find('#additional-details-edit').simulate('click');
    expect(wrapper.instance().state.shouldShowDescriptionEditor.value).toBe(true);
  });

  it('can call the submitDescriptionEdit function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <PositionAdditionalDetails
        content="test"
        editDescriptionContent={spy}
        descriptionEditHasErrored={false}
        descriptionEditIsLoading={false}
        descriptionEditSuccess={false}
        resetDescriptionEditMessages={() => {}}
      />);
    wrapper.instance().submitDescriptionEdit(1);
    sinon.assert.calledOnce(spy);
  });

  it('can call functions on unmount', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <PositionAdditionalDetails
        content="test"
        editDescriptionContent={() => {}}
        descriptionEditHasErrored={false}
        descriptionEditIsLoading={false}
        descriptionEditSuccess={false}
        resetDescriptionEditMessages={spy}
      />);
    wrapper.instance().componentWillUnmount();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionAdditionalDetails
        content="test"
        editDescriptionContent={() => {}}
        descriptionEditHasErrored={false}
        descriptionEditIsLoading={false}
        descriptionEditSuccess={false}
        resetDescriptionEditMessages={() => {}}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
