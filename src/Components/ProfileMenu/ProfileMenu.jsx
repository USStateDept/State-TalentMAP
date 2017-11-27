import React from 'react';
import PropTypes from 'prop-types';
import NavLinksContainer from './NavLinksContainer';
import NavLink from './NavLink';

const ProfileMenu = ({ isCDO }) => (
  <div className="usa-grid-full profile-menu">
    <div className="menu-title">
      Menu
    </div>
    <NavLinksContainer>
      <NavLink title="Home" iconName="home" link="/profile/" />
      <NavLink title="Profile" iconName="user" >
        <NavLink title="Dashboard" link="/profile/dashboard/" />
        <NavLink
          title="Bidder Portfolio"
          link="/profile/bidderportfolio/"
          search="?type=all"
          hidden={!isCDO}
        />
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

ProfileMenu.propTypes = {
  isCDO: PropTypes.bool,
};

ProfileMenu.defaultProps = {
  isCDO: false,
};

export default ProfileMenu;
