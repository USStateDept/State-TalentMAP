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
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject,
      { desription: null, languages: [], post: null, is_overseas: false });

    const wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        bidList={bidList}
        toggleBidPosition={() => {}}
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
      />,
    );
    const link = wrapper.find('a.back-link');
    expect(link.text()).toEqual(goBackLink.text);
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
      />,
    );
    const link = wrapper.find('a.back-link');
    link.simulate('click');
    expect(stub.called).toBe(true);
  });
});
