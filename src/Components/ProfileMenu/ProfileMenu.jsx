import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ROUTER_LOCATION_OBJECT } from '../../Constants/PropTypes';
import NavLinksContainer from './NavLinksContainer';
import NavLink from './NavLink';
import isCurrentPath from './helpers';

class ProfileMenu extends Component {
  checkForCurrentPath(pathName) {
    return isCurrentPath(this.props.location.pathname, pathName);
  }
  render() {
    const { location: { pathname } } = this.props;
    return (
      <div className="usa-grid-full profile-menu">
        <div className="menu-title">
          Menu
        </div>
        <NavLinksContainer>
          <NavLink title="Home" iconName="home" link="/profile/" isHighlighted={this.checkForCurrentPath('/profile/')} />
          <NavLink title="Profile" iconName="user" currentPath={pathname}>
            <NavLink title="Dashboard" link="/profile/dashboard/" isHighlighted={this.checkForCurrentPath('/profile/dashboard/')} />
            <NavLink title="Bid List" link="/profile/bidlist/" isHighlighted={this.checkForCurrentPath('/profile/bidlist/')} />
            <NavLink title="Favorites" link="/profile/favorites/" isHighlighted={this.checkForCurrentPath('/profile/favorites/')} />
            <NavLink title="Saved Searches" link="/profile/searches/" isHighlighted={this.checkForCurrentPath('/profile/searches/')} />
          </NavLink>
          <NavLink title="Inbox" iconName="comments-o" link="/profile/inbox/" isHighlighted={this.checkForCurrentPath('/profile/inbox/')} />
          <NavLink title="Notifications" iconName="globe" link="/profile/notifications/" isHighlighted={this.checkForCurrentPath('/profile/notifications/')} />
          <NavLink title="Contacts" iconName="users" link="/profile/contacts/" isHighlighted={this.checkForCurrentPath('/profile/contacts/')} />
          <NavLink title="Documents" iconName="file-text" link="/profile/documents/" isHighlighted={this.checkForCurrentPath('/profile/documents/')} />
        </NavLinksContainer>
      </div>
    );
  }
}

ProfileMenu.propTypes = {
  location: ROUTER_LOCATION_OBJECT.isRequired,
};

ProfileMenu.contextTypes = {
  router: PropTypes.object,
};

export default withRouter(ProfileMenu);
