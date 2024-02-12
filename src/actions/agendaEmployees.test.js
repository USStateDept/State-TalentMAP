import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './agendaEmployees';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ assignment: {} });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/agenda_employees/?', response: [200, { results: [] }],
    })); mock();
  });

  it('can fetch agenda employees', (done) => {
    store.dispatch(actions.agendaEmployeesFetchData());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can fetch agenda employees export', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/agenda_employees/export/?', response: [200, { results: [] }],
    })); mock();
    actions.employeeAgendaSearchExport();
    expectMockWasCalled({ spy, cb: done });
  });

  [
    '/fsbid/agenda_employees/reference/current-bureaus/',
    '/fsbid/agenda_employees/reference/handshake-bureaus/',
    '/fsbid/agenda_employees/reference/current-organizations/',
    '/fsbid/agenda_employees/reference/handshake-organizations/',
  ].map(m => (
    it(`can fetch agenda employees reference data for ${m}`, (done) => {
      ({ mock, spy } = spyMockAdapter({
        url: m, response: [200, { results: [] }],
      })); mock();
      store.dispatch(actions.agendaEmployeesFiltersFetchData());
      expectMockWasCalled({ spy, cb: done });
    })
  ));
});
