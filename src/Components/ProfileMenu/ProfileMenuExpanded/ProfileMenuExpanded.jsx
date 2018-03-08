import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../../Constants/DefaultProps';
import { PROFILE_MENU_SECTION_EXPANDED } from '../../../Constants/PropTypes';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

const ProfileMenuExpanded = ({ expandedSection, collapse, toggleMenuSection,
isGlossaryEditor }) => (
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
        <NavLink title="Favorites" link="/profile/favorites/" />
        <NavLink title="Saved Searches" link="/profile/searches/" />
      </NavLink>
      <NavLink title="Glossary Editor" iconName="book" link="/profile/glossaryeditor/" search="?type=all" hidden={!isGlossaryEditor} />
    </NavLinksContainer>
  </div>
);

ProfileMenuExpanded.propTypes = {
  expandedSection: PROFILE_MENU_SECTION_EXPANDED,
  collapse: PropTypes.func.isRequired,
  toggleMenuSection: PropTypes.func.isRequired,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuExpanded.defaultProps = {
  isCDO: false,
  expandedSection: PROFILE_MENU_SECTION_EXPANDED_OBJECT,
  isGlossaryEditor: false,
};

export default ProfileMenuExpanded;
