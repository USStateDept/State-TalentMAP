import createLoader from '../Loadable';

export const path = () => import('./PostPage');

const PostPage = createLoader({ path, shouldPreload: false });

const PostPageLoadable = ({ ...rest }) => (
  <PostPage {...rest} />
);

export default PostPageLoadable;
