import { shallow } from 'enzyme';
import React from 'react';
import PositionDetails from './PositionDetails';
import detailsObject from '../../__mocks__/detailsObject';
import goBackLink from '../../__mocks__/goBackLink';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBackLink={goBackLink}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionDetails
        details={detailsObject}
        isLoading
        hasErrored={false}
        goBackLink={goBackLink}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
