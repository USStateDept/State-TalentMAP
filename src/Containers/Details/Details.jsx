import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { positionDetailsFetchData } from '../../actions/positionDetails';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.getDetails(this.context.router.route.match.params.id);
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

Details.contextTypes = {
  router: PropTypes.object,
};

Details.propTypes = {
  api: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
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

Details.defaultProps = {
  positionDetails: [],
};

const mapStateToProps = state => ({
  positionDetails: state.positionDetails,
  hasErrored: state.positionDetailsHasErrored,
  isLoading: state.positionDetailsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(positionDetailsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
