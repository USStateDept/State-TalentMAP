import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidStatus from './BidStatus';
import { APPROVED, CLOSED, DRAFT, DECLINED, HAND_SHAKE_ACCEPTED, HAND_SHAKE_OFFERED,
HAND_SHAKE_DECLINED, IN_PANEL, SUBMITTED } from '../../../Constants/BidStatuses';

describe('BidStatusComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidStatus
        status={APPROVED.property}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot for APPROVED', () => {
    const wrapper = shallow(
      <BidStatus
        status={APPROVED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for CLOSED', () => {
    const wrapper = shallow(
      <BidStatus
        status={CLOSED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for DRAFT', () => {
    const wrapper = shallow(
      <BidStatus
        status={DRAFT.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for DECLINED', () => {
    const wrapper = shallow(
      <BidStatus
        status={DECLINED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for HAND_SHAKE_ACCEPTED', () => {
    const wrapper = shallow(
      <BidStatus
        status={HAND_SHAKE_ACCEPTED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for HAND_SHAKE_OFFERED', () => {
    const wrapper = shallow(
      <BidStatus
        status={HAND_SHAKE_OFFERED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for HAND_SHAKE_DECLINED', () => {
    const wrapper = shallow(
      <BidStatus
        status={HAND_SHAKE_DECLINED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for IN_PANEL', () => {
    const wrapper = shallow(
      <BidStatus
        status={IN_PANEL.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for SUBMITTED', () => {
    const wrapper = shallow(
      <BidStatus
        status={SUBMITTED.property}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot for other statuses', () => {
    const wrapper = shallow(
      <BidStatus
        status="other"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
