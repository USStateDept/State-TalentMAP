import React from 'react';
import { Sticky } from 'react-sticky';
import ClientHeader from './ClientHeader';


export const ClientHeaderSticky = props => (
  <Sticky topOffset={200} disableCompensation={false}>
    {({ style }) => (
      <ClientHeader {...props} style={style} />
    )}
  </Sticky>
);

export default ClientHeaderSticky;
