import Q from 'q';
import { get, identity, keyBy, merge, pickBy, values } from 'lodash';
import api from '../api';

export const RECEIVE_BID_CYCLES = 'RECEIVE_BID_CYCLES';

const receiveBidCycles = data => ({
  type: RECEIVE_BID_CYCLES,
  data,
});

export const fetchBidCycles = () => dispatch => {
  const ep = ['/fsbid/reference/cycles/', '/bidhandshakecycle/'];
  const queryProms = ep.map(url =>
    api().get(url)
      .then((r) => r)
      .catch((e) => e),
  );
  // execute queries
  Q.allSettled(queryProms)
    .then((results) => {
      let results$ =
        results
          .filter(r => r.state === 'fulfilled' && r.value)
          .map(m => get(m, 'value.data.results') || m.value.data || []);
      results$ = results$
        .map((a, i) =>
          a
            .map(m => ({ ...m, _id: i === 1 ? get(m, 'id') : null }))
            .map((m => ({ ...m, id: m.cycle_id ? `${m.cycle_id}` : `${m.id}` }))),
        );
      results$ = values(merge(keyBy(results$[1], 'id'), keyBy(results$[0].map(m => pickBy(m, identity)), 'id')));
      dispatch(receiveBidCycles(results$));
    });
};

export default fetchBidCycles;
