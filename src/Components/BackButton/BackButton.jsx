import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLastRouteLink } from '../../actions/routerLocations';
import { ROUTER_LOCATIONS } from '../../Constants/PropTypes';

export const BackButton = ({ routerLocations, location, ignoreCurrentPath }) => {
  const { text, distance } = getLastRouteLink(routerLocations, location, ignoreCurrentPath);
  return (
    text ?
      <button
        className="button-back-link usa-button-secondary"
        tabIndex="0"
        role="link"
        onClick={() => window.history.go(-(distance))}
      >
        <FontAwesome name="arrow-left" />
        {text}
      </button>
      :
      null
  );
};

BackButton.propTypes = {
  routerLocations: ROUTER_LOCATIONS,
  location: PropTypes.shape({}),
  ignoreCurrentPath: PropTypes.bool,
};

BackButton.defaultProps = {
  routerLocations: [],
  location: {},
  ignoreCurrentPath: false,
};

const mapStateToProps = state => ({
  routerLocations: state.routerLocations,
});

export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BackButton));
