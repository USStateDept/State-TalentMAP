import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SearchResultsExportLink from './SearchResultsExportLink';
import * as actions from '../../actions/results';

describe('SearchResultsExportLink', () => {
  let fetchResultDataStub;

  beforeEach(() => {
    fetchResultDataStub = sinon.stub(actions, 'fetchResultData').returns(Promise.resolve('success'));
  });

  afterEach(() => {
    actions.fetchResultData.restore();
  });

  it('gets data when button is clicked', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    expect(wrapper.state().data).toBeFalsy();
    const button = wrapper.find('button');
    button.simulate('click');
    expect(fetchResultDataStub.calledOnce).toBe(true);
  });

  it('shows download component when state has data', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    wrapper.setState({ data: 'test' });
    wrapper.update();
    expect(wrapper.find('CSVDownload').prop('data')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SearchResultsExportLink />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
