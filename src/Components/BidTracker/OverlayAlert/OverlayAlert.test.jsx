import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OverlayAlert from './OverlayAlert';
import { APPROVED_PROP, CLOSED_PROP, DECLINED_PROP, DRAFT_PROP,
  HAND_SHAKE_DECLINED_PROP, HAND_SHAKE_NEEDS_REGISTER_PROP, HAND_SHAKE_OFFERED_PROP, IN_PANEL_PROP,
  PANEL_RESCHEDULED_PROP } from '../../../Constants/BidData';
import bidListObject from '../../../__mocks__/bidListObject';

describe('OverlayAlertComponent', () => {
  const props = {
    bid: bidListObject.results[0],
    acceptBid: () => {},
    declineBid: () => {},
    submitBid: () => {},
    deleteBid: () => {},
    registerHandshake: () => {},
    unregisterHandshake: () => {},
  };

  // All possible props, plus  fake prop to test the default case of the switch
  const types = [APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP, DRAFT_PROP,
    HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP, PANEL_RESCHEDULED_PROP, HAND_SHAKE_NEEDS_REGISTER_PROP, 'fake prop'];

  it('is defined', () => {
    const wrapper = shallow(
      <OverlayAlert {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  // Snapshot tests for each bid status type,
  // as well as when the type is not handled within the component's switch.
  types.forEach((type) => {
    it(`matches snapshot when type is "${type}"`, () => {
      const wrapper = shallow(
        <OverlayAlert {...props} bid={{ ...props.bid, status: type }} type={type} />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
