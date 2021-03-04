import { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import BureauPage from '../../Components/BureauPage';

class BureauContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIsAO() {
    return includes(this.props.userProfile.permission_groups, 'ao_user');
  }

  render() {
    return (
      <BureauPage isAO={this.getIsAO()} />
    );
  }
}

BureauContainer.propTypes = {
  userProfile: USER_PROFILE,
};

BureauContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(BureauContainer);
