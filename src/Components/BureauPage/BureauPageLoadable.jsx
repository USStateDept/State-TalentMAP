import React from 'react';
import createLoader from '../Loadable';

export const path = () => import('./BureauPage');

const BureauPage = createLoader({ path, shouldPreload: false });

const BureauPageLoadable = ({ ...rest }) => (
  <BureauPage {...rest} />
);

export default BureauPageLoadable;
