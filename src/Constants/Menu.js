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
      checkFlag('flags.static_content') ?
        {
          text: 'Settings',
          route: '/profile/settings/',
          icon: 'cogs',
        } : null,
    ],
  },
  checkFlag('flags.bid_stats') ?
    {
      text: 'Statistics',
      icon: 'pie-chart',
      route: '/profile/statistics',
      roles: [
        'cdo',
      ],
    } : null,
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
        text: 'User Roles',
        route: '/profile/administrator/userroles/',
        icon: 'users',
        roles: [
          'superuser',
        ],
      },
      {
        text: 'Feature Flags',
        route: '/profile/administrator/featureflags/',
        icon: 'flag',
        roles: [
          'superuser',
        ],
      },
      {
        text: 'Bid Cycles',
        route: '/profile/administrator/cycles/',
        icon: 'hourglass-start',
        roles: [
          'superuser',
          'bidcycle_admin',
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
  checkFlag('flags.bureau') ? {
    text: 'Bureau',
    route: '/profile/bureau/positionmanager/',
    icon: 'building',
    toggleMenuSection: true,
    expandedSection: true,
    roles: [
      'superuser',
      'bureau_user',
    ],
    children: [
      checkFlag('flags.static_content') ?
        {
          text: 'Dashboard',
          route: '/profile/bureau/dashboard/',
          icon: 'tachometer',
          roles: [
            'superuser',
            'bureau_user',
          ],
        } : null,
      checkFlag('flags.static_content') ?
        {
          text: 'Statistics',
          route: '/profile/bureau/stats/',
          icon: 'bar-chart',
          roles: [
            'superuser',
            'bureau_user',
          ],
        } : null,
      {
        text: 'Position Manager',
        route: '/profile/bureau/positionmanager',
        icon: 'map',
        roles: [
          'superuser',
          'bureau_user',
        ],
      },
      checkFlag('flags.available_bidders') ?
        {
          text: 'Available Bidders',
          route: '/profile/bureau/availablebidders',
          icon: 'users',
          roles: [
            'super_user',
            'bureau_user',
          ],
        } : null,
    ],
  } : null,
  checkFlag('flags.post') ? {
    text: 'Post',
    route: '/profile/post/dashboard/',
    icon: 'building',
    toggleMenuSection: true,
    expandedSection: true,
    roles: [
      'superuser',
      'post_user',
    ],
    children: [
      checkFlag('flags.static_content') ?
        {
          text: 'Dashboard',
          route: '/profile/post/dashboard/',
          icon: 'tachometer',
          roles: [
            'superuser',
            'post_user',
          ],
        } : null,
      {
        text: 'Position Manager',
        route: '/profile/post/positionmanager',
        icon: 'map',
        roles: [
          'superuser',
          'post_user',
        ],
      },
    ],
  } : null,
  checkFlag('flags.ao') ? {
    text: 'AO',
    route: '/profile/ao/dashboard/',
    icon: 'building-o',
    toggleMenuSection: true,
    expandedSection: true,
    roles: [
      'ao_user',
      'superuser',
    ],
    children: [
      checkFlag('flags.static_content') ?
        {
          text: 'Dashboard',
          route: '/profile/ao/dashboard/',
          icon: 'tachometer',
          roles: [
            'ao_user',
            'superuser',
          ],
        } : null,
      checkFlag('flags.agenda_search') ?
        {
          text: 'Employee Agendas',
          route: '/profile/ao/employeeagenda',
          icon: 'user-circle-o',
          roles: [
            'ao_user',
            'superuser',
          ],
        } : null,
    ],
  } : null,
  {
    text: 'CDO',
    route: '/profile/cdo/bidderportfolio',
    icon: 'street-view',
    toggleMenuSection: true,
    expandedSection: true,
    roles: [
      'superuser',
      'cdo',
    ],
    children: [
      checkFlag('flags.client_profiles') ?
        {
          text: 'Client Profiles', // aka Bidder Portfolio
          route: '/profile/cdo/bidderportfolio',
          icon: 'address-book',
          roles: [
            'cdo',
          ],
          params: {
            type: 'all',
          },
        } : null,
      checkFlag('flags.available_bidders') ?
        {
          text: 'Available Bidders',
          route: '/profile/cdo/availablebidders',
          icon: 'users',
          roles: [
            'cdo',
          ],
        } : null,
      checkFlag('flags.agenda_search') ?
        {
          text: 'Employee Agendas',
          route: '/profile/cdo/employeeagenda',
          icon: 'user-circle-o',
          roles: [
            'cdo',
          ],
        } : null,
    ],
  },
].filter(x => x));

export default GET_PROFILE_MENU;
