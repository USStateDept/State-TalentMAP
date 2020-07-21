import React from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import BureauResultsCard from '../BureauResultsCard';

const Stats = (props) => {
  const {
    placeholderText,
  } = props;

  return (
    <div
      className={'usa-grid-full profile-content-inner-container bureau-page'}
    >
      {
        !placeholderText &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Bureau Statistics" icon="bar-chart" />
      </div>
      <div className="usa-grid-full bureau-page">
        {placeholderText}
      </div>
      <div className="usa-grid-full">
        {[1, 2, 3, 4, 5].map((m) => (
          <BureauResultsCard key={m} />
        ))}
      </div>
    </div>
  );
};

Stats.propTypes = {
  placeholderText: PropTypes.string,
};

Stats.defaultProps = {
  placeholderText: '',
};

export default Stats;
