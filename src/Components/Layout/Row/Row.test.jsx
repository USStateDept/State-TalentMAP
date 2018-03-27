import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Row from './Row';

describe('Row', () => {
  it('can receive children prop', () => {
    const selector = '.usa-grid';
    const wrapper = shallow(
      <Row>
        <span>span</span>
        <div>div</div>
        <span>span</span>
      </Row>,
    );

    expect(wrapper.find(selector).children('span')).toHaveLength(2);
    expect(wrapper.find(selector).children('div')).toHaveLength(1);
  });

  it('renders `fluid` prop correctly', () => {
    const selector = '.usa-grid-full';

    expect(shallow(<Row />).find(selector).exists()).toBe(false);
    expect(shallow(<Row fluid />).find(selector).exists()).toBe(true);
  });

  it('renders `as` prop and renders new tag', () => {
    const tags = ('button|div|span|section|p').split('|');

    tags.forEach((tag) => {
      expect(shallow(<Row as={tag} />).find(tag).exists()).toBe(true);
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Row id="row-1" className="tm-grid">
        <div className="usa-width-one-whole" />
      </Row>,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
