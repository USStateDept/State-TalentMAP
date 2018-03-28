import api from '../api';

export const RECEIVE_BID_CYCLES = 'RECEIVE_BID_CYCLES';

const recieveBidCycles = data => ({
  type: RECEIVE_BID_CYCLES,
  data,
});

export const fetchBidCycles = () => dispatch => (
  api.get('/bidcycle/').then((response) => {
    const items = response.data.results || [];
    dispatch(recieveBidCycles(items));
  })
);

export default fetchBidCycles;
