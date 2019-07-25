import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { get, intersection } from 'lodash';
import NavLinksContainer from '../NavLinksContainer';
import NavLink from '../NavLink';

import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../../Constants/DefaultProps';
import { PROFILE_MENU_SECTION_EXPANDED } from '../../../Constants/PropTypes';
import { GET_PROFILE_MENU } from '../../../Constants/Menu';

function isHidden(options, roles, params) {
  let doesNotHaveRoles = false;
  if (get(options, 'roles', []).length) {
    doesNotHaveRoles = intersection(options.roles, roles).length === 0;
  }
  return (options.isCDO && !params.isCDO) || doesNotHaveRoles;
}

function getParamValueIfOption(option, param) {
  return option && param;
}

function getProps(options, roles, params = {}) {
  const props = {
    title: options.text,
    iconName: options.icon,
    link: options.route,
    search: (options.params || ''),
    hidden: isHidden(options, roles, params),
  };

  if (options.toggleMenuSection || options.expandedSection) {
    delete props.link;

    props.toggleMenuSection = getParamValueIfOption(
      options.toggleMenuSection,
      params.toggleMenuSection,
    );
    props.expandedSection = getParamValueIfOption(
      options.expandedSection,
      params.expandedSection,
    );
  }

  return props;
}

const ProfileMenuExpanded = (props) => {
  const { roles } = props;
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
          GET_PROFILE_MENU().map((item) => {
            const subitems = (item.children || []);
            return subitems.length ? (
              <NavLink key={item.text} {...getProps(item, roles, props$)}>
                {
                  subitems.filter(f => f.route).map(subitem => (
                    <NavLink key={subitem.text} {...getProps(subitem, roles, props$)} />
                  ))
                }
              </NavLink>
            ) : (
              <NavLink key={item.text} {...getProps(item, roles, props$)} />
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
  roles: PropTypes.arrayOf(PropTypes.string),
  isCDO: PropTypes.bool,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenuExpanded.defaultProps = {
  expandedSection: PROFILE_MENU_SECTION_EXPANDED_OBJECT,
  roles: [],
  isCDO: false,
  isGlossaryEditor: false,
};

export default ProfileMenuExpanded;
