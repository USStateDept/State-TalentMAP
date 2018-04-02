import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TotalResults from './TotalResults';

describe('TotalResults', () => {
  let wrapper = null;

  const total = 103;
  const pageNumber = 1;
  const pageSize = 25;

  const applyViewText = (beginning, through, totalNum) => `Viewing ${beginning}-${through} of ${totalNum} Results`;

  it('can receive props', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={1} pageSize={0} />,
    );
    expect(wrapper.instance().props.pageSize).toBe(0);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={1} pageSize={0} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays page numbers and total results correctly when on the first page of the results', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={pageNumber} pageSize={pageSize} />,
    );
    expect(wrapper.find('#total-results').text()).toBe(applyViewText(1, 25, 103));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays page numbers and total results correctly when on the second page of the results', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={pageNumber + 1} pageSize={pageSize} />,
    );
    expect(wrapper.find('#total-results').text()).toBe(applyViewText(26, 50, 103));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays page numbers and total results correctly when on the third page of the results', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={pageNumber + 2} pageSize={pageSize} />,
    );
    expect(wrapper.find('#total-results').text()).toBe(applyViewText(51, 75, 103));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays page numbers and total results correctly when reaching the second to last page of the results', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={pageNumber + 3} pageSize={pageSize} />,
    );
    expect(wrapper.find('#total-results').text()).toBe(applyViewText(76, 100, 103));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays page numbers and total results correctly when reaching the last page of the results', () => {
    wrapper = shallow(
      <TotalResults total={total} pageNumber={pageNumber + 4} pageSize={pageSize} />,
    );
    expect(wrapper.find('#total-results').text()).toBe(applyViewText(101, 103, 103));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
