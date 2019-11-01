import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Success = ({ client }) => (
  !!client && !!client.id && !!client.display_name ?
    <span>Bid successfully added. <Link to={`/profile/public/${client.id}/`}>Go to {`${client.display_name}'s'`} Bid Tracker</Link>.</span>
    :
    <span>Bid successfully added. <Link to="/profile/bidtracker/">Go to Bid Tracker</Link>.</span>
);

Success.propTypes = {
  client: PropTypes.shape({}),
};

Success.defaultProps = {
  client: {},
};


export default Success;
