// Temporary helpers used for static data

import { orderBy, uniqBy } from 'lodash';
import { filterByProps } from '../../utilities';

function filterUsers(term = '', cdos = []) {
  const getOrdered = a => orderBy(a, ['isCurrentUser', 'last_name']);

  const data = term.length ?
    getOrdered(filterByProps(term, ['first_name', 'last_name'], cdos)) :
    getOrdered(cdos);

  // It is possible that a single CDO is returned twice if they match multiple rolecodes,
  // so deduplicate here.
  return uniqBy(data, 'id');
}

export default filterUsers;
