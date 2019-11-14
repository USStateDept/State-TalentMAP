import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Success = ({ client, hideLink }) => (
  !!client && !!client.id && !!client.display_name ?
    <span>Bid successfully added. {!hideLink && <span><Link to={`/profile/public/${client.id}/`}>Go to {`${client.display_name}'s'`} Bid Tracker</Link>.</span>}</span>
    :
    <span>Bid successfully added. {!hideLink && <span><Link to="/profile/bidtracker/">Go to Bid Tracker</Link>.</span>}</span>
);

Success.propTypes = {
  client: PropTypes.shape({}),
  hideLink: PropTypes.bool,
};

Success.defaultProps = {
  client: {},
  hideLink: false,
};

export default Success;
