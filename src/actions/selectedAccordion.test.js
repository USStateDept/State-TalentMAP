import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './selectedAccordion';
import { selectedAccordion } from '../Constants/DefaultProps';

const { mockStore } = setupAsyncMocks();

describe('selected accordion', () => {
  it('can fetch selected accordion', () => {
    const store = mockStore({ accordion: selectedAccordion });
    store.dispatch(actions.setSelectedAccordion(selectedAccordion));
  });
});
