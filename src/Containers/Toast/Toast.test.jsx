import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import Toast, { Toast as ToastComponent } from './Toast';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ToastContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Toast toastData={{ type: 'success', message: 'Success!' }} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('updates when it receives new toastData', () => {
    const wrapper = shallow(<ToastComponent toastData={{}} />);
    const prevProps = wrapper.props();
    spyOn(wrapper.instance(), 'notify');
    wrapper.setProps({ toastData: { type: 'error', message: 'Error!' } });
    // forces an update call to componentDidUpdate - https://github.com/airbnb/enzyme/issues/34
    wrapper.instance().componentDidUpdate(prevProps);
    expect(wrapper.instance().notify).toHaveBeenCalled();
  });

  it('is defined after calling notify()', () => {
    const wrapper = shallow(<ToastComponent toastData={{}} />);
    wrapper.instance().notify({ type: 'success', message: 'Success!' });
    wrapper.instance().notify({ type: 'error', message: 'Error!' });
    wrapper.instance().notify({}); // use defaults
    wrapper.instance().notify({ title: 'test' }); // contains a title
    expect(wrapper).toBeDefined();
  });
});
