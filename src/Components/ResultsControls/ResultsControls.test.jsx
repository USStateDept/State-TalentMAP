import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ResultsControls from './ResultsControls';
import MockTestProvider from '../../testUtilities/MockProvider';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsControlsComponent', () => {
  let wrapper = null;

  const config = {
    isLoading: true,
    onQueryParamUpdate: () => {},
    sortBy: { options: [{ value: 'sort', text: 'sort' }] },
    pageSizes: { options: [{ value: 10, text: '10' }] },
    pageCount: 10,
    hasLoaded: true,
    onToggle: () => {},
  };

  const { isLoading, onQueryParamUpdate,
    sortBy, pageSizes, pageCount, hasLoaded, onToggle } = config;

  it('is defined', () => {
    wrapper = TestUtils.renderIntoDocument(<MockTestProvider>
      <ResultsControls
        results={resultsObject}
        isLoading={isLoading}
        queryParamUpdate={onQueryParamUpdate}
        sortBy={sortBy}
        pageSizes={pageSizes}
        pageCount={pageCount}
        hasLoaded={hasLoaded}
        onToggle={onToggle}
      />
    </MockTestProvider>);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={pageCount}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
    />);
    expect(wrapper.instance().props.pageSizes).toBe(pageSizes);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={!isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={20}
      hasLoaded={false}
      onToggle={onToggle}
    />);
    expect(wrapper.instance().props.pageCount).toBe(20);
  });

  it('can call the onSelectOrdering function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={!isLoading}
      queryParamUpdate={spy}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={20}
      hasLoaded={false}
      onToggle={onToggle}
    />);
    wrapper.instance().onSelectOrdering({ target: { value: 1 } });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onSelectLimit function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={!isLoading}
      queryParamUpdate={spy}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={20}
      hasLoaded={false}
      onToggle={onToggle}
    />);
    wrapper.instance().onSelectLimit({ target: { value: 1 } });
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={pageCount}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when context.isClient === true', () => {
    wrapper = shallow(<ResultsControls
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={pageCount}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
    />, { context: { isClient: true } });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
