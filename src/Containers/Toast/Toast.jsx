import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Alert from '../../Components/Alert';

export class Toast extends Component {
  componentDidUpdate() {
    const { toastData } = this.props;
    if (toastData.message) {
      this.notify(toastData);
    }
  }

  notify = ({ type = 'success', message = 'Message', title = '', id, isUpdate }) => {
    const options = {
      autoClose: true,
    };
    let title$;
    if (type === 'success') { title$ = 'Success'; }
    if (type === 'error') { title$ = 'Error'; }
    if (title) { title$ = title; }

    if (isUpdate && this[id]) {
      toast.dismiss(this[id]);
    }

    if (id && !isUpdate) { options.autoClose = false; }

    const id$ = id || shortid.generate();

    this[id$] = toast[type](
      <Alert type={type} title={title$} messages={[{ body: message }]} isDivided />, options,
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
    id: PropTypes.string,
    isUpdate: PropTypes.bool,
  }),
};

Toast.defaultProps = {
  toastData: {
    isUpdate: false,
  },
};

const mapStateToProps = state => ({
  toastData: state.toast,
});

export default connect(mapStateToProps)(Toast);
