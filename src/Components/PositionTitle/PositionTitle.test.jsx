import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionTitle from './PositionTitle';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionTitleComponent', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can click the back link', () => {
    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    wrapper.find('[role="link"]').simulate('click');
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
