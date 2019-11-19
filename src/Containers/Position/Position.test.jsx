import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Position, { mapDispatchToProps } from './Position';
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
        positionDetails={{ id: 1, description: { id: 1 } }}
        editDescriptionContent={descriptionSpy}
        editPocContent={pocSpy}
        editWebsiteContent={websiteSpy}
        match={{ params: { id: '1' } }}
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

  it('calls fetchPVData() on this.getPVDetails()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Position.WrappedComponent
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        positionDetails={{ id: 1, description: { id: 1 } }}
        editDescriptionContent={() => {}}
        editPocContent={() => {}}
        editWebsiteContent={() => {}}
        match={{ params: { id: '1' } }}
        resetDescriptionEditMessages={() => {}}
        fetchPVData={spy}
      />,
    );
    wrapper.instance().getPVDetails(1);
    sinon.assert.calledOnce(spy);
  });

  it('can handle authentication redirects', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [1],
    onNavigateTo: ['/profile'],
    editDescriptionContent: [1, 'content'],
    editPocContent: [1, 'content'],
    editWebsiteContent: [1, 'content'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
