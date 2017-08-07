import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
import { POSITION_DETAILS, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Position extends Component {

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getDetails(this.props.match.params.id);
    }
  }

  getDetails(id) {
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/position/?position_number=${query}`);
  }

  render() {
    const { positionDetails, isLoading, hasErrored } = this.props;
    return (
      <div>
        <PositionDetails
          api={this.props.api}
          details={positionDetails[0]}
          isLoading={isLoading}
          hasErrored={hasErrored}
          goBack={this.context.router.history.goBack}
        />
      </div>
    );
  }
}

Position.contextTypes = {
  router: PropTypes.object,
};

Position.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  positionDetails: PropTypes.arrayOf(POSITION_DETAILS),
  isAuthorized: PropTypes.func.isRequired,
};

Position.defaultProps = {
  positionDetails: [],
  fetchData: EMPTY_FUNCTION,
  onNavigateTo: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
};

const mapStateToProps = (state, ownProps) => ({
  positionDetails: state.positionDetails,
  hasErrored: state.positionDetailsHasErrored,
  isLoading: state.positionDetailsIsLoading,
  id: ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(positionDetailsFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
