import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import OrganizationStamp from './OrganizationStamp';

describe('OrganizationStampComponent', () => {
  it('is defined when showMail is true', () => {
    const wrapper = shallow(
      <OrganizationStamp name="African Affairs" abbreviation="AF" showMail />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when showMail is false', () => {
    const wrapper = shallow(
      <OrganizationStamp name="African Affairs" abbreviation="AF" showMail={false} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when showMail is true', () => {
    const wrapper = shallow(
      <OrganizationStamp name="African Affairs" abbreviation="AF" showMail />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showMail is false', () => {
    const wrapper = shallow(
      <OrganizationStamp name="African Affairs" abbreviation="AF" showMail={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
