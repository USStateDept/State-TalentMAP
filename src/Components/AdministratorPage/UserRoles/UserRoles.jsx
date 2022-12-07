import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import {
  get, pull, replace,
} from 'lodash';
import shortid from 'shortid';
import { getUsers } from 'actions/userRoles';
import DELEGATE_ROLES from 'Constants/DelegateRoles';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import SearchBar from 'Components/SearchBar/SearchBar';
import CheckBox from 'Components/CheckBox';
import TotalResults from 'Components/TotalResults';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PaginationWrapper from 'Components/PaginationWrapper/PaginationWrapper';
import UserRow from './UserRow';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      range: 100,
      sort: 'last_name',
      filters: [],
      q_username: '',
      q_name: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  callUpdateUsers = () => {
    const {
      page, range, sort, filters, q_username, q_name,
    } = this.state;
    this.props.updateUsers(page, range, sort, filters.join(), q_username, q_name);
  };

  onPageChange = ({ page }) => {
    this.setState({ page }, this.callUpdateUsers);
  };

  filterByPermission = (clicked, permission) => {
    const filters = [...this.state.filters];

    if (clicked) {
      filters.push(permission);
    } else {
      pull(filters, permission);
    }
    this.setState({ filters }, this.callUpdateUsers);
  };

  changeText = (e, id) => {
    this.setState({ [id]: e.target.value });
  };

  submitText = (e) => {
    e.preventDefault();
    this.callUpdateUsers();
  };

   clearText = (e, id) => {
     this.setState({ [id]: '' }, this.callUpdateUsers);
   };

   onSortTable = (sortType) => {
     const { sort } = this.state;
     let sortType$;
     if (sortType === sort) {
       sortType$ = `-${sort}`;
     } else if (`-${sortType}` === sort) {
       sortType$ = '';
     } else {
       sortType$ = sortType;
     }
     this.setState({ sort: sortType$ }, this.callUpdateUsers);
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
     const { page, range, sort } = this.state;
     const usersSuccess = !usersIsLoading && !usersHasErrored;

     // copying id from tableStats to group_id in DELEGATE_ROLES$
     const getDelegateRoles = () => {
       const roles = { ...DELEGATE_ROLES };
       tableStats.forEach((m) => {
         const roleGroup = get(roles, `${m.name}`);
         if (roleGroup) { roles[m.name].group_id = m.id; }
       });
       return roles;
     };

     const sortArrow = (sortType) => (
       <div className={`delegate-role-header-sort${sortType === replace(sort, '-', '') ? '' : '-hidden'}`}>
         <FA name={`long-arrow-${get(sort, [0], '') === '-' ? 'down' : 'up'}`} />
       </div>
     );

     const DELEGATE_ROLES$ = getDelegateRoles();

     // eslint-disable-next-line no-unused-vars
     const userRows = usersIsLoading ? [...new Array(10)].map(m => (
       <UserRow
         key={shortid.generate()}
         isLoading={usersIsLoading}
       />
     ),
     ) : usersList.map(m => (
       <UserRow
         key={m.id}
         userID={m.id}
         username={m.username}
         name={`${m.last_name}, ${m.first_name}`}
         permissionGroups={m.groups}
         delegateRoles={DELEGATE_ROLES$}
         isLoading={usersIsLoading}
       />
     ),
     );

     return (
       <div
         className="usa-grid-full profile-content-inner-container administrator-page"
       >
         <div className="usa-grid-full">
           <ProfileSectionTitle title="User Roles" icon="users" />
         </div>
         {
           usersSuccess &&
          <div className="usa-grid-full total-results">
            <TotalResults total={totalUsers} pageNumber={page} pageSize={range} />
          </div>
         }
         <div className="usa-grid-full">
           <table className={`delegateRole--table ${modifyPermissionIsLoading ? 'delegate-roles-loading' : ''}`}>
             <thead>
               <tr>
                 <th key="username" className="delegate-role-header">
                   <div className="header-text" role="button" tabIndex={0} onClick={() => this.onSortTable('username')}>
                    Username
                     {sortArrow('username')}
                   </div>
                   <div className="filter-row">
                     <SearchBar
                       id="username-search-field"
                       labelSrOnly
                       noButton
                       onChangeText={e => this.changeText(e, 'q_username')}
                       onSubmitSearch={e => this.submitText(e, 'q_username')}
                       onClear={e => this.clearText(e, 'q_username')}
                       placeholder="Search by Username"
                       showClear
                       submitText="Search"
                       type="small"
                       showButton
                     />
                   </div>
                 </th>
                 <th className="delegate-role-header">
                   <div className="header-text" role="button" tabIndex={0} onClick={() => this.onSortTable('last_name')}>
                    Last, First
                     {sortArrow('last_name')}
                   </div>
                   <div className="filter-row">
                     <SearchBar
                       id="name-search-field"
                       labelSrOnly
                       noButton
                       onChangeText={e => this.changeText(e, 'q_name')}
                       onSubmitSearch={e => this.submitText(e, 'q_name')}
                       onClear={e => this.clearText(e, 'q_name')}
                       placeholder="Search by Last, First"
                       showClear
                       submitText="Search"
                       type="small"
                       showButton
                     />
                   </div>
                 </th>
                 {
                   Object.keys(DELEGATE_ROLES$).map(m => (
                     <th key={get(DELEGATE_ROLES$, `${m}.group_name`)}>
                       {get(DELEGATE_ROLES$, `${m}.title`)}
                       <div className="filter-row">
                         <CheckBox
                           id={`${get(DELEGATE_ROLES$, `${m}.group_name`)}`}
                           value={m.group_id}
                           onCheckBoxClick={e => this.filterByPermission(e, get(DELEGATE_ROLES$, `${m}.group_id`))}
                         />
                       </div>
                     </th>
                   ))
                 }
               </tr>
             </thead>
             <tbody>
               {userRows}
             </tbody>
           </table>
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
  updateUsers: (page, range, sort, filters, q_username, q_name) =>
    dispatch(getUsers(page, range, sort, filters, q_username, q_name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
