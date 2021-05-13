import { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { toggleViewSavedSearchDialog } from '../../../actions/savedSearch';
import { INPUT_ID } from '../SaveNewSearchDialog';
import { focusById } from '../../../utilities';

export const ID = 'save-search-toggle-button';

export class Trigger extends Component {
  onClick = () => {
    const { isOpen, isPrimary } = this.props;
    this.props.toggle(!isOpen);
    if (isPrimary) {
      focusById(INPUT_ID, 0);
    }
  };

  render() {
    const { children, isPrimary } = this.props;
    return cloneElement(children, {
      onClick: this.onClick,
      id: isPrimary ? ID : undefined,
    });
  }
}

Trigger.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isPrimary: PropTypes.bool,
};

Trigger.defaultProps = {
  toggle: EMPTY_FUNCTION,
  isOpen: false,
  isPrimary: false,
};

const mapStateToProps = state => ({
  isOpen: state.viewSavedSearchDialog,
});

export const mapDispatchToProps = dispatch => ({
  toggle: bool => dispatch(toggleViewSavedSearchDialog(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trigger);
