import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import TotalResults from '../../TotalResults';
import { paginate } from '../../../utilities';
import UserRow from './UserRow';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
// import { getUserStats } from '../../../actions/userRoles';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.selectPermission = this.selectPermission.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      users: [],
      selected: '',
      page: 1,
      range: 20,
    };
  }

  componentWillMount() {
    const { getUsers } = this.props;
    const idk = getUsers();
    this.setState({ users: idk });
    console.log(idk);
  }

  onPageChange({ page }) {
    this.setState({ page });
  }

  selectPermission(selected) {
    this.setState({ selected }, () => {
      this.props.getUserPermissions(selected);
    });
  }

  render() {
    const {
      usersList,
      users,
      usersIsLoading,
      usersHasErrored,
/*      getUsers,
      user,
      userIsLoading,
      userHasErrored,
      getUserPermissions,
      onUpdatePermission, */
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { selected, page, range } = this.state;

    // eslint-disable-next-line no-unused-vars
    const usersLen = usersList.length;

    // eslint-disable-next-line no-unused-vars
    const usersSuccess = !usersIsLoading && !usersHasErrored;


    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(usersIsLoading) ? 'results-loading' : ''}`}
      >
        {console.log(usersList)}
        {
          !usersIsLoading && !usersHasErrored && usersLen > 1 &&
          <div>
                For dev
            {usersList[0].username.toString()}
            {users}
          </div>
        }
        {
            usersIsLoading && !usersHasErrored &&
            <div>
              <Spinner type="homepage-position-results" size="big" />
            </div>
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="User Roles" icon="users" />
        </div>
        {
          !usersIsLoading && !usersHasErrored &&
          <div>
            <div className="usa-grid-full total-results">
              <TotalResults total={usersLen} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              {paginate(usersList, range, page).map((m) => {
                const isSelected = m === selected;
                return (
                  <UserRow
                    key={m}
                    name={m}
                    onClick={this.selectPermission}
                    isSelected={isSelected}
                  />
                );
              })}
            </div>
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                totalResults={usersLen}
                pageSize={range}
                onPageChange={this.onPageChange}
                forcePage={page}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

UserRoles.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({})),
  users: PropTypes.arrayOf(PropTypes.shape({})),
  usersIsLoading: PropTypes.bool,
  usersHasErrored: PropTypes.bool,
  getUsers: PropTypes.func,
  /* user: PropTypes.arrayOf(PropTypes.shape({})),
  userIsLoading: PropTypes.bool,
  userHasErrored: PropTypes.bool,
  onUpdatePermission: PropTypes.func, */
  getUserPermissions: PropTypes.func,
};

UserRoles.defaultProps = {
  usersList: [],
  users: [],
  usersIsLoading: false,
  usersHasErrored: false,
  getUsers: EMPTY_FUNCTION,
  /* user: [],
  userIsLoading: false,
  userHasErrored: false,
  onUpdatePermission: EMPTY_FUNCTION, */
  getUserPermissions: EMPTY_FUNCTION,
};

/*
const mapStateToProps = state => ({
  users: state.users,
  usersIsLoading: state.usersIsLoading,
  usersHasErrored: state.usersHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUserStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
*/

export default UserRoles;
