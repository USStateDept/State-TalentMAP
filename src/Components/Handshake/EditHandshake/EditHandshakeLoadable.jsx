import createLoader from 'Components/Loadable';

export const path = () => import('./EditHandshake');

const EditHandshake = createLoader({ path, delay: 500, shouldPreload: true });

const EditHandshakeLoadable = ({ ...rest }) => (
  <EditHandshake {...rest} />
);

export default EditHandshakeLoadable;
