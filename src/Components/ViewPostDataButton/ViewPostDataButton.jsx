import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { OBC_URLS } from 'Constants/PropTypes';
import OBCUrl from '../OBCUrl';

const ViewPostDataButton = ({ url, type, altStyle }) => (
  <OBCUrl
    url={url}
    type={type}
    label={<span><FontAwesome name="map-marker" /> View OBC Post Info</span>}
    isButton
    altStyle={altStyle}
  />
);

ViewPostDataButton.propTypes = {
  url: OBC_URLS,
  type: PropTypes.oneOf(['post', 'country']),
  altStyle: PropTypes.bool,
};

ViewPostDataButton.defaultProps = {
  url: {},
  type: 'post',
  altStyle: false,
};

export default ViewPostDataButton;
