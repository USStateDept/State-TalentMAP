import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsDescription from './PositionDetailsDescription';
import detailsObject from '../../../__mocks__/detailsObject';

describe('PositionDetailsDescription', () => {
  const props = {
    details: detailsObject,
    editDescriptionContent: () => {},
    resetDescriptionEditMessages: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <PositionDetailsDescription {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('toggles the editor', () => {
    const wrapper = shallow(
      <PositionDetailsDescription {...props} />,
    );
    wrapper.instance().toggleDescriptionEditor();
    expect(wrapper.instance().state.shouldShowDescriptionEditor.value).toBe(true);
  });

  it('can call the submit-edit function', () => {
    const text = 'text';
    const spy = sinon.spy();
    const wrapper = shallow(
      <PositionDetailsDescription
        {...props}
        editDescriptionContent={spy}
      />,
    );
    wrapper.instance().submitDescriptionEdit(text);
    expect(wrapper.instance().state.newDescriptionContent.value).toBe(text);
  });

  it('hides the editor button when the user does not have permission', () => {
    const details = Object.assign(detailsObject, { description: { is_editable_by_user: false } });
    const wrapper = shallow(
      <PositionDetailsDescription
        {...props}
        details={details}
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionDetailsDescription {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
