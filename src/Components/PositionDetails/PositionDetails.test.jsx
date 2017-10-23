import { shallow } from 'enzyme';
import React from 'react';
import PositionDetails from './PositionDetails';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  const bidList = { results: [{ id: 1 }] };

  const goBackLink = { text: 'Go back text', link: '/link' };

  it('can receive props', () => {
    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBidPosition={() => {}}
        bidList={bidList}
        bidListToggleIsLoading
        resetDescriptionEditMessages={() => {}}
        editPocContent={() => {}}
        editWebsiteContent={() => {}}
        editDescriptionContent={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBidPosition={() => {}}
        bidList={bidList}
        bidListToggleIsLoading
        resetDescriptionEditMessages={() => {}}
        editPocContent={() => {}}
        editWebsiteContent={() => {}}
        editDescriptionContent={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('can call the editDescriptionContent function', () => {
    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBidPosition={() => {}}
        bidList={bidList}
        bidListToggleIsLoading
        resetDescriptionEditMessages={() => {}}
        editPocContent={() => {}}
        editWebsiteContent={() => {}}
        editDescriptionContent={() => {}}
      />,
    );
    wrapper.instance().editDescriptionContent('test');
    expect(wrapper.instance().state.newDescriptionContent.value).toBe('test');
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading
        hasErrored={false}
        goBackLink={goBackLink}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBidPosition={() => {}}
        bidList={bidList}
        bidListToggleIsLoading
        resetDescriptionEditMessages={() => {}}
        editPocContent={() => {}}
        editWebsiteContent={() => {}}
        editDescriptionContent={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
