// Temporary helpers used for static data

import { orderBy } from 'lodash';
import { filterByProps } from '../../utilities';

function filterUsers(term = '', cdos = []) {
  const getOrdered = a => orderBy(a, ['isCurrentUser', 'last_name']);

  return term.length ?
    getOrdered(filterByProps(term, ['first_name', 'last_name'], cdos)) :
    getOrdered(cdos);
}

export default filterUsers;
