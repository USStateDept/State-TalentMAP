import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const Success = ({ pos, client, hideLink, T_S }) => (
  !!client && !!client.perdet_seq_number ?
    <span>{pos.title} Bid ({pos.position_number}) successfully :) {T_S} added. {!hideLink && <span><Link to={`/profile/bidtracker/public/${client.perdet_seq_number}/`}>Go to {`${client.name}'s'`} Bid Tracker</Link>.</span>}</span>
    :
    <span>{pos.title} Bid ({pos.position_number}) ssuccessfully :) {T_S} added. {!hideLink && <span><Link to="/profile/bidtracker/">Go to Bid Tracker</Link>.</span>}</span>
);

Success.propTypes = {
  pos: POSITION_DETAILS.isRequired,
  client: PropTypes.shape({}),
  hideLink: PropTypes.bool,
  T_S: PropTypes.string,
};

Success.defaultProps = {
  client: {},
  hideLink: false,
  T_S: 'welcome',
};

export default Success;
