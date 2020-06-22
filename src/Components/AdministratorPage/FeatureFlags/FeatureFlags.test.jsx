// jest.mock('./jsoneditor-react')

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import FeatureFlags from './FeatureFlags';

// jest.mock('./jsoneditor')
// jest.mock('./FeatureFlags')
// sinon.jest.mock('./jsoneditor-react')
// jest.mock('./jsoneditor-react')

describe('FeatureFlags', () => {
  it('is defined', () => {
    const wrapper = shallow(<FeatureFlags />);
    expect(wrapper).toBeDefined();
  });

  it('calls postData on this.submitData()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<FeatureFlags postData={spy} />);
    wrapper.instance().submitData();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<FeatureFlags />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
