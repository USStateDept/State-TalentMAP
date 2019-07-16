import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import CompareList, { renderBidCounts } from './CompareList';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareListComponent', () => {
  const props = {
    goBackLink: { text: 'Go back to search results' },
    onToggle: () => {},
  };
  it('is defined', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when data is missing', () => {
    const newResults = [...resultsObject.results];
    newResults[0].position.bureau = null;
    newResults[0].position.skill = null;
    newResults[0].position.post.tour_of_duty = null;
    newResults[0].position.current_assignment.estimated_end_date = null;
    const wrapper = shallow(<CompareList {...props} compare={newResults} />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(wrapper.instance().props.compare[0].position.id).toBe(6);
  });

  it('displays the comparison list when isLoading is false', () => {
    const wrapper = shallow(
      <CompareList {...props} compare={resultsObject.results} isLoading={false} />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(true);
    expect(wrapper.find('Spinner').exists()).toBe(false);
  });

  it('displays the Spinner when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(false);
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('calls the onToggle prop when a CompareCheck is toggled', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CompareList
      {...props}
      compare={resultsObject.results}
      onToggle={spy}
    />);
    wrapper.find('CompareCheck').at(0).props().onToggle();
    sinon.assert.calledOnce(spy);
  });

  it('renders bid list buttons', () => {
    const wrapper = shallow(<CompareList
      {...props}
      bidList={{ results: [] }}
      compare={resultsObject.results}
    />);
    expect(wrapper.instance().renderBidListButtons([{}], [{}])).toBeDefined();
  });

  it('renders bid counts', () => {
    expect(renderBidCounts([{}], [{}])).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there is an obc id', () => {
    const resultsWithObc = { ...resultsObject };
    resultsWithObc.results[0].position.post.obc_id = 1;
    const wrapper = shallow(<CompareList {...props} compare={resultsWithObc.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
