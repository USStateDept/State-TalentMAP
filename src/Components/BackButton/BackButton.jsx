import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLastRouteLink } from '../../actions/routerLocations';
import { ROUTER_LOCATIONS } from '../../Constants/PropTypes';

const BackButton = ({ routerLocations }) => {
  const goBackLink = getLastRouteLink(routerLocations);
  return (
    goBackLink.text ?
      <button
        className="button-back-link usa-button-secondary"
        tabIndex="0"
        role="link"
        onClick={() => window.history.back()}
      >
        <FontAwesome name="arrow-left" />
        {goBackLink.text}
      </button>
      :
      null
  );
};

BackButton.propTypes = {
  routerLocations: ROUTER_LOCATIONS,
};

BackButton.defaultProps = {
  routerLocations: [],
};

const mapStateToProps = state => ({
  routerLocations: state.routerLocations,
});

export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BackButton));
