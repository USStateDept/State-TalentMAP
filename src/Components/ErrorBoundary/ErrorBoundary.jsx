import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Alert from 'Components/Alert';

class ErrorBoundary extends React.Component {
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
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
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
};

ErrorBoundary.defaultProps = {
  onCatch: EMPTY_FUNCTION,
};

export default ErrorBoundary;
