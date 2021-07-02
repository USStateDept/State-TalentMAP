import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEqual } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import Alert from 'Components/Alert';
import { NO_SUBMIT_DATE } from 'Constants/SystemMessages';
import { fetchBidderRankings } from 'actions/bureauPositionBids';
import { formatDate, getCustomLocation } from 'utilities';
import Spinner from '../../Spinner';

const BidderRankings = ({ perdet, cp_id, is_dragging, is_mouse_down, mouse_down_emp }) => {
  const bidderRankingData = useSelector(state => state.bidderRankingFetchDataSuccess);
  const bidderRankingData$ = get(bidderRankingData, perdet) || {};
  const bidderRankingDataIsLoading = useSelector(state => state.bidderRankingsIsLoading);
  const bidderRankingDataIsLoading$ = bidderRankingDataIsLoading.has(perdet);
  const bidderRankingDataHasErrored = useSelector(state => state.bidderRankingsHasErrored);
  const bidderRankingDataHasErrored$ = bidderRankingDataHasErrored.has(perdet);

  const [showRankingData, setShowRankingData] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  // Actions
  const dispatch = useDispatch();

  const positionTableHeaders = [
    'Rank',
    'Position',
    'Location',
    'Skill',
    'Grade',
    'Bid Cycle',
    'Submitted Date',
  ];

  const showTable = !bidderRankingDataIsLoading$ &&
    !bidderRankingDataHasErrored$ && bidderRankingData$.results;

  function toggleRankingData() {
    setShowRankingData(!showRankingData);
  }

  useEffect(() => {
    if (showRankingData && !isFetched) {
      dispatch(fetchBidderRankings(perdet, cp_id));
      setIsFetched(true);
    }
  }, [showRankingData]);

  useEffect(() => {
    if (isEqual(mouse_down_emp, perdet)) {
      if (is_dragging && is_mouse_down) {
        setShowRankingData(false);
      }
    }
  }, [is_dragging, is_mouse_down]);

  return (
    <div className={'bidder-rankings'} >
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
              bidderRankingDataIsLoading$ &&
                <Spinner type="bidder-rankings-table" size="small" />
            }
            {
              bidderRankingDataHasErrored$ &&
              <Alert type="error" title="Error retrieving Short List bids" />
            }
            {
              showTable &&
                <table className={'bidder-rankings-table'}>
                  <thead>
                    <tr className={'table-headers'}>
                      {
                        positionTableHeaders.map(item => (
                          <th key={item} className="ab-headers" scope="col" >
                            {item}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !bidderRankingData$.results.length ?
                        <tr><td>No other bids added to Short Lists</td></tr>
                        :
                        bidderRankingData$.results.map(pos => (
                          <tr>
                            <td>{pos.ranking + 1}</td>
                            <td>
                              {
                                get(pos, 'position_info.id') && get(pos, 'position_info.position.title') ?
                                  <Link to={`/profile/bureau/positionmanager/available/${pos.position_info.id}`}>{pos.position_info.position.title}</Link>
                                  : 'N/A'
                              }
                            </td>
                            <td>
                              {getCustomLocation(
                                get(pos,
                                  'position_info.position.post.location'),
                                get(pos,
                                  'position_info.position.organization'),
                              )}
                            </td>
                            <td>{get(pos, 'position_info.position.skill') || 'N/A'}</td>
                            <td>{get(pos, 'position_info.position.grade') || 'N/A'}</td>
                            <td>{get(pos, 'position_info.bidcycle.name') || 'N/A'}</td>
                            {/* eslint-disable-next-line max-len */}
                            <td>{pos.submitted_date ? formatDate(pos.submitted_date) : NO_SUBMIT_DATE}</td>
                          </tr>
                        ))
                    }
                    <tr className="other-sl-count-row">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Number of bids in other Bureau's Short Lists: {bidderRankingData$['other-sl-bidcount']}
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
  is_dragging: PropTypes.bool,
  is_mouse_down: PropTypes.bool,
  mouse_down_emp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

BidderRankings.defaultProps = {
  is_dragging: false,
  is_mouse_down: false,
  mouse_down_emp: '',
};

export default BidderRankings;
