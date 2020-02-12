import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import TotalResults from '../../TotalResults';
import { paginate } from '../../../utilities';
import UserRow from './UserRow';
import DELEGATE_ROLES from '../../../Constants/DelegateRoles';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      page: 1,
      range: 10,
    };
  }

  onPageChange({ page }) {
    this.setState({ page });
  }

  render() {
    const {
      usersList,
      usersIsLoading,
      usersHasErrored,
    } = this.props;

    const { page, range } = this.state;
    const usersLen = usersList.length;
    const usersSuccess = !usersIsLoading && !usersHasErrored;

    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(usersIsLoading) ? 'results-loading' : ''}`}
      >
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
          usersSuccess &&
          <div>
            <div className="usa-grid-full total-results">
              <TotalResults total={usersLen} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              <table className={'delegateRole--table'}>
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
};

UserRoles.defaultProps = {
  usersList: [],
  usersIsLoading: false,
  usersHasErrored: false,
};

export default UserRoles;
