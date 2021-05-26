import { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import Notifications from 'Containers/Notifications';
import NotificationsList from './NotificationsList';
import NotificationsIcon from '../Notifications';

export class NotificationsPopover extends Component {
  render() {
    return (
      <Dropdown
        className="notifications-dropdown icon-alert-container"
        ref={(dropdown) => { this.dropdown = dropdown; }}
        removeElement
      >
        <DropdownTrigger href="/#">
          <NotificationsIcon className="notifications-icon-trigger" />
        </DropdownTrigger>
        <div className="dropdown-content-outer-container">
          <DropdownContent onMouseEnter={this.showDropdown}>
            <div className="account-dropdown--identity account-dropdown--segment notifications-title">Notifications</div>
            <Notifications useCached>
              {(({ props }) =>
                (<NotificationsList
                  notifications={props.notificationsPopover}
                  hasErrored={props.hasErroredPopover}
                  isLoading={props.isLoadingPopover}
                />))}
            </Notifications>
            <Link onClick={() => this.dropdown.hide()} className="account-dropdown--identity account-dropdown--segment account-dropdown-link" to="/profile/notifications"><span>See all</span></Link>
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

export default NotificationsPopover;
