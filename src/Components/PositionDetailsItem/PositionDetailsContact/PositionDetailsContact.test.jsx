import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsContact from './PositionDetailsContact';
import detailsObject from '../../../__mocks__/detailsObject';

describe('PositionDetailsContact', () => {
  const props = {
    details: detailsObject,
    editWebsiteContent: () => {},
    editPocContent: () => {},
    resetDescriptionEditMessages: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <PositionDetailsContact {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('toggles editors', () => {
    const wrapper = shallow(
      <PositionDetailsContact {...props} />,
    );
    wrapper.instance().toggleWebsiteEditor();
    expect(wrapper.instance().state.shouldShowWebsiteEditor.value).toBe(true);
    wrapper.instance().togglePocEditor();
    expect(wrapper.instance().state.shouldShowPocEditor.value).toBe(true);
  });

  it('can call the submit-edit functions', () => {
    const text = 'test';
    const submitWebsiteEditSpy = sinon.spy();
    const submitPocEditSpy = sinon.spy();
    const wrapper = shallow(
      <PositionDetailsContact
        {...props}
        editWebsiteContent={submitWebsiteEditSpy}
        editPocContent={submitPocEditSpy}
      />,
    );
    wrapper.instance().submitWebsiteEdit(text);
    expect(wrapper.instance().state.newWebsiteContent.value).toBe(text);
    sinon.assert.calledOnce(submitWebsiteEditSpy);
    wrapper.instance().submitPocEdit(text);
    expect(wrapper.instance().state.newPocContent.value).toBe(text);
    sinon.assert.calledOnce(submitPocEditSpy);
  });

  it('hides the editor button when the user does not have permission', () => {
    const details = Object.assign(detailsObject, { description: { is_editable_by_user: false } });
    const wrapper = shallow(
      <PositionDetailsContact
        {...props}
        details={details}
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionDetailsContact {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
