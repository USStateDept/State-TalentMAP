import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {
  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,
} from 'recharts';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { getLoginStats, getLoginStatsIntervals } from '../../../actions/stats';
import BidStatCard from '../../BidStatistics/BidStatCard';

export const formatNum = n => numeral(n).format('0,0');

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  UNSAFE_componentWillMount() {
    const { getStats, getStatsIntervals } = this.props;
    getStats();
    getStatsIntervals();
  }

  render() {
    const {
      stats,
      statsIsLoading,
      statsHasErrored,
      statsIntervals,
      statsIntervalsIsLoading,
      statsIntervalsHasErrored,
    } = this.props;

    const statsSuccess = !statsIsLoading && !statsHasErrored &&
      !statsIntervalsIsLoading && !statsIntervalsHasErrored;

    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(statsIsLoading) ? 'results-loading' : ''}`}
      >
        {
          statsIsLoading && !statsHasErrored &&
            <Spinner type="homepage-position-results" size="big" />
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Login Statistics" icon="sitemap" />
        </div>
        {
          statsSuccess &&
          <div className="usa-grid-full bid-stat-card-list">
            <div className="usa-grid-full">
              <h3>Total Logins</h3>
              {stats.filter(f => f.type === 'total').map(m => (
                <BidStatCard key={m.title} title={m.title} number={formatNum(m.count)} />
              ))}
            </div>
            <div className="usa-grid-full">
              <h3>Unique Logins</h3>
              {stats.filter(f => f.type === 'unique').map(m => (
                <BidStatCard key={m.title} title={m.title} number={formatNum(m.count)} />
              ))}
            </div>
          </div>
        }
        {
          statsSuccess &&
          <div className="usa-grid-full bid-stat-card-list">
            <div className="usa-grid-full">
              <div className="usa-grid-full">
                <h3>Monthly Total Logins</h3>
                <LineChart
                  width={800}
                  height={300}
                  data={statsIntervals.filter(f => f.type === 'total')}
                  margin={{
                    top: 5, right: 30, left: 0, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#2A88C7" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
              <div className="usa-grid-full">
                <h3>Monthly Unique Logins</h3>
                <LineChart
                  width={800}
                  height={300}
                  data={statsIntervals.filter(f => f.type === 'unique')}
                  margin={{
                    top: 5, right: 30, left: 0, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#2A88C7" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({})),
  statsIsLoading: PropTypes.bool,
  statsHasErrored: PropTypes.bool,
  getStats: PropTypes.func,
  statsIntervals: PropTypes.arrayOf(PropTypes.shape({})),
  statsIntervalsIsLoading: PropTypes.bool,
  statsIntervalsHasErrored: PropTypes.bool,
  getStatsIntervals: PropTypes.func,
};

Stats.defaultProps = {
  stats: [],
  statsIsLoading: false,
  statsHasErrored: false,
  getStats: EMPTY_FUNCTION,
  statsIntervals: [],
  statsIntervalsIsLoading: false,
  statsIntervalsHasErrored: false,
  getStatsIntervals: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  stats: state.stats,
  statsIsLoading: state.statsIsLoading,
  statsHasErrored: state.statsHasErrored,
  statsIntervals: state.statsIntervals,
  statsIntervalsIsLoading: state.statsIntervalsIsLoading,
  statsIntervalsHasErrored: state.statsIntervalsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  getStats: () => dispatch(getLoginStats()),
  getStatsIntervals: () => dispatch(getLoginStatsIntervals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
