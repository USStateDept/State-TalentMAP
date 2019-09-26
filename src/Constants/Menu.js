import { merge } from 'lodash';
import queryString from 'query-string';
import { checkFlag } from '../flags';

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
 *    roles?: Array<string>;
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
      roles: [],
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

// this is a function so that flags aren't checked until render
export const GET_PROFILE_MENU = () => MenuConfig([
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
        icon: 'tachometer',
      },
      {
        text: 'Notifications',
        route: '/profile/notifications',
        icon: 'globe',
      },
      {
        text: 'Favorites',
        route: '/profile/favorites/',
        icon: 'star',
      },
      {
        text: 'Saved Searches',
        route: '/profile/searches/',
        icon: 'clock-o',
      },
      checkFlag('flags.bidding') ? {
        text: 'Bid Tracker',
        route: '/profile/bidtracker/',
        icon: 'clipboard',
        roles: [
          'bidder',
        ],
      } : null,
      {
        text: 'Bid Cycles',
        route: '/profile/cycles/',
        roles: [
          'bidcycle_admin',
        ],
      },
      {
        text: 'Client Profiles', // aka Bidder Portfolio
        route: '/profile/bidderportfolio',
        icon: 'users',
        isCDO: true,
        params: {
          type: 'all',
        },
      },
    ],
  },
  {
    text: 'Statistics',
    icon: 'pie-chart',
    route: '/profile/statistics',
    isCDO: true,
  },
  {
    text: 'Administrator',
    route: '/profile/administrator/',
    icon: 'sitemap',
    toggleMenuSection: true,
    expandedSection: true,
    roles: [
      'superuser',
      'glossary_editors',
    ],
    children: [
      checkFlag('flags.data_sync_admin') ?
      {
        text: 'Dashboard',
        route: '/profile/administrator/dashboard/',
        icon: 'tachometer',
        roles: [
          'superuser',
        ],
      } : null,
      checkFlag('flags.data_sync_admin') ?
      {
        text: 'Logs',
        route: '/profile/administrator/logs/',
        icon: 'sitemap',
        roles: [
          'superuser',
        ],
      } : null,
      {
        text: 'Statistics',
        route: '/profile/administrator/stats/',
        icon: 'bar-chart',
        roles: [
          'superuser',
        ],
      },
      {
        text: 'Glossary Editor',
        route: '/profile/glossaryeditor/',
        icon: 'book',
        roles: [
          'glossary_editors',
        ],
      },
    ],
  },
]);

export default GET_PROFILE_MENU;
