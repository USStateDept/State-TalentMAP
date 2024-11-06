import createLoader from '../Loadable/Loader/Loader';

export const path = () => import('./EntryLevelPage');

const EntryLevelPage = createLoader({ path, shouldPreload: false });
const EntryLevelPageLoadable = ({ ...rest }) => (
  <EntryLevelPage {...rest} />
);

export default EntryLevelPageLoadable;
