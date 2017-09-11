import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PositionsSectionTitleViewMore = ({ viewMoreLink }) => (
  <div className="positions-section-view-more">
    <Link to={viewMoreLink}>View More <FontAwesome name="angle-right" /></Link>
  </div>
);

PositionsSectionTitleViewMore.propTypes = {
  viewMoreLink: PropTypes.string.isRequired,
};

PositionsSectionTitleViewMore.defaultProps = {
  viewMoreLink: '', // we want to require a link, but still need to instantiate a value in order to render
};

export default PositionsSectionTitleViewMore;
