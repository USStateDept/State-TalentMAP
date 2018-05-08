import api from '../api';

export const RECEIVE_BID_CYCLES = 'RECEIVE_BID_CYCLES';

const receiveBidCycles = data => ({
  type: RECEIVE_BID_CYCLES,
  data,
});

export const fetchBidCycles = () => dispatch => (
  api.get('/bidcycle/').then((response) => {
    const items = response.data.results || [];
    dispatch(receiveBidCycles(items));
  })
);

export default fetchBidCycles;
