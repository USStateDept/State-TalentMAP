import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

import { PROFILE_MENU } from '../../../Constants/Menu';

const ProfileMenuCollapsed = ({ expand, isCDO, isGlossaryEditor }) => (
  <div className="usa-grid-full profile-menu profile-menu-collapsed">
    <div className="menu-title">
      <button className="unstyled-button" title="Expand menu" onClick={expand}>
        <FontAwesome name="exchange" />
      </button>
    </div>
    <NavLinksContainer>
      {
        PROFILE_MENU.map((item) => {
          const props = {
            iconName: item.icon,
            link: item.route,
            search: (item.params || ''),
            hidden: (item.isCDO && !isCDO) ||
                    (item.isGlossaryEditor && !isGlossaryEditor),
          };

          return (
            <NavLink {...props} />
          );
        })
      }
    </NavLinksContainer>
  </div>
);

ProfileMenuCollapsed.propTypes = {
  expand: PropTypes.func.isRequired,
  isCDO: PropTypes.bool,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuCollapsed.defaultProps = {
  isCDO: false,
  isGlossaryEditor: false,
};

export default ProfileMenuCollapsed;
