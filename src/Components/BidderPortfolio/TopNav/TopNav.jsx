import { BIDDER_PORTFOLIO_COUNTS } from '../../../Constants/PropTypes';
import Navigation from './Navigation';

const TopNav = ({ bidderPortfolioCounts }) => (
  <div className="usa-grid-full portfolio-top-nav-container">
    <div className="usa-width-one-whole">
      <Navigation counts={bidderPortfolioCounts} />
    </div>
  </div>
);

TopNav.propTypes = {
  bidderPortfolioCounts: BIDDER_PORTFOLIO_COUNTS.isRequired,
};

export default TopNav;
