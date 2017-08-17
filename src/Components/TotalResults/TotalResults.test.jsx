import { shallow, mount } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TotalResults from './TotalResults';

describe('TotalResults', () => {
  let wrapper = null;

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const total = 103;
  const pageNumber = 4;
  const pageSize = 25;

  it('can receive props', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={0} pageSize={0} />,
    );
    expect(wrapper.instance().props.pageSize).toBe(0);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={0} pageSize={0} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays pager numbers and total results correctly when reaching the second to last page of the results', () => {
    wrapper = mount(
      <Provider store={mockStore({})}><MemoryRouter>
        <TotalResults total={total} pageNumber={pageNumber - 1} pageSize={pageSize} />
      </MemoryRouter></Provider>,
    );
    expect(wrapper.find('#total-results').text()).toBe('Viewing 76 - 100 of 103 results');
  });

  it('displays pager numbers and total results correctly when reaching the end of the results', () => {
    wrapper = mount(
      <Provider store={mockStore({})}><MemoryRouter>
        <TotalResults total={total} pageNumber={pageNumber} pageSize={pageSize} />
      </MemoryRouter></Provider>,
    );
    expect(wrapper.find('#total-results').text()).toBe('Viewing 101 - 103 of 103 results');
  });
});
