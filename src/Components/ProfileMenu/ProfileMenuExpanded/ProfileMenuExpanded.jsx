import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../../Constants/DefaultProps';
import { PROFILE_MENU_SECTION_EXPANDED } from '../../../Constants/PropTypes';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

const ProfileMenuExpanded = ({ isCDO, expandedSection, collapse, toggleMenuSection }) => (
  <div className="usa-grid-full profile-menu">
    <div className="menu-title">
      <div className="menu-title-text">Menu</div>
      <button className="unstyled-button" title="Collapse menu" onClick={collapse}>
        <FontAwesome name="exchange" />
      </button>
    </div>
    <NavLinksContainer>
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
        <NavLink title="Bid Tracker" link="/profile/bidtracker/" />
        <NavLink title="Bid List" link="/profile/bidlist/" />
        <NavLink title="Favorites" link="/profile/favorites/" />
        <NavLink title="Saved Searches" link="/profile/searches/" />
      </NavLink>
      <NavLink title="Inbox" iconName="comments-o" link="/profile/inbox/" />
      <NavLink title="Notifications" iconName="globe" link="/profile/notifications/" />
      <NavLink title="Contacts" iconName="users" link="/profile/contacts/" />
      <NavLink title="Documents" iconName="file-text" link="/profile/documents/" />
    </NavLinksContainer>
  </div>
);

ProfileMenuExpanded.propTypes = {
  isCDO: PropTypes.bool,
  expandedSection: PROFILE_MENU_SECTION_EXPANDED,
  collapse: PropTypes.func.isRequired,
  toggleMenuSection: PropTypes.func.isRequired,
};

ProfileMenuExpanded.defaultProps = {
  isCDO: false,
  expandedSection: PROFILE_MENU_SECTION_EXPANDED_OBJECT,
};

export default ProfileMenuExpanded;
