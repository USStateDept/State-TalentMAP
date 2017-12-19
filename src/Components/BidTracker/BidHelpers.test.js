import {
  APPROVED_PROP,
  CLOSED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  PRE_PANEL_PROP,
  IN_PANEL_PROP,
  SUBMITTED_PROP,
} from '../../Constants/BidData';
import { bidClassesFromCurrentStatus } from './BidHelpers';
import bidListObject from '../../__mocks__/bidListObject';

// Test that the result of each status prop is defined
describe('bidClassesFromCurrentStatus function', () => {
  const statusProps = [
    APPROVED_PROP,
    CLOSED_PROP,
    DRAFT_PROP,
    HAND_SHAKE_ACCEPTED_PROP,
    HAND_SHAKE_OFFERED_PROP,
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
