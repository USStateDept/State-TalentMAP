import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { POSITION_DETAILS } from 'Constants/PropTypes';

const Success = ({ pos, client, hideLink }) => (
  !!client && !!client.perdet_seq_number ?
    <span>{pos.title} ({pos.position_number}) has been successfully added to Bid List. {!hideLink && <span><Link to={`/profile/bidtracker/public/${client.perdet_seq_number}/`}>Go to {`${client.name}'s'`} Bid Tracker</Link>.</span>}</span>
    :
    <span>{pos.title} ({pos.position_number}) has been successfully added to Bid List. {!hideLink && <span><Link to="/profile/bidtracker/">Go to Bid Tracker</Link>.</span>}</span>
);

Success.propTypes = {
  pos: POSITION_DETAILS.isRequired,
  client: PropTypes.shape({}),
  hideLink: PropTypes.bool,
};

Success.defaultProps = {
  client: {},
  hideLink: false,
};

export default Success;
