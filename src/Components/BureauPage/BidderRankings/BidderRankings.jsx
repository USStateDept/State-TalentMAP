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

  const positionTableHeaders = [
    'Rank',
    'Position',
    'Post',
    'Skill',
    'Grade',
    'Bid Cycle',
    'Date of Submission',
  ];

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
              bidderRankingDataIsLoading &&
              <Spinner type="bidder-rankings-table" size="small" />
            }
            {
              !bidderRankingDataIsLoading && bidderRankingData.results &&
                <div>
                  <table className={'candidate-manager-table'}>
                    <thead>
                      <tr className={'bidder-information'}>
                        <th>SPECIAL AGENT</th>
                        <th>Js current post</th>
                        <th>EXECUTIVE (CAREER) (0020)</th>
                        <th>00</th>
                        <th />
                        <th />
                        <th />
                      </tr>
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
                        bidderRankingData.results.map(pos => (
                          <tr>
                            <td>{pos.ranking || 'unranked'}</td>
                            <td>{pos.position.title}</td>
                            <td>{pos.position.post.location.country}</td>
                            <td>{pos.position.skill}</td>
                            <td>{pos.position.grade}</td>
                            <td>{pos.bidcycle}</td>
                            <td>{pos.submitted_date}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
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
