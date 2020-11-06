import { BIDDER_RESULTS, CLASSIFICATIONS } from '../../../Constants/PropTypes';
import BidderPortfolioStatCard from '../BidderPortfolioStatCard';

const BidderPortfolioCardList = ({ results, classifications }) => (
  <div className="usa-grid-full user-dashboard bidder-portfolio-stat-card-list">
    {
      results.map(result => (
        <div className="bidder-portfolio-stat-card-container" key={result.id}>
          <BidderPortfolioStatCard
            userProfile={result}
            classifications={classifications}
          />
        </div>
      ))
    }
  </div>
);

BidderPortfolioCardList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
  classifications: CLASSIFICATIONS,
};


BidderPortfolioCardList.defaultProps = {
  classifications: [],
};

export default BidderPortfolioCardList;
