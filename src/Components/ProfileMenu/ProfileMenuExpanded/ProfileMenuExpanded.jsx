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
          PROFILE_MENU.map((item) => {
            const subitems = (item.children || []);
            return subitems.length ? (
              <NavLink key={item.text} {...getProps(item, props$)}>
                {
                  subitems.map(subitem => (
                    <NavLink key={subitem.text} {...getProps(subitem, props$)} />
                  ))
                }
              </NavLink>
            ) : (
              <NavLink key={item.text} {...getProps(item, props$)} />
            );
          })
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
