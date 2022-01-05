import { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Alert from 'Components/Alert';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onCatch(error, errorInfo);
  }

  render() {
    const { fallback } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        fallback ||
        <Alert
          type="error"
          title="An unexpected error has occurred"
          messages={[
            { body: 'Please try refreshing the page or try again later.' },
          ]}
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  onCatch: PropTypes.func,
  fallback: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  onCatch: EMPTY_FUNCTION,
  fallback: '',
};

export default ErrorBoundary;
