import React from 'react';
import Loadable from 'react-loadable';
import LoadingWrapper from '../LoadingWrapper';

// Create a loader with a config object.
// In most cases, the path, passed as a function, should be enough.
// Example: { path: () => System.import('../TextEditorLogic'), ...other props }
// This path should be relative to the source component, not this file.
// Then to set a component as loadable, it's simple as doing the following:
// const TextEditorLoadable = createLoader({path: () => System.import('../TextEditor')});
const createLoader = ({ path, delay = 500, shouldPreload = true, timeout = 3000, size = 'small' }) => {
  const Loader = Loadable({
    loader: path,
    loading: props => <LoadingWrapper {...props} size={size} />,
    delay,
  });

  if (shouldPreload) {
    setTimeout(() => {
      Loader.preload();
    }, timeout);
  }

  return Loader;
};

export default createLoader;
