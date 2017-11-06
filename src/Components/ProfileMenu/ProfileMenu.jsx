import React from 'react';
import PropTypes from 'prop-types';
import NavLinksContainer from './NavLinksContainer';
import NavLink from './NavLink';

const ProfileMenu = ({ currentPath }) => (
  <div className="usa-grid-full profile-menu">
    <div className="menu-title">
      Menu
    </div>
    <NavLinksContainer>
      <NavLink title="Home" iconName="home" link="/profile/" isHighlighted={currentPath === '/profile/'} />
      <NavLink title="Profile" iconName="user" currentPath={currentPath}>
        <NavLink title="Dashboard" link="/profile/dashboard/" isHighlighted={currentPath === '/profile/dashboard/'} />
        <NavLink title="Bid List" link="/profile/bidlist/" isHighlighted={currentPath === '/profile/bidlist/'} />
        <NavLink title="Favorites" link="/profile/favorites/" isHighlighted={currentPath === '/profile/favorites/'} />
        <NavLink title="Saved Searches" link="/profile/searches/" isHighlighted={currentPath === '/profile/searches/'} />
      </NavLink>
      <NavLink title="Inbox" iconName="comments-o" link="/profile/inbox/" isHighlighted={currentPath === '/profile/inbox/'} />
      <NavLink title="Notifications" iconName="globe" link="/profile/notifications/" isHighlighted={currentPath === '/profile/notifications/'} />
      <NavLink title="Contacts" iconName="users" link="/profile/contacts/" isHighlighted={currentPath === '/profile/contacts/'} />
      <NavLink title="Documents" iconName="file-text" link="/profile/documents/" isHighlighted={currentPath === '/profile/documents/'} />
    </NavLinksContainer>
  </div>
);

ProfileMenu.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default ProfileMenu;
