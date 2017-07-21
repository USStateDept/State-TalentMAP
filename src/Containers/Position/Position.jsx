import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

class Position extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.getDetails(this.props.match.params.id);
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func, //eslint-disable-line
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  positionDetails: PropTypes.arrayOf(POSITION_DETAILS),
};

Position.defaultProps = {
  positionDetails: [],
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
