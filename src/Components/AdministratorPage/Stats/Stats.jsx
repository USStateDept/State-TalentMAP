import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { getLoginStats } from '../../../actions/stats';
import BidStatCard from '../../BidStatistics/BidStatCard';

export const formatNum = n => numeral(n).format('0,0');

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  componentWillMount() {
    const { getStats } = this.props;
    getStats();
  }

  render() {
    const {
      stats,
      statsIsLoading,
      statsHasErrored,
    } = this.props;

    const statsSuccess = !statsIsLoading && !statsHasErrored;

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
                <BidStatCard title={m.title} number={formatNum(m.count)} />
              ))}
            </div>
            <div className="usa-grid-full">
              <h3>Unique Logins</h3>
              {stats.filter(f => f.type === 'unique').map(m => (
                <BidStatCard title={m.title} number={formatNum(m.count)} />
              ))}
            </div>
          </div>
        }
      </div>
    );
  }
}

Stats.propTypes = {
  stats: PropTypes.shape({}),
  statsIsLoading: PropTypes.bool,
  statsHasErrored: PropTypes.bool,
  getStats: PropTypes.func,
};

Stats.defaultProps = {
  stats: [],
  statsIsLoading: false,
  statsHasErrored: false,
  getStats: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  stats: state.stats,
  statsIsLoading: state.statsIsLoading,
  statsHasErrored: state.statsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  getStats: (options = {}) => dispatch(getLoginStats({ options })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
