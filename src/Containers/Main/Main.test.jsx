import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  it('is defined', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter>
      <Main api={api} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
});
