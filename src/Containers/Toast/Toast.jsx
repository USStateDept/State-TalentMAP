import { Component } from 'react';
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

  notify = ({ type = 'success', message = 'Message', title = '', id, isUpdate, customClassName, options }) => {
    let options$ = {
      autoClose: true,
    };
    let title$;
    if (type === 'success') { title$ = 'Success'; }
    if (type === 'error') { title$ = 'Error'; }
    if (title) { title$ = title; }

    if (isUpdate && this[id]) {
      toast.dismiss(this[id]);
    }

    if (id && !isUpdate) { options$.autoClose = false; }

    options$ = { ...options$, ...options };

    const id$ = id || shortid.generate();

    this[id$] = toast[type](
      <Alert
        type={type}
        title={title$}
        customClassName={customClassName}
        messages={[{ body: message }]}
        isDivided
      />, options$,
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
    customClassName: PropTypes.string,
    options: PropTypes.shape({}),
  }),
};

Toast.defaultProps = {
  toastData: {
    isUpdate: false,
    customClassName: '',
    options: {},
  },
};

const mapStateToProps = state => ({
  toastData: state.toast,
});

export default connect(mapStateToProps)(Toast);
