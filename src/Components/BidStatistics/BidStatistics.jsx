import React from 'react';
import PropTypes from 'prop-types';
import { BID_STATISTICS_OBJECT } from '../../Constants/PropTypes';
import BidStatList from './BidStatList';
import Spinner from '../Spinner';

const BidStatistics = ({ bidStats, isLoading }) => (
  <div className="section-padded-inner-container bid-stats-page">
    {
      isLoading ?
        <Spinner type="homepage-position-results" size="big" />
        :
        <BidStatList bidStats={bidStats} />
    }
  </div>
);

BidStatistics.propTypes = {
  bidStats: BID_STATISTICS_OBJECT.isRequired,
  isLoading: PropTypes.bool,
};

BidStatistics.defaultProps = {
  isLoading: false,
};

export default BidStatistics;
