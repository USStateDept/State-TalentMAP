// Temporary helpers used for static data

import { find, orderBy } from 'lodash';
import { filterByProps } from '../../utilities';

export const CDO_USERS = [
  { first_name: 'Bob', last_name: 'Smith', id: 1 },
  { first_name: 'Mike', last_name: 'Jones', id: 2 },
  { first_name: 'John', last_name: 'Daniels', id: 3 },
  { first_name: 'Mary', last_name: 'Brown', id: 4 },
  { first_name: 'Elizabeth', last_name: 'Walters', id: 5 },
  { first_name: 'Maria', last_name: 'Smith', id: 6 },
  { first_name: 'Daniel', last_name: 'Garcia', id: 7 },
  { first_name: 'Marcus', last_name: 'Johnson', id: 8 },
  { first_name: 'Jennifer', last_name: 'McAndrew', id: 9 },
  { first_name: 'Madeline', last_name: 'Lee', id: 10 },
  { first_name: 'Leah', last_name: 'Shadtrach', id: 11, isCurrentUser: true },
];

export const getCurrentUser = () => find(CDO_USERS, 'isCurrentUser');

export function filterUsers(term) {
  const getOrdered = a => orderBy(a, ['isCurrentUser', 'last_name']);

  return term.length ?
  getOrdered(filterByProps(term, ['first_name', 'last_name'], CDO_USERS)) :
  getOrdered(CDO_USERS);
}
