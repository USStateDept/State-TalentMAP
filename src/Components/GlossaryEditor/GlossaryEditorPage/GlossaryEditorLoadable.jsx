import createLoader from '../../Loadable';

export const path = () => import('./GlossaryEditorPage');

const GlossaryEditorPage = createLoader({ path, shouldPreload: false });

const GlossaryEditorPageLoadable = ({ ...rest }) => (
  <GlossaryEditorPage {...rest} />
);

export default GlossaryEditorPageLoadable;
