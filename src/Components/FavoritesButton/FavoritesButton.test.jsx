import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import FavoritesButton from './FavoritesButton';

describe('FavoriteButton', () => {
  const refKey = 36;

  it('is defined', () => {
    const favoritesButton = TestUtils.renderIntoDocument(
      <FavoritesButton
        compareArray={[]}
        refKey={refKey}
        onToggle={() => {}}
      />);
    expect(favoritesButton).toBeDefined();
  });

  it('handles being in the enabled state', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritesButton onToggle={spy} compareArray={[{ id: refKey }]} refKey={refKey} />);
    expect(wrapper.find('.usa-button-secondary')).toBeDefined();
  });

  it('can call the onToggle function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<FavoritesButton onToggle={spy} compareArray={[]} refKey={refKey} />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritesButton onToggle={() => {}} compareArray={[]} refKey={refKey} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
