import React from 'react';
import createLoader from '../../Loadable';

const TextEditorLoadable = createLoader({
  path: () => System.import('../TextEditorLogic'),
});

const TextEditor = ({ ...rest }) => (
  <TextEditorLoadable {...rest} />
);

export default TextEditor;
