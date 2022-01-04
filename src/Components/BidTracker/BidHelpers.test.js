import {
  APPROVED_PROP,
  CLOSED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  IN_PANEL_PROP,
  PRE_PANEL_PROP,
  SUBMITTED_PROP,
} from '../../Constants/BidData';
import {
  bidClassesFromCurrentStatus,
  getActionPermissions,
  shouldShowAlert,
  showHandshakeRegsiterWithAnotherBidderOverlay,
} from './BidHelpers';
import bidListObject from '../../__mocks__/bidListObject';

// Test that the result of each status prop is defined
describe('bidClassesFromCurrentStatus function', () => {
  const statusProps = [
    APPROVED_PROP,
    CLOSED_PROP,
    DRAFT_PROP,
    HAND_SHAKE_ACCEPTED_PROP,
    HAND_SHAKE_DECLINED_PROP,
    PRE_PANEL_PROP,
    IN_PANEL_PROP,
    SUBMITTED_PROP,
  ];
  statusProps.forEach((status) => {
    it(`is defined when status equals "${status}"`, () => {
      const result = bidClassesFromCurrentStatus({ ...bidListObject.results[0], status });
      expect(result).toBeDefined();
    });
  });

  it('is defined if no object is provided as a parameter', () => {
    const result = bidClassesFromCurrentStatus();
    expect(result).toBeDefined();
  });

  it('is false when an invalid status is provided', () => {
    const result = bidClassesFromCurrentStatus({ ...bidListObject.results[0], status: 'fake status' });
    expect(result).toBe(false);
  });
});

describe('shouldShowAlert function', () => {
  it('returns true for a valid status', () => {
    const result = shouldShowAlert({ status: DRAFT_PROP }, {});
    expect(result).toBe(true);
  });

  xit('returns false for an invalid status but when is_paneling_today === true', () => {
    const result = shouldShowAlert(
      { status: PRE_PANEL_PROP, is_paneling_today: true },
      {},
    );
    expect(result).toBe(false);
  });

  it('returns false for a invalid status', () => {
    const result = shouldShowAlert({ status: IN_PANEL_PROP }, {});
    expect(result).toBe(false);
  });

  it('returns false for specific statuses when condensedView is true', () => {
    expect(shouldShowAlert({ status: APPROVED_PROP }, { condensedView: true })).toBe(false);
  });
});

describe('getActionPermissions function', () => {
  it('returns defined for different statuses', () => {
    expect(getActionPermissions(DRAFT_PROP)).toBeDefined();
    expect(getActionPermissions(SUBMITTED_PROP)).toBeDefined();
    expect(getActionPermissions(HAND_SHAKE_OFFERED_PROP)).toBeDefined();
    expect(getActionPermissions(HAND_SHAKE_ACCEPTED_PROP)).toBeDefined();
    expect(getActionPermissions(PRE_PANEL_PROP)).toBeDefined();
  });

  it('returns the correct permissions for an invalid status', () => {
    const permissions = getActionPermissions('fake_status');
    expect(permissions.showDelete).toBe(false);
    expect(permissions.disableDelete).toBe(false);
    expect(permissions.showWithdraw).toBe(true);
    expect(permissions.disableWithdraw).toBe(true);
  });
});

describe('showHandshakeRegsiterWithAnotherBidderOverlay function', () => {
  it('returns true for a valid status', () => {
    const result = showHandshakeRegsiterWithAnotherBidderOverlay({ status: SUBMITTED_PROP }, {});
    expect(result).toBe(true);
  });

  it('returns false for a invalid status', () => {
    const result = showHandshakeRegsiterWithAnotherBidderOverlay({ status: DRAFT_PROP }, {});
    expect(result).toBe(false);
  });
});
