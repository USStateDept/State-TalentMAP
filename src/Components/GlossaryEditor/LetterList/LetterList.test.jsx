import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import LetterList from './LetterList';

describe('LetterListComponent', () => {
  const props = {
    letters: ['#', 'A', 'B'],
    onClick: () => {},
  };
  it('is defined', () => {
    const wrapper = shallow(<LetterList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can click on a letter link', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<LetterList
      {...props}
      onClick={spy}
    />);
    expect(wrapper.find('InteractiveElement').first().simulate('click'));
    sinon.assert.calledOnce(spy);
  });

  it('can click on the All link', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<LetterList
      {...props}
      onClick={spy}
    />);
    expect(wrapper.find('.letter-link--all').simulate('click'));
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<LetterList
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
