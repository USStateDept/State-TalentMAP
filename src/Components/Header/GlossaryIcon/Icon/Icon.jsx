import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import InteractiveElement from '../../../InteractiveElement';
import { GLOSSARY_OPEN_ICON_ID } from '../../../../Constants/HtmlAttributes';

const Icon = ({ onClick }) => (
  <InteractiveElement
    className="icon-alert-container glossary-icon"
    id={GLOSSARY_OPEN_ICON_ID}
    type="div"
    title="View the glossary"
    onClick={onClick}
  >
    <FontAwesome name="book" />
    <span>Glossary</span>
  </InteractiveElement>
);

Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

Icon.defaultProps = {
  onClick: EMPTY_FUNCTION,
};

export default Icon;
