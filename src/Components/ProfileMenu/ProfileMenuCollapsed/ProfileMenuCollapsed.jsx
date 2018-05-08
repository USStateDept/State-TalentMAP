import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { difference } from 'lodash';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';
import { PROFILE_MENU } from '../../../Constants/Menu';

const ProfileMenuCollapsed = ({ expand, roles, isCDO, isGlossaryEditor }) => (
  <div className="usa-grid-full profile-menu profile-menu-collapsed">
    <div className="menu-title">
      <button className="unstyled-button" title="Expand menu" onClick={expand}>
        <FontAwesome name="exchange" />
      </button>
    </div>
    <NavLinksContainer>
      {
        PROFILE_MENU.map((item) => {
          const missingRoles = difference(item.roles, roles);
          const props = {
            iconName: item.icon,
            link: item.route,
            search: (item.params || ''),
            hidden: (item.isCDO && !isCDO) ||
                    (item.isGlossaryEditor && !isGlossaryEditor) ||
                    (missingRoles.length > 0),
          };

          return (
            <NavLink key={item.text} {...props} />
          );
        })
      }
    </NavLinksContainer>
  </div>
);

ProfileMenuCollapsed.propTypes = {
  expand: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
  isCDO: PropTypes.bool,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuCollapsed.defaultProps = {
  roles: [],
  isCDO: false,
  isGlossaryEditor: false,
};

export default ProfileMenuCollapsed;
