import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual, omit } from 'lodash';
import { comparisonsFetchData } from '../../actions/comparisons';
import CompareDrawer from './CompareDrawer';
import { COMPARE_LIST } from '../../Constants/PropTypes';
import { getScrollDistanceFromBottom } from '../../utilities';

export class Compare extends Component {
  constructor(props) {
    super(props);

    /* set to 0 for now, but could change to the distance in px from the bottom of the screen
    that you want the drawer to hide at */
    this.scrollDistance = 0;

    this.state = {
      prevComparisons: [],
      comparisons: [],
      isHidden: false,
    };
  }

  UNSAFE_componentWillMount() {
    // initialize with any existing comparison choices
    const ls = localStorage.getItem('compare') || '[]';
    const initialArr = JSON.parse(ls);
    this.setState({ comparisons: initialArr }, () => {
      this.getComparisons(this.state.comparisons.toString());
    });

    // add listener on localStorage 'compare' key
    window.addEventListener('compare-ls', this.lsListener);

    // add listener for scroll location, to hide the comparison farther down the page
    window.addEventListener('scroll', this.scrollListener);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // we ignore comparisons state, since its just tracking the user's choices
    return !(isEqual(nextProps, this.props)) || !(isEqual(omit(nextState, 'comparisons'), omit(this.state, 'comparisons')));
  }

  componentWillUnmount() {
    window.removeEventListener('compare-ls', this.lsListener);
  }

  getComparisons(ids) {
    this.props.fetchData(ids);
  }

  lsListener = () => {
    const comparisons = JSON.parse(localStorage.getItem('compare') || []);
    this.setState({ prevComparisons: this.state.comparisons, comparisons }, () => {
      this.getComparisons(this.state.comparisons.toString());
    });
  };

  scrollListener = () => {
    const { isHidden } = this.state;

    // eslint-disable-next-line no-unused-expressions
    getScrollDistanceFromBottom() < this.scrollDistance ?
      !isHidden && this.setState({ isHidden: true })
      :
      isHidden && this.setState({ isHidden: false });
  };

  render() {
    const { isHidden, comparisons: comparisonsState, prevComparisons } = this.state;
    const { comparisons, hasErrored } = this.props;

    const comparisonsToUse = comparisonsState.length > prevComparisons.length
      ? comparisonsState : prevComparisons;

    /* sort based on any prior compare list, so the cards don't get jumbled
    after one is removed, as it persists until the new request completes */
    const sortedComparisons = comparisons.sort((a, b) =>
      (comparisonsToUse.indexOf(a.id) >
        comparisonsToUse.indexOf(b.id) ? 1 : -1),
    );

    const isHidden$ = isHidden || !sortedComparisons.length;
    return (
      <CompareDrawer
        comparisons={sortedComparisons}
        hasErrored={hasErrored}
        isHidden={isHidden$}
      />
    );
  }
}

Compare.propTypes = {
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  comparisons: COMPARE_LIST,
};

Compare.defaultProps = {
  comparisons: [],
  hasErrored: false,
};

const mapStateToProps = state => ({
  comparisons: state.comparisons,
  hasErrored: state.comparisonsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(comparisonsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
