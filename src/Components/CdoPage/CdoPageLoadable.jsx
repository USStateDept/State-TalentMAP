import createLoader from '../Loadable';

export const path = () => import('./CdoPage');

const CdoPage = createLoader({ path, shouldPreload: false });

const CdoPageLoadable = ({ ...rest }) => (
  <CdoPage {...rest} />
);

export default CdoPageLoadable;
