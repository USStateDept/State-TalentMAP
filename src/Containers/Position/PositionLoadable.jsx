import createLoader from '../../Components/Loadable';

export const path = () => import('./Position');

const Position = createLoader({ path, timeout: 2000, placeholder: <div style={{ height: '60vh' }} /> });

const PositionLoadable = ({ ...rest }) => (
  <Position {...rest} />
);

export default PositionLoadable;
