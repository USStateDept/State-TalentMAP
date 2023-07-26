import createLoader from '../Loadable';

export const path = () => import('./AoPage');

const AoPage = createLoader({ path, shouldPreload: false });

const AoPageLoadable = ({ ...rest }) => (
  <AoPage {...rest} />
);

export default AoPageLoadable;
