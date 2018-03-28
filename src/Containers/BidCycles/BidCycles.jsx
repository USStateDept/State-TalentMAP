import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pick } from 'lodash';
import PropTypes from 'prop-types';

import { fetchBidCycles } from '../../actions/bidCycles';
import BidCycleComponent from '../../Components/BidCycles';
import { BID_CYCLES } from '../../Constants/PropTypes';

class BidCycles extends Component {
  static propTypes = {
    cycles: BID_CYCLES.isRequired,
    actions: PropTypes.shape({
      fetchCycles: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    cycles: [],
  };

  componentDidMount() {
    if (!this.props.cycles.length) {
      this.props.actions.fetchCycles();
    }
  }

  render() {
    const props$ = this.props;
    const props = pick(props$, ['cycles']);

    return (
      <div className="profile-content-inner-container bid-cycles-container">
        <BidCycleComponent {...props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cycles: state.bidCycles,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchCycles: fetchBidCycles }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidCycles);
