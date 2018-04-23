import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SkillFilter from './SkillFilter';

describe('SkillFilterComponent', () => {
  const skillFilter = {
    item: {
      title: 'Skill',
      description: 'skill',
      endpoint: 'skill/',
      selectionRef: 'skill',
    },
    data: [
      { name: 'Name1', id: 1, cone: 'Cone1' },
      { name: 'Name2', id: 2, cone: 'Cone2', isSelected: true },
      { name: 'Name2', id: 3, cone: 'Cone2' },
    ],
  };

  const skillCones = {
    item: {
      title: 'Skill cones',
      description: 'skillCone',
      endpoint: 'skill/cone/',
      selectionRef: 'skillCone',
    },
    data: [
      { name: 'Cone1', id: 1 },
      { name: 'Cone2', id: 2 },
      { name: 'ConeWithNoChildren', id: 3 },
    ],
  };

  const props = {
    item: skillFilter,
    queryParamToggle: () => {},
    queryParamUpdate: () => {},
    skillCones,
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <SkillFilter
        {...props}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(props.item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SkillFilter
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onCheckBoxClick(true, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onConeCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SkillFilter
        {...props}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onConeCheckBoxClick(true, { selectionRef: 'test', code: 'code', cone: skillCones.data[0] });
    sinon.assert.calledOnce(spy);
  });

  it('can update on componentWillReceiveProps', () => {
    const wrapper = shallow(
      <SkillFilter
        {...props}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'setParentCheckboxes');
    wrapper.instance().componentWillReceiveProps(props);
    sinon.assert.calledOnce(spy);
  });

  it('does not render cones with zero children', () => {
    const wrapper = shallow(
      <SkillFilter
        {...props}
      />,
    );
    // should only render two out of the three cones
    expect(wrapper.find('AccordionItem').length).toBe(2);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SkillFilter
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
