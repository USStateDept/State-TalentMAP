import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkButton from '../../LinkButton';

const BidderPortfolioViewMore = ({ className, useLink }) => {
  const text = 'View More';
  const link = '/profile/dashboard/';
  return (
    <div>
      {
      useLink ?
        <div className="view-more-link-centered">
          <Link to={link}>
            {text}
          </Link>
        </div>
        :
        <div
          className={`usa-grid-full current-user-section-container
          view-more-link-centered section-padded-inner-container-narrow`}
        >
          <LinkButton toLink={link} className={className}>
            {text}
          </LinkButton>
        </div>
    }
    </div>
  );
};

BidderPortfolioViewMore.propTypes = {
  className: PropTypes.string,
  useLink: PropTypes.bool,
};

BidderPortfolioViewMore.defaultProps = {
  className: 'unstyled-button',
  useLink: false,
};

export default BidderPortfolioViewMore;
