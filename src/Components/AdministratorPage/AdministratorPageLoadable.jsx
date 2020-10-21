import createLoader from '../Loadable';

export const path = () => import('./AdministratorPage');

const AdministratorPage = createLoader({ path, shouldPreload: false });

const AdministratorPageLoadable = ({ ...rest }) => (
  <AdministratorPage {...rest} />
);

export default AdministratorPageLoadable;
