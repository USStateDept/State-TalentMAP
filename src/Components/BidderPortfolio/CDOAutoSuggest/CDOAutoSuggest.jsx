import React, { Component } from 'react';
import Dropdown, { DropdownContent } from 'react-simple-dropdown';
import FA from 'react-fontawesome';
import AutoSuggest from '../../AutoSuggest';
import SuggestionChoiceCDOName from '../../AutoSuggest/SuggestionChoiceCDOName';
import { getCurrentUser, filterUsers } from '../temporyHelpers';
import BoxShadow from '../../BoxShadow';
import InteractiveElement from '../../InteractiveElement';

// we'll reference this to return focus after making a selection
const dropdownID = 'cdo-portfolio-dropdown-trigger';

// we'll check for outside clicks and close the dropdown
const dropdownContentID = 'cdo-portfolio-dropdown-content';
const dropdownTriggerID = 'cdo-portfolio-dropdown-trigger';

export const getDisplayProperty = o => `${o.first_name} ${o.last_name}`;

class CDOAutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getFilteredUsers = this.getFilteredUsers.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.dropdown = {};
    this.state = {
      suggestions: filterUsers(''),
      selection: getCurrentUser(),
      isActive: false,
    };
  }

  componentWillMount() {
    window.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  onSuggestionSelected(selection) {
    this.setState({ selection }, () => {
      this.hideDropdown();
      document.getElementById(dropdownID).focus();
    });
  }

  getFilteredUsers(term) {
    this.setState({ suggestions: filterUsers(term) });
  }

  hideDropdown() {
    // Explicitly hide the dropdown using the built-in hide() function from react-simple-dropdown
    if (this.dropdown && this.dropdown.hide) { this.dropdown.hide(); }
    this.setState({ isActive: false });
  }

  showDropdown() {
    // Explicitly show the dropdown using the built-in show() function from react-simple-dropdown
    if (this.dropdown && this.dropdown.show) { this.dropdown.show(); }
    this.setState({ isActive: true });
  }

  toggleDropdown() {
    const { isActive } = this.state;
    if (isActive) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  handleOutsideClick(e) {
    const { isActive } = this.state;
    if (isActive &&
      !document.getElementById(dropdownContentID).contains(e.target)
      && !document.getElementById(dropdownTriggerID).contains(e.target)
    ) {
      this.hideDropdown();
    }
  }

  render() {
    const { isActive, selection, suggestions } = this.state;
    let triggerLabel = `${selection.first_name} ${selection.last_name}`;
    let icon = 'chevron-down';
    let altPrefix = 'Open';
    if (isActive) {
      triggerLabel = 'See client list as';
      icon = 'chevron-up';
      altPrefix = 'Close';
    }
    const alt = `${altPrefix} client list search`;
    return (
      <Dropdown
        className="portfolio-account-dropdown"
        ref={(dropdown) => { this.dropdown = dropdown; }}
        removeElement
        active={isActive}
      >
        <h2>Client Profiles</h2>
        <div className="usa-grid-full dropdown-trigger-container" id={dropdownTriggerID}>
          <span>Client list:</span>
          <InteractiveElement
            onClick={this.toggleDropdown}
            className="account-dropdown--name"
            id={dropdownID}
            alt={alt}
          >
            {triggerLabel}
            <FA name={icon} />
          </InteractiveElement>
        </div>
        <BoxShadow>
          <div className="dropdown-content-outer-container" id={dropdownContentID}>
            <DropdownContent>
              <div className="autosuggest-container">
                <AutoSuggest
                  label="Client list"
                  inputId="cdo-portfolio-autosuggest"
                  debounceMillis={0}
                  suggestions={suggestions}
                  getSuggestions={this.getFilteredUsers}
                  displayProperty={getDisplayProperty}
                  suggestionTemplate={SuggestionChoiceCDOName}
                  onSuggestionSelected={this.onSuggestionSelected}
                  placeholder="Start typing CDO name"
                  autoSuggestProps={{
                    shouldRenderSuggestions: () => true,
                    alwaysRenderSuggestions: true,
                  }}
                  templateProps={{
                    value: selection,
                  }}
                />
              </div>
            </DropdownContent>
          </div>
        </BoxShadow>
      </Dropdown>
    );
  }
}

export default CDOAutoSuggest;
