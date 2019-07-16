import { shallow } from 'enzyme';
import React from 'react';
import ProjectedVacancyFilter from './ProjectedVacancyFilter';

describe('ProjectedVacancyFilter', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProjectedVacancyFilter />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined after receiving new props', () => {
    const wrapper = shallow(
      <ProjectedVacancyFilter />,
    );
    wrapper.instance().toggleRef = { updateVal: () => {} };
    wrapper.update();
    // matches first componentWillReceiveProps if statement
    wrapper.setProps({ items: [{ isSelected: true, code: 1 }] });
    expect(wrapper).toBeDefined();
    // matches second componentWillReceiveProps if statement
    wrapper.setProps({ items: [{ isSelected: false, code: 1 }] });
    expect(wrapper).toBeDefined();
  });

  it('is defined after receiving new props when no items have the isSelected prop', () => {
    const wrapper = shallow(
      <ProjectedVacancyFilter />,
    );
    wrapper.setProps({ items: [{ code: 1 }] });
    expect(wrapper).toBeDefined();
  });
});
