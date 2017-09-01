import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './selectedAccordion';
import { selectedAccordion } from '../Constants/DefaultProps';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('selected accordion', () => {
  it('can fetch selected accordion', () => {
    const store = mockStore({ accordion: selectedAccordion });
    store.dispatch(actions.setSelectedAccordion(selectedAccordion));
  });
});
