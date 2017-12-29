import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { toggleBidPosition } from '../../../actions/bidList';
import ActionsLink from '../ActionsLink';
import { ifEnter } from '../../../utilities';
import InteractiveElement from '../../InteractiveElement';

// Export unconnected class for testing.
export class ActionsDropdown extends Component {

  constructor(props) {
    super(props);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
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

    return (
      <Dropdown
        className="actions-dropdown"
        ref={(dropdown) => { this.dropdown = dropdown; }}
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
              className={`${dropdownSegmentClass} ${disableDelete ? 'disabled' : ''}`}
              tabIndex="0"
              onClick={this.deleteBid}
              onKeyUp={(e) => { if (ifEnter(e)) { this.deleteBid(); } }}
              title={disableDelete ? 'You cannot delete this bid' : ''}
            >
              Delete
            </InteractiveElement>
          }
          {
            showWithdraw &&
            <InteractiveElement
              type="div"
              role="link"
              tabIndex="0"
              className={`${dropdownSegmentClass} ${disableWithdraw ? 'disabled' : ''}`}
              title={disableWithdraw ? 'You cannot widthdraw this bid' : ''}
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
