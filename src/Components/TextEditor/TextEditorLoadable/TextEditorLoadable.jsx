import React from 'react';
import createLoader from '../../Loadable';

export const path = () => import('../TextEditor');

const TextEditor = createLoader({ path });

const TextEditorLoadable = ({ ...rest }) => (
  <TextEditor {...rest} />
);

export default TextEditorLoadable;
