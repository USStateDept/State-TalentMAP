import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './glossary';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    const glossary = {
      results: [
        {
          id: 7,
          title: 'COLA',
          definition: 'Cost of Living Adjustment',
          link: 'google.com',
        },
        {
          id: 8,
          title: 'D',
          definition: 'd',
          link: 'google.com',
        },
      ],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/glossary/').reply(200,
      glossary,
    );
  });

  it('can fetch the glossary', (done) => {
    const store = mockStore({ glossary: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.glossaryFetchData());
        store.dispatch(actions.glossaryIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
