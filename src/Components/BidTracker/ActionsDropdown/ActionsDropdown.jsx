import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { toggleBidPosition } from '../../../actions/bidList';
import ActionsLink from '../ActionsLink';
import InteractiveElement from '../../InteractiveElement';

// Export unconnected class for testing.
export class ActionsDropdown extends Component {

  constructor(props) {
    super(props);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
    this.setDropdown = this.setDropdown.bind(this);
  }

  setDropdown(dropdown) {
    this.dropdown = dropdown;
  }

  hideDropdown() {
    this.dropdown.hide();
  }

  deleteBid() {
    const { positionId, toggleBid } = this.props;
    toggleBid(positionId, true);
  }

  render() {
    // Use different props to display certain actions and disable them as well.
    const { showDelete, disableDelete, showWithdraw, disableWithdraw } = this.props;

    const dropdownSegmentClass = 'account-dropdown--identity account-dropdown--segment';

    const deleteTitle = disableDelete ? 'You cannot delete this bid' : '';
    const deleteClass = disableDelete ? 'disabled' : '';

    const withdrawTitle = disableWithdraw ? 'You cannot widthdraw this bid' : '';
    const withdrawClass = disableWithdraw ? 'disabled' : '';

    return (
      <Dropdown
        className="actions-dropdown"
        ref={this.setDropdown}
        removeElement
      >
        <DropdownTrigger href="/#">
          <ActionsLink />
        </DropdownTrigger>
        <DropdownContent>
          <div
            tabIndex="0"
            role="link"
            className={dropdownSegmentClass}
          >
            Send to e-mail
          </div>
          <div
            tabIndex="0"
            role="link"
            className={dropdownSegmentClass}
          >
            Print
          </div>
          {
            showDelete &&
            <InteractiveElement
              type="div"
              role="link"
              className={`${dropdownSegmentClass} ${deleteClass}`}
              onClick={this.deleteBid}
              title={deleteTitle}
            >
              Delete
            </InteractiveElement>
          }
          {
            showWithdraw &&
            <InteractiveElement
              type="div"
              role="link"
              className={`${dropdownSegmentClass} ${withdrawClass}`}
              title={withdrawTitle}
            >
              Withdraw
            </InteractiveElement>
          }
        </DropdownContent>
      </Dropdown>
    );
  }
}

ActionsDropdown.propTypes = {
  positionId: PropTypes.number.isRequired,
  showDelete: PropTypes.bool,
  disableDelete: PropTypes.bool,
  showWithdraw: PropTypes.bool,
  disableWithdraw: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
};

ActionsDropdown.defaultProps = {
  showDelete: true,
  disableDelete: false,
  showWithdraw: false,
  disableWithdraw: false,
};

const mapStateToProps = state => ({
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsDropdown);
