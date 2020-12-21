import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ExportLinkContainer, { ExportLink, mapDispatchToProps } from './ExportLink';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SearchResultsExportLink', () => {
  it('is defined', () => {
    const wrapper = shallow(<ExportLink />);
    expect(wrapper).toBeDefined();
  });

  it('it mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ExportLinkContainer />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls onClick on button click', () => {
    const wrapper = shallow(<ExportLink />);
    expect(wrapper.instance().state.isLoading).toBe(false);
    wrapper.find('ExportButton').props().onClick();
    expect(wrapper.instance().state.isLoading).toBe(true);
  });

  it('sets the csv ref', () => {
    const wrapper = shallow(<ExportLink />);
    const setTo = 2;
    wrapper.instance().setCsvRef(setTo);
    expect(wrapper.instance().csvLink).toBe(setTo);
  });

  it('sets state when data is done loading', () => {
    const wrapper = shallow(<ExportLink isLoading />);
    const instance = wrapper.instance();
    const data = { results: [] };
    wrapper.setProps({ isLoading: false, hasErrored: false, data });
    expect(instance.state.isLoading).toBe(false);
    expect(instance.state.data).toEqual(data.results);
  });

  it('sets state when data is done loading', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ExportLink isLoading />);
    wrapper.instance().setCsvRef({ link: { click: spy } });
    wrapper.instance().UNSAFE_componentWillReceiveProps(
      { isLoading: false, hasErrored: false, data: { results: [] } },
    );
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ExportLink />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
