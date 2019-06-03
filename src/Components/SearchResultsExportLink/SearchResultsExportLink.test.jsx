import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SearchResultsExportLink, { processData } from './SearchResultsExportLink';
import * as actions from '../../actions/results';

describe('SearchResultsExportLink', () => {
  let fetchResultDataStub;

  beforeEach(() => {
    fetchResultDataStub = sinon.stub(actions, 'fetchResultData').returns(Promise.resolve({ results: [] }));
  });

  afterEach(() => {
    actions.fetchResultData.restore();
  });

  it('gets data when button is clicked', (done) => {
    const wrapper = shallow(<SearchResultsExportLink />);
    expect(wrapper.state().data).toBeFalsy();
    wrapper.find('ExportButton').props().onClick();
    expect(fetchResultDataStub.calledOnce).toBe(true);
    const f = () => setTimeout(() => {
      expect(wrapper.instance().state.data).toEqual([]);
      done();
    }, 100);
    f();
  });

  it('shows link component when state has data', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    wrapper.setState({ data: 'test' });
    wrapper.update();
    expect(wrapper.find('CSVLink').prop('data')).toBeTruthy();
  });

  it('sets state on componentWillReceiveProps()', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    window.history.pushState({}, '', '?stuff=1&things=5');
    wrapper.instance().componentWillReceiveProps();
    expect(wrapper.instance().state.query.value).toBe('stuff=1&things=5');
  });

  xit('processes data correctly', () => {
    const data = [{ a: 1, b: 2, position: { current_assignment: { estimated_end_date: '2019-01-08T00:00:00Z' } } }];
    const output = processData(data);
    expect(output[0]).toMatchObject(
      { a: 1,
        b: 2,
        current_assignment__estimated_end_date: '2019-01-08T00:00:00Z',
        estimated_end_date: '01/07/2019' },
    );
  });

  xit('matches snapshot', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
