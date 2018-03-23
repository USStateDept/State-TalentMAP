import queryString from 'query-string';
import { merge } from 'lodash';

/**
 * Interface for Profile Menu Configuration

 * @interface MenuItem
 *  interface MenuConfig {
 *    text: string;
 *    icon?: string;
 *    route?: string;
 *    params?: { [key: string]: string; };
 *    toggleMenuSection?: boolean;
 *    expandedSection?: boolean;
 *    isCDO?: boolean;
 *    isGlossaryEditor?: boolean;
 *    children?: Array<MenuItem>;
 *  }
 */
function MenuConfig(config) {
  return config.map((item) => {
    const item$ = merge({
      toggleMenuSection: false,
      expandedSection: false,
      isCDO: false,
      isGlossaryEditor: false,
    }, item);

    if (item$.params) {
      item$.params = `?${queryString.stringify(item$.params)}`;
    }

    if (item$.children) {
      item$.children = MenuConfig(item$.children);
    }

    return item$;
  });
}


export const PROFILE_MENU = MenuConfig([
  {
    text: 'Profile',
    route: '/profile/dashboard/',
    icon: 'user',
    toggleMenuSection: true,
    expandedSection: true,
    children: [
      {
        text: 'Dashboard',
        route: '/profile/dashboard',
      },
      {
        text: 'Favorites',
        route: '/profile/favorites/',
      },
      {
        text: 'Saved Searches',
        route: '/profile/searches/',
      },
    ],
  },
  {
    text: 'Glossary Editor',
    icon: 'book',
    route: '/profile/glossaryeditor/',
    isGlossaryEditor: true,
    params: {
      type: 'all',
    },
  },
]);

export default PROFILE_MENU;
