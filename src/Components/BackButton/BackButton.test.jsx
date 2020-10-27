import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import BackButtonContainer, { BackButton } from './BackButton';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BackButton', () => {
  const props = {
    routerLocations: [
      { pathname: '/results', search: '?q=', hash: '', state: undefined, key: 'dudni5' },
      { pathname: '/compare/58312870,58312869', search: '', hash: '', state: undefined, key: 't0s36f' },
    ],
    location: { pathname: '/compare/58312870,58312869', search: '', hash: '', key: 't0s36f' },
    ignoreCurrentPath: true,
  };

  it('is defined', () => {
    const wrapper = shallow(<BackButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when connected', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BackButtonContainer {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('renders the button', () => {
    const wrapper = shallow(<BackButton {...props} />);
    expect(wrapper.find('.button-back-link').exists()).toBe(true);
  });

  it('calls window.history.go on click', () => {
    const wrapper = shallow(<BackButton {...props} />);
    const spy = sinon.spy();
    window.history.go = spy;
    expect(wrapper.find('button').simulate('click'));
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BackButton {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
