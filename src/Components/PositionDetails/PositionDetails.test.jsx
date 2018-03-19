import { shallow } from 'enzyme';
import React from 'react';
import PositionDetails from './PositionDetails';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionDetailsComponent', () => {
  const bidList = { results: [{ id: 1 }] };

  const goBackLink = { text: 'Go back text', link: '/link' };

  const props = {
    details: detailsObject,
    isLoading: false,
    hasErrored: false,
    goBackLink,
    toggleFavorite: () => {},
    userProfileFavoritePositionIsLoading: false,
    userProfileFavoritePositionHasErrored: false,
    toggleBidPosition: () => {},
    bidList,
    bidListToggleIsLoading: true,
    resetDescriptionEditMessages: () => {},
    editPocContent: () => {},
    editWebsiteContent: () => {},
    editDescriptionContent: () => {},
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <PositionDetails
        {...props}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    const details = Object.assign(
      props.details, { languages: [], post: null, is_overseas: false });

    const wrapper = shallow(
      <PositionDetails
        {...props}
        details={details}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('can call the editDescriptionContent function', () => {
    const wrapper = shallow(
      <PositionDetails
        {...props}
      />,
    );
    wrapper.instance().editDescriptionContent('test');
    expect(wrapper.instance().state.newDescriptionContent.value).toBe('test');
  });

  it('handles different types of position objects', () => {
    const details = Object.assign(props.details, { languages: [], is_overseas: true });

    const wrapper = shallow(
      <PositionDetails
        details={details}
        {...props}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
