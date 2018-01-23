import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import Glossary from './Glossary';
import glossaryItems from '../../__mocks__/glossaryItems';

describe('GlossaryComponent', () => {
  const props = {
    visible: true,
    toggleVisibility: () => {},
    glossaryItems,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Glossary
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can enter a keyword', () => {
    const wrapper = shallow(
      <Glossary
        {...props}
      />,
    );
    wrapper.instance().changeText('test');
    expect(wrapper.instance().state.searchText.value).toBe('test');
  });

  it('can close the glossary', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Glossary
        {...props}
        toggleVisibility={spy}
      />,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Glossary
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when visible is false', () => {
    const wrapper = shallow(
      <Glossary
        {...props}
        visible={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
