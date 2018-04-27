import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import OBCUrl from '../OBCUrl';

const ViewPostDataButton = ({ id, type, altStyle }) => (
  <OBCUrl
    id={id}
    type={type}
    label={<span><FontAwesome name="map-marker" /> View OBC Post Info</span>}
    isButton
    altStyle={altStyle}
  />
);

ViewPostDataButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(['post', 'country']),
  altStyle: PropTypes.bool,
};

ViewPostDataButton.defaultProps = {
  type: 'post',
  altStyle: false,
};

export default ViewPostDataButton;
