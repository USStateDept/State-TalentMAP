import React from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

const PositionManager = (props) => {
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
        <ProfileSectionTitle title="Positions Manager" icon="map" />
      </div>
      <div className="usa-grid-full bureau-page">
        {placeholderText}
      </div>
    </div>
  );
};

PositionManager.propTypes = {
  placeholderText: PropTypes.string,
};

PositionManager.defaultProps = {
  placeholderText: '',
};

export default PositionManager;
