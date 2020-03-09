import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class EditButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSave: this.props.initialShowSave,
    };
  }

  onShow = () => {
    this.setState({ showSave: true }, () => this.props.onChange({ show: true, type: 'show' }));
  };

  onCancel = () => {
    this.setState({ showSave: false }, () => this.props.onChange({ show: false, type: 'cancel' }));
  };

  onSave = () => {
    this.setState({ showSave: false }, () => this.props.onChange({ show: false, type: 'save' }));
  };

  changeSaveState(val) {
    this.setState({ showSave: val });
  }
  render() {
    const { showSave } = this.state;
    return (
      <div className="edit-buttons-container">
        {!showSave && <button onClick={this.onShow}>Edit</button>}
        {showSave && <button onClick={this.onCancel} className="usa-button-secondary">{'Don\'t Save'}</button>}
        {showSave && <button onClick={this.onSave}>Save</button>}
      </div>
    );
  }
}

EditButtons.propTypes = {
  onChange: PropTypes.func,
  initialShowSave: PropTypes.bool,
};

EditButtons.defaultProps = {
  onChange: EMPTY_FUNCTION,
  initialShowSave: false,
};

export default EditButtons;
