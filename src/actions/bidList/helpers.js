import { checkFlag } from 'flags';
import { clone, get } from 'lodash';
import { HAND_SHAKE_NEEDS_REGISTER_PROP, HAND_SHAKE_OFFERED_PROP, HAND_SHAKE_OFFER_ACCEPTED_PROP,
  HAND_SHAKE_OFFER_DECLINED_PROP, HAND_SHAKE_REVOKED_PROP, SUBMITTED_PROP } from 'Constants/BidData';

const useHandshakeBidding = () => checkFlag('flags.handshake_bidding');

export const mapBidData = (data = []) => {
  const use = useHandshakeBidding();
  if (!use) {
    return data;
  }

  const hs = 'hs_status_code';
  const bs = 'bidder_hs_code';
  const status = 'status';

  let data$ = clone(data);
  data$ = data$.map(m => {
    const h = get(m, 'handshake') || {};
    // store our overrides
    const override = {};

    // Handshake submitted and handshake offered
    if (h[hs] === HAND_SHAKE_OFFERED_PROP && m[status] === SUBMITTED_PROP) {
      override[status] = HAND_SHAKE_OFFERED_PROP;
    }
    // Handshake submitted and handshake offered
    if (h[hs] === HAND_SHAKE_OFFERED_PROP && m[status] === HAND_SHAKE_NEEDS_REGISTER_PROP) {
      override[status] = HAND_SHAKE_OFFERED_PROP;
    }
    // Handshake accepted, allow bidder to decline
    if (h[bs] === HAND_SHAKE_OFFER_ACCEPTED_PROP && m[status] === SUBMITTED_PROP) {
      override[status] = HAND_SHAKE_OFFERED_PROP;
      // Use a new ACCEPTED status, clone the tracker status of HAND_SHAKE_OFFERED_PROP for
      // this and use a prop to show the offer has already been accepted
    }
    // Handshake accepted, give CDO ability to register
    if (h[bs] === HAND_SHAKE_OFFER_ACCEPTED_PROP && m[status] === HAND_SHAKE_NEEDS_REGISTER_PROP) {
      override[status] = HAND_SHAKE_NEEDS_REGISTER_PROP;
      // Use a new CAN_DECLINE_OR_REGISTER status,
      // clone the tracker status of HAND_SHAKE_OFFERED_PROP for
      // this and use a prop to show the offer has already been accepted, and allow the CDO to
      // decline or register
    }
    // Handshake declined, allow bidder to accept
    if (h[bs] === HAND_SHAKE_OFFER_DECLINED_PROP && m[status] === SUBMITTED_PROP) {
      override[status] = HAND_SHAKE_OFFERED_PROP;
      // Use a new OFFER_DECLINED status, clone the tracker status of HAND_SHAKE_OFFERED_PROP for
      // this and use a prop to show the offer has already been declined,
      // and allow the bidder/CDO to accept
    }
    // Handshake declined, give CDO ability to accept
    if (h[bs] === HAND_SHAKE_OFFER_DECLINED_PROP && m[status] === HAND_SHAKE_NEEDS_REGISTER_PROP) {
      override[status] = HAND_SHAKE_OFFERED_PROP;
      // Use a new OFFER_DECLINED status, clone the tracker status of HAND_SHAKE_OFFERED_PROP for
      // this and use a prop to show the offer has already been declined,
      // and allow the bidder/CDO to accept
    }
    // Handshake revoked
    if (h[hs] === HAND_SHAKE_REVOKED_PROP) {
      // Use a new REVOKED status that will display for bidder and CDO
    }
    return {
      ...m,
      ...override,
    };
  });
  return data$;
};

export default mapBidData;
