import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BorderedList from './BorderedList';

describe('BorderedListComponent', () => {
  const contentArray = [
    <span>test 1</span>,
    <div className="my-div">test 2</div>,
    <p>test 3</p>,
  ];

  it('is defined', () => {
    const wrapper = shallow(
      <BorderedList
        contentArray={contentArray}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the contents', () => {
    const wrapper = shallow(
      <BorderedList
        contentArray={contentArray}
      />,
    );
    expect(wrapper.find('span').text()).toBe('test 1');
    expect(wrapper.find('.my-div').text()).toBe('test 2');
    expect(wrapper.find('p').text()).toBe('test 3');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BorderedList
        contentArray={contentArray}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
