import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => (
  <span>Bid successfully added. <Link to="/profile/bidtracker/">Go to Bid Tracker</Link>.</span>
);

export default Success;
