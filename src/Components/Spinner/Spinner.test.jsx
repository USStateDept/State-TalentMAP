import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('is defined', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner).toBeDefined();
  });

  it('can accept the type prop', () => {
    const type = 'results';
    const spinner = shallow(<Spinner type={type} />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find(`.tm-spinner-${type}`)).toBeDefined();
  });

  it('can accept the size prop', () => {
    const size = 'big';
    const spinner = shallow(<Spinner size={size} />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find(`.ds-c-spinner--${size}`)).toBeDefined();
  });

  it('can accept the color prop', () => {
    const color = 'primary';
    const spinner = shallow(<Spinner color={color} />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find(`.ds-u-color--${color}`)).toBeDefined();
  });

  it('can accept the filled prop', () => {
    const spinner = shallow(<Spinner filled />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find('.ds-c-spinner--filled')).toBeDefined();
  });

  it('can accept the inverse prop', () => {
    const spinner = shallow(<Spinner inverse />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find('.ds-u-fill--background-inverse')).toBeDefined();
    expect(spinner.find('.ds-u-color--base-inverse')).toBeDefined();
  });
});
