import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';

class Position extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.getDetails(this.props.match.params.id); //eslint-disable-line
  }

  getDetails(id) {
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/position/?position_number=${query}`);
  }

  render() {
    const { positionDetails } = this.props;
    // TODO - need to update the request and have API return 404 if position number not found
    // that way we can return error message and not rely on array length
    const l = this.props.isLoading && !this.props.hasErrored ? (<span>Loading...</span>) : null;
    const details = positionDetails.length && !this.props.isLoading && !this.props.hasErrored ? (
      <div>
        <PositionDetails details={positionDetails[0]} />
      </div>
    ) : null;
    return (
      <div>
        <div className="usa-grid">
          <center>
            {l}
          </center>
        </div>
        {details}
      </div>
    );
  }
}

Position.contextTypes = {
  router: PropTypes.object,
};

Position.propTypes = {
  api: PropTypes.string.isRequired,
  match: PropTypes.object, //eslint-disable-line
  location: PropTypes.object, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  fetchData: PropTypes.func, //eslint-disable-line
  hasErrored: PropTypes.bool, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
  positionId: PropTypes.string, //eslint-disable-line
  positionDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      grade: PropTypes.string,
      skill: PropTypes.string,
      bureau: PropTypes.string,
      organization: PropTypes.string,
      position_number: PropTypes.string,
      is_overseas: PropTypes.boolean,
      create_date: PropTypes.string,
      update_date: PropTypes.string,
      languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        language: PropTypes.string,
        written_proficiency: PropTypes.string,
        spoken_proficiency: PropTypes.string,
        representation: PropTypes.string,
      }),
    ),
    }),
  ),
};

Position.defaultProps = {
  positionDetails: [],
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
