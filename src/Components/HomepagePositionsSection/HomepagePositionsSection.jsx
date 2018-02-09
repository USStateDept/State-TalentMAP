import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
};

const defaultProps = {
  icon: 'star',
  viewMoreLink: '/results',
};

const HomePagePositionsSection = ({ title, icon, viewMoreLink }) => (
  <div className="usa-grid-full positions-section">
    <PositionsSectionTitle
      title={
        <span className="positions-section-title">
          <FontAwesome name={icon} />
          {title}
        </span>
      }
      viewMoreLink={viewMoreLink}
    />
  </div>
);

HomePagePositionsSection.propTypes = propTypes;

HomePagePositionsSection.defaultProps = defaultProps;

export default HomePagePositionsSection;
