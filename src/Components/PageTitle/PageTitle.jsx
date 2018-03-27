import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  pageTitle: PropTypes.string.isRequired,
  srOnly: PropTypes.bool,
};

const defaultProps = {
  srOnly: false,
};

const PageTitle = ({ pageTitle, srOnly }) => (
  <h1 className={srOnly ? 'sr-only' : ''}>{pageTitle}</h1>
);

PageTitle.propTypes = propTypes;

PageTitle.defaultProps = defaultProps;

export default PageTitle;
