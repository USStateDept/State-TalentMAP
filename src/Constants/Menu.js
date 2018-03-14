/**
 * Interface for Profile Menu Configuration

 * @interface MenuItem
 *  interface MenuConfig {
 *    text: string;
 *    icon: string;
 *    route?: string;
 *    params?: { [key: string]: string; };
 *    toggleMenuSection?: boolean;
 *    expandedSection?: boolean;
 *    isCDO?: boolean;
 *    isGlossaryEditor?: boolean;
 *    children?: Array<MenuItem>;
 *  }
 */
function params(data) {
  let params$ = [];

  if (typeof data === 'object') {
    params$ = Object.entries(data).map(item => item.join('='));
  }

  return `${params$.length ? '?' : ''}${params$.join('&')}`;
}

function MenuConfig(config) {
  return config.map((item) => {
    const item$ = Object.assign({
      toggleMenuSection: false,
      expandedSection: false,
      isCDO: false,
      isGlossaryEditor: false,
    }, item);

    if (item$.params) {
      item$.params = params(item$.params);
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
        text: 'Bidder Portfolio',
        route: '/profile/bidderportfolio',
        isCDO: true,
        params: {
          type: 'all',
        },
      },
      {
        text: 'Bidder Tracker',
        route: '/profile/bidtracker',
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
    text: 'Statistics',
    icon: 'pie-chart',
    route: '/profile/statistics',
    isCDO: true,
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
  {
    text: 'Inbox',
    icon: 'comments-o',
    route: '/profile/inbox/',
  },
  {
    text: 'Notifications',
    icon: 'globe',
    route: '/profile/notifications/',
  },
  {
    text: 'Contacts',
    icon: 'users',
    route: '/profile/contacts/',
  },
  {
    text: 'Documents',
    icon: 'file-text',
    route: '/profile/documents/',
  },
]);

export default PROFILE_MENU;
