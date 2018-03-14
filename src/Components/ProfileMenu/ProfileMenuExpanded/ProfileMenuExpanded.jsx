import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../../Constants/DefaultProps';
import { PROFILE_MENU_SECTION_EXPANDED } from '../../../Constants/PropTypes';
import { PROFILE_MENU } from '../../../Constants/Menu';

function getProps(options, params = {}) {
  const props = {
    title: options.text,
    iconName: options.icon,
    link: options.route,
    search: (options.params || ''),
    hidden: (options.isCDO && !params.isCDO) ||
            (options.isGlossaryEditor && !params.isGlossaryEditor),
  };

  if (options.toggleMenuSection || options.expandedSection) {
    delete props.link;

    if (options.toggleMenuSection) {
      props.toggleMenuSection = params.toggleMenuSection;
    }

    if (options.expandedSection) {
      props.expandedSection = params.expandedSection;
    }
  }

  return props;
}

/*
<NavLink
  title="Profile"
  iconName="user"
  toggleMenuSection={toggleMenuSection}
  expandedSection={expandedSection}
>
  <NavLink title="Dashboard" link="/profile/dashboard/" />
  <NavLink
    title="Bidder Portfolio"
    link="/profile/bidderportfolio/"
    search="?type=all"
    hidden={!isCDO}
  />
  <NavLink
    title="Bidder Tracker"
    link="/profile/bidtracker/"
  />
  <NavLink title="Favorites" link="/profile/favorites/" />
  <NavLink title="Saved Searches" link="/profile/searches/" />
</NavLink>
<NavLink
  title="Statistics"
  iconName="pie-chart"
  link="/profile/statistics/"
  hidden={!isCDO}
/>
<NavLink title="Glossary Editor" iconName="book" link="/profile/glossaryeditor/"
search="?type=all" hidden={!isGlossaryEditor} />
<NavLink title="Inbox" iconName="comments-o" link="/profile/inbox/" />
<NavLink title="Notifications" iconName="globe" link="/profile/notifications/" />
<NavLink title="Contacts" iconName="users" link="/profile/contacts/" />
<NavLink title="Documents" iconName="file-text" link="/profile/documents/" />
*/
const ProfileMenuExpanded = (props) => {
  const props$ = {
    isCDO: props.isCDO,
    isGlossaryEditor: props.isGlossaryEditor,
    toggleMenuSection: props.toggleMenuSection,
    expandedSection: props.expandedSection,
  };

  return (
    <div className="usa-grid-full profile-menu">
      <div className="menu-title">
        <div className="menu-title-text">Menu</div>
        <button className="unstyled-button" title="Collapse menu" onClick={props.collapse}>
          <FontAwesome name="exchange" />
        </button>
      </div>
      <NavLinksContainer>
        {
          PROFILE_MENU.map(item => (
            <NavLink {...getProps(item, props$)}>
              {
                (item.children || []).map(childItem => (
                  <NavLink {...getProps(childItem, props$)} />
                ))
              }
            </NavLink>
          ))
        }
      </NavLinksContainer>
    </div>
  );
};

ProfileMenuExpanded.propTypes = {
  expandedSection: PROFILE_MENU_SECTION_EXPANDED,
  collapse: PropTypes.func.isRequired,
  toggleMenuSection: PropTypes.func.isRequired,
  isCDO: PropTypes.bool,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuExpanded.defaultProps = {
  expandedSection: PROFILE_MENU_SECTION_EXPANDED_OBJECT,
  isCDO: false,
  isGlossaryEditor: false,
};

export default ProfileMenuExpanded;
