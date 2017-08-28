import React from 'react';
import PropTypes from 'prop-types';
import Pill from '../Pill/Pill';

const ResultsContainer = ({ items }) => (
  <div>
    {
      items.map(item =>
        <Pill name={item.name} code={item.code} onClick={e => this.props.onClick(e)} />,
      )
    }
  </div>
  );

ResultsContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    }),
  ).isRequired,
};

ResultsContainer.defaultProps = {
  items: [],
};

export default ResultsContainer;
