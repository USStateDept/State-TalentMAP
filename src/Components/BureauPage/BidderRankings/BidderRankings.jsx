import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { fetchBidderRankings } from 'actions/bureauPositionBids';
import Spinner from '../../Spinner';

const BidderRankings = ({ perdet }) => {
  const [showRankingData, setShowRankingData] = useState(false);
  const [rankingData, setRankingData] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const bidderRankingData = useSelector(state => state.bureauBidderRankings);
  const bidderRankingDataIsLoading = useSelector(state => state.bureauBidderRankingsIsLoading);
  // eslint-disable-next-line no-unused-vars
  const bidderRankingDataHasErrored = useSelector(state => state.bureauBidderRankingsHasErrored);


  // Actions
  const dispatch = useDispatch();

  function toggleRankingData() {
    setShowRankingData(!showRankingData);
  }

  useEffect(() => {
    if (showRankingData && isEmpty(rankingData)) {
      dispatch(fetchBidderRankings(perdet));
      setRankingData([':)']);
    }
  }, [showRankingData]);

  return (
    <div
      className={'bidder-rankings'}
    >
      <div className={'bidder-rankings-toggle'} >
        <InteractiveElement onClick={toggleRankingData}>
          View Bidder Ranking Data
          <FA name={showRankingData ? 'chevron-down' : 'chevron-right'} />
        </InteractiveElement>
      </div>
      {
        showRankingData &&
          <div className={'bidder-rankings-table-container'}>
            {
              bidderRankingDataIsLoading ?
                <Spinner type="bidder-rankings-table" size="small" />
                :
                <div>im hidden content</div>
            }
          </div>
      }
    </div>
  );
};

BidderRankings.propTypes = {
  perdet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default BidderRankings;
