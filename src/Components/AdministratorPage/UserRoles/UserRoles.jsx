import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DELEGATE_ROLES from 'Constants/DelegateRoles';
import { getUsers } from 'actions/userRoles';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get, isNil, omit } from 'lodash';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import TotalResults from '../../TotalResults';
import UserRow from './UserRow';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      range: 100,
    };
  }

  onPageChange = ({ page }) => {
    this.setState({ page });
    this.props.updateUsers(page);
  };

  render() {
    const {
      totalUsers,
      usersList,
      usersIsLoading,
      usersHasErrored,
      modifyPermissionIsLoading,
      tableStats,
    } = this.props;
    const { page, range } = this.state;
    const usersSuccess = !usersIsLoading && !usersHasErrored;

    // copying id from tableStats to group_id in DELEGATE_ROLES$
    const getDelegateRoles = () => {
      const roles = { ...DELEGATE_ROLES };
      tableStats.forEach((m) => {
        const roleGroup = get(roles, `${m.name}`);
        if (roleGroup) { roles[m.name].group_id = m.id; }
      });
      // remove role if did not match with tableStats(no id in roles)
      const removeRoles = [];
      Object.keys(roles).forEach((role) => {
        if (isNil(get(roles, `${role}.group_id`))) {
          removeRoles.push(role);
        }
      });
      return omit(roles, removeRoles);
    };

    const DELEGATE_ROLES$ = getDelegateRoles();

    const thArray = [];
    Object.keys(DELEGATE_ROLES$).forEach(m => (
      thArray.push(
        <th key={get(DELEGATE_ROLES$, `${m}.group_name`)}>{get(DELEGATE_ROLES$, `${m}.title`)}</th>,
      )
    ));

    const userRows = usersList.map(m => (
      <UserRow
        key={m.id}
        userID={m.id}
        username={m.username}
        name={`${m.last_name}, ${m.first_name}`}
        permissionGroups={m.groups}
        delegateRoles={DELEGATE_ROLES$}
      />
    ),
    );

    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(usersIsLoading) ? 'results-loading' : ''}`}
      >
        {
          usersIsLoading &&
            <div>
              <Spinner type="homepage-position-results" size="big" />
            </div>
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="User Roles" icon="users" />
        </div>
        {
          usersSuccess &&
          <div>
            <div className="usa-grid-full searches-top-section selectUsers" />
            <div className="usa-grid-full total-results">
              <TotalResults total={totalUsers} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              {
                usersSuccess &&
                <table className={`delegateRole--table ${modifyPermissionIsLoading ? 'delegate-roles-loading' : ''}`}>
                  <thead>
                    <tr>
                      <th>userName</th>
                      <th>Last, First</th>
                      {thArray}
                    </tr>
                  </thead>
                  <tbody>
                    {userRows}
                  </tbody>
                </table>
              }
            </div>
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                totalResults={totalUsers}
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
  totalUsers: PropTypes.number,
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      last_name: PropTypes.string,
      first_name: PropTypes.string,
      groups: PropTypes.arrayOf(PropTypes.shape({})),
    })),
  usersIsLoading: PropTypes.bool,
  usersHasErrored: PropTypes.bool,
  modifyPermissionIsLoading: PropTypes.bool,
  tableStats: PropTypes.arrayOf(PropTypes.shape([])),
  updateUsers: PropTypes.func,
};

UserRoles.defaultProps = {
  totalUsers: 0,
  usersList: [{
    id: null,
    username: '',
    last_name: '',
    first_name: '',
    groups: [],
  }],
  usersIsLoading: false,
  usersHasErrored: false,
  modifyPermissionIsLoading: false,
  tableStats: [],
  updateUsers: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  usersList: get(state, 'usersSuccess.results', []),
  usersIsLoading: state.usersIsLoading,
  usersHasErrored: state.usersHasErrored,
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
  tableStats: state.getTableStatsSuccess,
});

export const mapDispatchToProps = dispatch => ({
  updateUsers: (page, limit) => dispatch(getUsers(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
