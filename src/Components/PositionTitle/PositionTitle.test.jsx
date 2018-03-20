import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import PositionTitle from './PositionTitle';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionTitleComponent', () => {
  const props = {
    details: detailsObject,
    toggleBidPosition: () => {},
    toggleFavorite: () => {},
    userProfile: {},
    userProfileFavoritePositionIsLoading: false,
    bidListToggleIsLoading: false,
    bidList: { results: [] },
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <PositionTitle
        {...props}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('displays the OBC link if obc_id exists', () => {
    const newDetailsObject = { ...detailsObject };
    newDetailsObject.post.obc_id = 1;
    const wrapper = shallow(
      <PositionTitle
        {...props}
        details={newDetailsObject}
      />,
    );
    expect(wrapper.find('OBCUrl').exists()).toBe(true);
  });

  it('hides the OBC link if obc_id does not exist', () => {
    const newDetailsObject = { ...detailsObject };
    newDetailsObject.post.obc_id = null;
    const wrapper = shallow(
      <PositionTitle
        {...props}
        details={newDetailsObject}
      />,
    );
    expect(wrapper.find('OBCUrl').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionTitle
        {...props}
        details={detailsObject}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  // will include once new Go Back button is added
  xit('handles go back link click', () => {
    const stub = sinon.stub(window.history, 'back');
    const wrapper = shallow(
      <PositionTitle
        {...props}
        details={detailsObject}
      />,
    );
    const link = wrapper.find('a.back-link');
    link.simulate('click');
    expect(stub.called).toBe(true);
  });
});
