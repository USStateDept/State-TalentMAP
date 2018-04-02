import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { forOwn } from 'lodash';
import Column, { columnsMap } from './Column';

describe('Column', () => {
  const prefix = 'usa-width';

  it('can receive children prop', () => {
    const selector = `.${prefix}-one-whole`;
    const wrapper = shallow(
      <Column>
        <span>span</span>
        <div>div</div>
        <span>span</span>
      </Column>,
    );

    expect(wrapper.find(selector).children('span')).toHaveLength(2);
    expect(wrapper.find(selector).children('div')).toHaveLength(1);
  });

  it('renders `columns` prop correctly', () => {
    let selector;

    forOwn(columnsMap, (className, column) => {
      selector = `.${prefix}-${className}`;
      expect(shallow(<Column columns={column} />).find(selector).exists()).toBe(true);
    });
  });

  it('renders `as` prop and renders new tag', () => {
    const tags = ('button|div|span|section|p').split('|');

    tags.forEach((tag) => {
      expect(shallow(<Column as={tag} />).find(tag).exists()).toBe(true);
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Column id="Column-1" className="tm-grid">
        <div className="usa-width-one-whole" />
      </Column>,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
