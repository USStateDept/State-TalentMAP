import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import PositionTitle from './PositionTitle';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionTitleComponent', () => {
  const goBackLink = { text: 'Go back text', link: '/link' };

  const bidList = { results: [] };

  it('can receive props', () => {
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject,
      { description: null, languages: [], post: null, is_overseas: false });

    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('displays go back link text', () => {
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    const link = wrapper.find('a.back-link');
    expect(link.text()).toEqual(goBackLink.text);
  });

  it('shows the editor button when the user has permission', () => {
    Object.assign(detailsObject, { description: { is_editable_by_user: true } });
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(1);
  });

  it('hides the editor button when the user does not have permission', () => {
    Object.assign(detailsObject, { description: { is_editable_by_user: false } });
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(0);
  });

  it('handles go back link click', () => {
    const stub = sinon.stub(window.history, 'back');
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    const link = wrapper.find('a.back-link');
    link.simulate('click');
    expect(stub.called).toBe(true);
  });

  it('can toggle editors', () => {
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={() => {}}
        editPocContent={() => {}}
        editDescriptionContent={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    wrapper.instance().toggleWebsiteEditor();
    expect(wrapper.instance().state.shouldShowWebsiteEditor.value).toBe(true);
    wrapper.instance().togglePocEditor();
    expect(wrapper.instance().state.shouldShowPocEditor.value).toBe(true);
    wrapper.instance().toggleDescriptionEditor();
    expect(wrapper.instance().state.shouldShowDescriptionEditor.value).toBe(true);
  });

  it('can call the submit-edit functions', () => {
    const text = 'test';
    const submitWebsiteEditSpy = sinon.spy();
    const submitPocEditSpy = sinon.spy();
    const submitDescriptionEditSpy = sinon.spy();
    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
        editWebsiteContent={submitWebsiteEditSpy}
        editPocContent={submitPocEditSpy}
        editDescriptionContent={submitDescriptionEditSpy}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    wrapper.instance().submitWebsiteEdit(text);
    expect(wrapper.instance().state.newWebsiteContent.value).toBe(text);
    sinon.assert.calledOnce(submitWebsiteEditSpy);
    wrapper.instance().submitPocEdit(text);
    expect(wrapper.instance().state.newPocContent.value).toBe(text);
    sinon.assert.calledOnce(submitPocEditSpy);
    wrapper.instance().submitDescriptionEdit(text);
    expect(wrapper.instance().state.newDescriptionContent.value).toBe(text);
    sinon.assert.calledOnce(submitDescriptionEditSpy);
  });
});
