import { Component } from 'react';
import { connect } from 'react-redux';
import { USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import BureauPage from '../../Components/BureauPage';

class BureauContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getisAO() {
    return this.props.userProfile.permission_groups.includes('ao_user');
  }

  render() {
    return (
      <BureauPage isAO={this.getisAO()} />
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
