import createLoader from '../../../Loadable';

export const path = () => import('./EmployeeProfileLink');

const Loadable = createLoader({ path, shouldPreload: false, usePlaceholder: false });

const EPLLoadable = ({ ...rest }) => (
  <Loadable {...rest} />
);

export default EPLLoadable;
