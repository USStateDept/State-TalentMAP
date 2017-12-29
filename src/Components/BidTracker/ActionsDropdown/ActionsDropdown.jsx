import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { toggleBidPosition } from '../../../actions/bidList';
import ActionsLink from '../ActionsLink';
import { ifEnter } from '../../../utilities';
import InteractiveElement from '../../InteractiveElement';

// export unconnected class for testing
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
    const { showDelete, disableDelete, showWithdraw, disableWithdraw } = this.props;

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
            className="account-dropdown--identity account-dropdown--segment"
          >
            Rename
          </div>
          <div
            tabIndex="0"
            role="link"
            className="account-dropdown--identity account-dropdown--segment"
          >
            Send to e-mail
          </div>
          <div
            tabIndex="0"
            role="link"
            className="account-dropdown--identity account-dropdown--segment"
          >
            Print
          </div>
          {
            showDelete &&
            <InteractiveElement
              type="div"
              role="link"
              className={`account-dropdown--identity account-dropdown--segment ${disableDelete ? 'disabled' : ''}`}
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
              className={`account-dropdown--identity account-dropdown--segment ${disableWithdraw ? 'disabled' : ''}`}
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

const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsDropdown);
