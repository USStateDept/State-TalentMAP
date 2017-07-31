import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { comparisonsFetchData } from '../../actions/comparisons';
import CompareList from '../../Components/CompareList/CompareList';
import { RESULTS } from '../../Constants/PropTypes';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    this.getComparisons(this.props.match.params.ids);
  }

  getComparisons(ids) {
    const query = ids;
    const api = this.props.api;
    this.props.fetchData(`${api}/position/?position_number__in=${query}`);
  }

  render() {
    const { comparisons, hasErrored, isLoading } = this.props;
    return (
      <div className="usa-grid-full">
        <CompareList compare={comparisons} hasErrored={hasErrored} isLoading={isLoading} />
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      ids: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  comparisons: RESULTS,
};

Results.defaultProps = {
  comparisons: [],
  hasErrored: false,
  isLoading: true,
};

Results.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  comparisons: state.comparisons,
  hasErrored: state.comparisonsHasErrored,
  isLoading: state.comparisonsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(comparisonsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));
