import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class EditButtons extends Component {
  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      showSave: false,
    };
  }
  onShow() {
    this.setState({ showSave: true }, () => this.props.onChange({ show: true, type: 'show' }));
  }
  onCancel() {
    this.setState({ showSave: false }, () => this.props.onChange({ show: false, type: 'cancel' }));
  }
  onSave() {
    this.setState({ showSave: false }, () => this.props.onChange({ show: false, type: 'save' }));
  }
  changeSaveState(val) {
    this.setState({ showSave: val });
  }
  render() {
    const { showSave } = this.state;
    return (
      <div className="edit-buttons-container">
        {!showSave && <button onClick={this.onShow}>Edit</button>}
        {showSave && <button onClick={this.onCancel} className="usa-button-secondary">{'Don\'t save'}</button>}
        {showSave && <button onClick={this.onSave}>Save</button>}
      </div>
    );
  }
}

EditButtons.propTypes = {
  onChange: PropTypes.func,
};

EditButtons.defaultProps = {
  onChange: EMPTY_FUNCTION,
};

export default EditButtons;
