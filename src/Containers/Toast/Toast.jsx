import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../../Components/Alert';

export class Toast extends Component {
  componentDidUpdate() {
    const { toastData } = this.props;
    if (toastData.message) {
      this.notify(toastData);
    }
  }

  notify = ({ type = 'success', message = 'Message', title = '' }) => { // eslint-disable-line
    let title$;
    if (type === 'success') { title$ = 'Success'; }
    if (type === 'error') { title$ = 'Error'; }
    if (title) { title$ = title; }
    toast[type](
      <Alert type={type} title={title$} messages={[{ body: message }]} isDivided />,
    );
  };

  render() {
    return (
      <ToastContainer />
    );
  }
}

Toast.propTypes = {
  toastData: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.node,
    title: PropTypes.string,
  }),
};

Toast.defaultProps = {
  toastData: {},
};

const mapStateToProps = state => ({
  toastData: state.toast,
});

export default connect(mapStateToProps)(Toast);
