import createLoader from 'Components/Loadable';

export const path = () => import('./FeatureFlags');

const FeatureFlags = createLoader({ path });

const FeatureFlagsLoadable = ({ ...rest }) => (
  <FeatureFlags {...rest} />
);

export default FeatureFlagsLoadable;
