import React from 'react';
import Sticky from 'react-sticky-el';
import ClientHeader from './ClientHeader';

export const CONTAINER_ID = 'sticky-container-client-header';

const ClientHeaderSticky = () => (
  <div id={CONTAINER_ID} className="client-header-sticky-container">
    <Sticky topOffset={0} hideOnBoundaryHit={false}>
      <ClientHeader />
    </Sticky>
  </div>
);

export default ClientHeaderSticky;
