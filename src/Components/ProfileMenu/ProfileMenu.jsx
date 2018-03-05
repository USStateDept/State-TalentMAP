import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProfileMenuExpanded, setProfileMenuSectionExpanded } from '../../actions/profileMenu';
import { EMPTY_FUNCTION, PROFILE_MENU_SECTION_EXPANDED } from '../../Constants/PropTypes';
import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../Constants/DefaultProps';
import ProfileMenuExpanded from './ProfileMenuExpanded';
import ProfileMenuCollapsed from './ProfileMenuCollapsed';

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.collapseMenu = this.collapseMenu.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
  }

  collapseMenu() {
    this.props.onSetProfileMenuExpanded(false);
  }

  expandMenu() {
    this.props.onSetProfileMenuExpanded(true);
  }

  render() {
    const { profileMenuExpanded, profileMenuSectionExpanded, isCDO,
      onSetProfileMenuExpanded, onSetProfileMenuSectionExpanded, isGlossaryEditor } = this.props;
    return (
        profileMenuExpanded ?
          <ProfileMenuExpanded
            expandedSection={profileMenuSectionExpanded}
            collapse={this.collapseMenu}
            toggleMenuSection={onSetProfileMenuSectionExpanded}
            isCDO={isCDO}
            isGlossaryEditor={isGlossaryEditor}
          />
          :
          <ProfileMenuCollapsed
            toggleMenu={onSetProfileMenuExpanded}
            expand={this.expandMenu}
            isGlossaryEditor={isGlossaryEditor}
          />
    );
  }
}

ProfileMenu.propTypes = {
  profileMenuExpanded: PropTypes.bool,
  profileMenuSectionExpanded: PROFILE_MENU_SECTION_EXPANDED.isRequired,
  onSetProfileMenuExpanded: PropTypes.func.isRequired,
  onSetProfileMenuSectionExpanded: PropTypes.func.isRequired,
  isCDO: PropTypes.bool,
  isGlossaryEditor: PropTypes.bool,
};

ProfileMenu.defaultProps = {
  profileMenuExpanded: true,
  profileMenuSectionExpanded: PROFILE_MENU_SECTION_EXPANDED_OBJECT,
  onSetProfileMenuExpanded: EMPTY_FUNCTION,
  onSetProfileMenuSectionExpanded: EMPTY_FUNCTION,
  isCDO: false,
  isGlossaryEditor: false,
};

const mapStateToProps = state => ({
  profileMenuExpanded: state.profileMenuExpanded,
  profileMenuSectionExpanded: state.profileMenuSectionExpanded,
});

export const mapDispatchToProps = dispatch => ({
  onSetProfileMenuExpanded: shouldExpand => dispatch(setProfileMenuExpanded(shouldExpand)),
  onSetProfileMenuSectionExpanded: section => dispatch(setProfileMenuSectionExpanded(section)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
