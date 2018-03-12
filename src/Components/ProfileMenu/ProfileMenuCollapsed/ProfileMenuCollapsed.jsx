import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

const ProfileMenuCollapsed = ({ expand, isGlossaryEditor }) => (
  <div className="usa-grid-full profile-menu profile-menu-collapsed">
    <div className="menu-title">
      <button className="unstyled-button" title="Expand menu" onClick={expand}>
        <FontAwesome name="exchange" />
      </button>
    </div>
    <NavLinksContainer>
      <NavLink iconName="user" link="/profile/dashboard/" />
      <NavLink iconName="star" link="/profile/favorites/" />
      <NavLink iconName="search" link="/profile/searches/" />
      <NavLink iconName="book" link="/profile/glossaryeditor/" search="?type=all" hidden={!isGlossaryEditor} />
    </NavLinksContainer>
  </div>
);

ProfileMenuCollapsed.propTypes = {
  expand: PropTypes.func.isRequired,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuCollapsed.defaultProps = {
  isGlossaryEditor: false,
};

export default ProfileMenuCollapsed;
