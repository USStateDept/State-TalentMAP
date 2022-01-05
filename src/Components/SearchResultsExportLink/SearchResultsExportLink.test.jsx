import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SearchResultsExportLink from './SearchResultsExportLink';
import * as actions from '../../actions/results';

describe('SearchResultsExportLink', () => {
  let fetchResultDataStub;

  beforeEach(() => {
    fetchResultDataStub = sinon.stub(actions, 'downloadPositionData').returns(Promise.resolve(''));
  });

  afterEach(() => {
    actions.downloadPositionData.restore();
  });

  it('gets data when button is clicked', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    wrapper.find('ExportButton').props().onClick();
    expect(fetchResultDataStub.calledOnce).toBe(true);
  });

  it('sets state on UNSAFE_componentWillReceiveProps()', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    window.history.pushState({}, '', '?stuff=1&things=5');
    wrapper.instance().UNSAFE_componentWillReceiveProps();
    expect(wrapper.instance().state.query.value).toBe('stuff=1&things=5');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
