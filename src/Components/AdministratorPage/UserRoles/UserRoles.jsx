import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DELEGATE_ROLES from 'Constants/DelegateRoles';
import { paginate } from 'utilities';
import SelectForm from 'Components/SelectForm';
import { find, get } from 'lodash';
import { getUsers } from 'actions/userRoles';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import TotalResults from '../../TotalResults';
import UserRow from './UserRow';


const NUMBER_RESULTS = [
  { value: 50, text: '50' },
  { value: 100, text: '100', defaultSort: true },
  { value: 150, text: '150' },
  { value: 200, text: '200' },
  { value: 250, text: '250' },
  { value: 300, text: '300' },
  { value: 'all', text: 'All' },
  // { value: this.props.totalUsers, text: 'All' }, ?mike? how can i do something like this?
];

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSelectUsers = this.onSelectUsers.bind(this);
    this.state = {
      page: 1, /* for pagination */
      range: 10, /* for pagination */
      apiPage: 1, /* for api */
      apiLimit: find(NUMBER_RESULTS, d => d.defaultSort).value,
    };
  }

  onPageChange({ page }) {
    this.setState({ page });
  }

  onSelectUsers(e) {
    const newVal = get(e, 'target.value');
    // TODO remove after totalUsers is properly used above
    const newVal$ = (newVal === 'all') ? this.props.totalUsers : newVal;
    if (newVal$ !== this.state.apiLimit) {
      this.props.updateUsers(this.state.apiPage, newVal$);
      this.setState({ apiLimit: newVal$ });
    }
  }

  render() {
    const {
      usersList,
      usersIsLoading,
      usersHasErrored,
      // ?mike? how do i use totalUsers above without putting in this.props? or have it not complain
      // eslint-disable-next-line no-unused-vars
      totalUsers,
      modifyPermissionIsLoading,
      // eslint-disable-next-line no-unused-vars
      updateUsers,
    } = this.props;

    const { page, range, apiLimit } = this.state;
    const usersLen = usersList.length;
    const usersSuccess = !usersIsLoading && !usersHasErrored;

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
            <div className="usa-grid-full searches-top-section selectUsers">
              <div className="results-dropdown results-dropdown-sort">
                <SelectForm
                  id="numResults"
                  label="Number of Users to Display:"
                  options={NUMBER_RESULTS}
                  defaultSort={apiLimit}
                  onSelectOption={this.onSelectUsers}
                />
              </div>
            </div>
            <div className="usa-grid-full total-results">
              <TotalResults total={usersLen} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              {
                usersSuccess &&
                <table className={`delegateRole--table ${modifyPermissionIsLoading ? 'delegate-roles-loading' : ''}`}>
                  <thead>
                    <tr>
                      <th>userName</th>
                      <th>Last, First</th>
                      {Object.keys(DELEGATE_ROLES).map(m => (
                        <th key={DELEGATE_ROLES[m].group_name}>{DELEGATE_ROLES[m].title}</th>
                      ),
                    )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginate(usersList, range, page).map(m => (
                      <UserRow
                        key={m.id}
                        userID={m.id}
                        username={m.username}
                        name={`${m.last_name}, ${m.first_name}`}
                        permissionGroups={m.groups}
                      />
                    ),
                  )}
                  </tbody>
                </table>
              }
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
  usersIsLoading: PropTypes.bool,
  usersHasErrored: PropTypes.bool,
  totalUsers: PropTypes.number,
  modifyPermissionIsLoading: PropTypes.bool,
  updateUsers: PropTypes.func,
};

UserRoles.defaultProps = {
  usersList: [],
  usersIsLoading: false,
  usersHasErrored: false,
  totalUsers: 0, // ?mike? this feels excessive 3 of 3
  modifyPermissionIsLoading: true,
  updateUsers: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  updateUsers: (a, b, c) => dispatch(getUsers(a, b, c)),
  // ?mike? there must be a better way, (...props)?
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
