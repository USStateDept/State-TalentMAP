import React from 'react';
import PropTypes from 'prop-types';
import PositionInformation from '../../../ProfileDashboard/PositionInformation';
import ItemList from '../ItemList';
import Spinner from '../../../Spinner';

// eslint-disable-next-line
const AdditionalView = ({ client, isLoading }) => (
  <div className="usa-grid-full bidder-portfolio-additional-container">
    {
      isLoading ?
        <Spinner size="big" inverse type="portfolio-additional" />
        :
        <div className="usa-grid-full bidder-portfolio-additional">
          <div className="usa-width-one-third bidder-portfolio-additional-section">
            <PositionInformation assignment={{}} />
          </div>
          <div className="usa-width-two-thirds">
            <div className="usa-width-one-whole bidder-portfolio-additional-section">
              <ItemList title="Waiver History" items={['Waiver 1', 'Waiver 2', 'Waiver 3']} />
            </div>
            <div className="usa-width-one-half bidder-portfolio-additional-section">
              <ItemList title="Draft Bids" items={['Draft Bid 1', 'Draft Bid 2', 'Draft Bid 3']} />
            </div>
            <div className="usa-width-one-half bidder-portfolio-additional-section">
              <ItemList title="Submitted Bids" items={['Submitted Bid 1', 'Submitted Bid 2', 'Submitted Bid 3']} />
            </div>
          </div>
        </div>
    }
  </div>
);

AdditionalView.propTypes = {
  client: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool,
};

AdditionalView.defaultProps = {
  isLoading: false,
};

export default AdditionalView;
