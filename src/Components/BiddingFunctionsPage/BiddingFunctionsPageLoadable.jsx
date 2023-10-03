import createLoader from '../Loadable';

export const path = () => import('./BiddingFunctionsPage');

const BiddingFunctionsPage = createLoader({ path, shouldPreload: false });

const BiddingFunctionsPageLoadable = ({ ...rest }) => (
  <BiddingFunctionsPage {...rest} />
);

export default BiddingFunctionsPageLoadable;
