import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ProfileDashboard from '../../Components/ProfileDashboard';

class DashboardContainer extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <ProfileDashboard />
    );
  }
}

DashboardContainer.propTypes = {
};

DashboardContainer.defaultProps = {
};

DashboardContainer.contextTypes = {
  router: PropTypes.object,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardContainer));
