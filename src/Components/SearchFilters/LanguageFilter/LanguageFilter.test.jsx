import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import LanguageFilter from './LanguageFilter';

describe('LanguageFilterComponent', () => {
  const languageFilter = {
    item: {
      title: 'Language',
      description: 'skill',
      endpoint: 'skill/',
      selectionRef: 'skill',
    },
    data: [
      { name: 'Name1', id: 1, group: 'g1' },
      { name: 'Name2', id: 2, isSelected: true, group: 'g2' },
      { name: 'Name2', id: 3, group: 'g1' },
    ],
  };

  const languageGroups = {
    item: {
      title: 'Language',
      description: 'languageGroup',
    },
    data: [
      { name: 'Group1', id: 1, code: 'g1' },
      { name: 'Group2', id: 2, code: 'g2' },
    ],
  };

  const props = {
    item: languageFilter,
    queryParamToggle: () => {},
    queryParamUpdate: () => {},
    languageGroups,
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <LanguageFilter
        {...props}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(props.item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LanguageFilter
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onCheckBoxClick(true, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onGroupCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LanguageFilter
        {...props}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onGroupCheckBoxClick(true, { selectionRef: 'test', code: 'code', cone: languageGroups.data[0] });
    sinon.assert.calledOnce(spy);
  });

  it('can update on componentWillReceiveProps', () => {
    const wrapper = shallow(
      <LanguageFilter
        {...props}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'setParentCheckboxes');
    wrapper.instance().UNSAFE_componentWillReceiveProps(props);
    sinon.assert.calledOnce(spy);
  });

  it('clicks the accordion onGroupCheckBoxClick() if getAttribute returns !== "true"', () => {
    const clickSpy = sinon.spy();
    global.document.getElementById = () => ({ getAttribute: () => 'false', click: clickSpy });
    const wrapper = shallow(
      <LanguageFilter
        {...props}
      />,
    );

    wrapper.instance().onGroupCheckBoxClick(true, { cone: { id: 1 } });
    sinon.assert.calledOnce(clickSpy);
  });

  it('does not click the accordion onGroupCheckBoxClick() if getAttribute returns === "true"', () => {
    const clickSpy = sinon.spy();
    global.document.getElementById = () => ({ getAttribute: () => 'true', click: clickSpy });
    const wrapper = shallow(
      <LanguageFilter
        {...props}
      />,
    );

    wrapper.instance().onGroupCheckBoxClick(true, { cone: { id: 1 } });
    sinon.assert.notCalled(clickSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <LanguageFilter
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
