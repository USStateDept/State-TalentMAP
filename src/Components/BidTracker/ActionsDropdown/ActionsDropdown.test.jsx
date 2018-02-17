import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import { ActionsDropdown, mapDispatchToProps } from './ActionsDropdown';

describe('ActionsDropdown', () => {
  const props = {
    positionId: 1,
    showDelete: true,
    disableDelete: false,
    showWithdraw: false,
    disableWithdraw: false,
    toggleBid: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<ActionsDropdown {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('can call the hideDropdown function', () => {
    const wrapper = shallow(<ActionsDropdown {...props} />);

    // define the instance
    const instance = wrapper.instance();
    instance.dropdown = { hide: () => {} };
    // spy the hideDropdown function
    const spy = sinon.spy(instance, 'hideDropdown');
    // click to logout
    instance.hideDropdown();
    // logout function should have been called once
    sinon.assert.calledOnce(spy);
  });

  it('can delete a bid', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ActionsDropdown {...props} toggleBid={spy} />);

    // find the Delete text
    const deleteText = wrapper.find('InteractiveElement[children="Delete"]');
    // click to delete
    deleteText.simulate('click');
    // toggleBid function should have been called once
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ActionsDropdown {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when disableDelete is true', () => {
    const wrapper = shallow(<ActionsDropdown {...props} disableDelete />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showWithdraw is true', () => {
    const wrapper = shallow(<ActionsDropdown {...props} showWithdraw />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showWithdraw and disableWithdraw are true', () => {
    const wrapper = shallow(<ActionsDropdown {...props} showWithdraw disableWithdraw />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleBid: [1, true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
