import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { pick } from 'lodash';

import { fetchBidCycles } from '../../actions/bidCycles';
import BidCycleList from '../../Components/BidCycleList';
import { BID_CYCLES } from '../../Constants/PropTypes';

class BidCycles extends Component {
  componentDidMount() {
    this.props.actions.fetchCycles();
  }

  render() {
    const props$ = this.props;
    const props = pick(props$, ['cycles']);

    return (
      <div className="profile-content-inner-container bid-cycles-container">
        <BidCycleList {...props} />
      </div>
    );
  }
}

BidCycles.propTypes = {
  cycles: BID_CYCLES.isRequired,
  actions: PropTypes.shape({
    fetchCycles: PropTypes.func,
  }).isRequired,
};

BidCycles.defaultProps = {
  cycles: [],
};

const mapStateToProps = state => ({
  cycles: state.bidCycles,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchCycles: fetchBidCycles }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidCycles);
