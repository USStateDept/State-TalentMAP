import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { NO_SUBMIT_DATE } from 'Constants/SystemMessages';
import { fetchBidderRankings } from 'actions/bureauPositionBids';
import { formatDate } from 'utilities';
import Spinner from '../../Spinner';

const BidderRankings = ({ perdet, cp_id }) => {
  const [showRankingData, setShowRankingData] = useState(false);
  const bidderRankingData = useSelector(state => state.bureauBidderRankings);
  const bidderRankingData$ = get(bidderRankingData, perdet) || {};
  const bidderRankingDataIsLoading = useSelector(state => state.bureauBidderRankingsIsLoading);
  const bidderRankingDataIsLoading$ = bidderRankingDataIsLoading.has(perdet);
  // eslint-disable-next-line no-unused-vars
  const bidderRankingDataHasErrored = useSelector(state => state.bureauBidderRankingsHasErrored);


  // Actions
  const dispatch = useDispatch();

  const positionTableHeaders = [
    'Rank',
    'Position',
    'Post',
    'Skill',
    'Grade',
    'Bid Cycle',
    'Submitted Date',
  ];

  function toggleRankingData() {
    setShowRankingData(!showRankingData);
  }

  useEffect(() => {
    if (showRankingData && isEmpty(bidderRankingData$)) {
      dispatch(fetchBidderRankings(perdet, cp_id));
    }
  }, [showRankingData]);

  return (
    <div className={'bidder-rankings'} >
      <div className={'bidder-rankings-toggle'} >
        <InteractiveElement onClick={toggleRankingData}>
          View Bidder Ranking Data
          <FA name={showRankingData ? 'chevron-down' : 'chevron-right'} />
          {cp_id}
        </InteractiveElement>
      </div>
      {
        showRankingData &&
          <div className={'bidder-rankings-table-container'}>
            {
              bidderRankingDataIsLoading$ &&
                <Spinner type="bidder-rankings-table" size="small" />
            }
            {
              !bidderRankingDataIsLoading$ && bidderRankingData$.results &&
                <table className={'bidder-rankings-table'}>
                  <thead>
                    <tr className={'table-headers'}>
                      {
                        positionTableHeaders.map(item => (
                          <th
                            key={item}
                            className="ab-headers"
                            scope="col"
                          >
                            {item}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bidderRankingData$.results.map(pos => (
                        <tr>
                          <td>{pos.ranking + 1}</td>
                          <td><Link to={`/profile/bureau/positionmanager/available/${pos.position.id}`}>{pos.position.title}</Link></td>
                          <td>{pos.position.post.location.country}</td>
                          <td>{pos.position.skill}</td>
                          <td>{pos.position.grade}</td>
                          <td>{pos.bidcycle}</td>
                          {/* eslint-disable-next-line max-len */}
                          <td>{pos.submitted_date ? formatDate(pos.submitted_date) : NO_SUBMIT_DATE}</td>
                        </tr>
                      ))
                    }
                    <tr className="other-sl-count-row">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Number of Bids in other Bureau's ShortLists: {bidderRankingData$['other-sl-bidcount']}
                    </tr>
                  </tbody>
                </table>
            }
          </div>
      }
    </div>
  );
};

BidderRankings.propTypes = {
  perdet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cp_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default BidderRankings;
