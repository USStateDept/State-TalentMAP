import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { comparisonsFetchData } from '../../actions/comparisons';
import CompareList from '../../Components/CompareList/CompareList';
import { COMPARE_LIST } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getComparisons(this.props.match.params.ids);
    }
  }

  getComparisons(ids) {
    this.props.fetchData(ids);
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
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      ids: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  comparisons: COMPARE_LIST,
  isAuthorized: PropTypes.func.isRequired,
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
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));
