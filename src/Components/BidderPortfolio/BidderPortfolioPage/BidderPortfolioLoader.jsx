import createLoader from '../../Loadable';

export const path = () => import('./BidderPortfolioPage');

const BidderPortfolio = createLoader({ path, shouldPreload: false });

const BidderPortfolioLoadable = ({ ...rest }) => (
  <BidderPortfolio {...rest} />
);

export default BidderPortfolioLoadable;
