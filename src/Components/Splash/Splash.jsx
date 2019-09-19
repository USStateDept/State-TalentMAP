import React from 'react';
import Spinner from '../Spinner';

const StatusCircle = () => (
  <div className="usa-grid-full" style={{ padding: '3em' }}>
    <h1 style={{ textAlign: 'center', fontSize: 28 }}>Loading TalentMAP...</h1>
    <Spinner style={{ paddingLeft: 5 }} size="small" />
  </div>
);

export default StatusCircle;
