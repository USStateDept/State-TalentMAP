import createLoader from '../../Components/Loadable';

export const path = () => import('./BidCycles');

const BidCycles = createLoader({ path, shouldPreload: false, usePlaceholder: false });

const BidCyclesLoadable = ({ ...rest }) => (
  <BidCycles {...rest} />
);

export default BidCyclesLoadable;
