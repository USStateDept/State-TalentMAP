import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Position from './Position';
import routerLocations from '../../__mocks__/routerLocations';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Position', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the edit functions', () => {
    const descriptionSpy = sinon.spy();
    const pocSpy = sinon.spy();
    const websiteSpy = sinon.spy();
    const wrapper = shallow(
      <Position.WrappedComponent
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        positionDetails={[{ id: 1, description: { id: 1 } }]}
        editDescriptionContent={descriptionSpy}
        editPocContent={pocSpy}
        editWebsiteContent={websiteSpy}
        match={{ params: { id: '1' } }}
        toggleFavorite={() => {}}
        resetDescriptionEditMessages={() => {}}
      />,
    );
    wrapper.instance().editDescriptionContent('');
    sinon.assert.calledOnce(descriptionSpy);
    wrapper.instance().editPocContent('');
    sinon.assert.calledOnce(pocSpy);
    wrapper.instance().editWebsiteContent('');
    sinon.assert.calledOnce(websiteSpy);
  });

  it('can handle authentication redirects', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});
