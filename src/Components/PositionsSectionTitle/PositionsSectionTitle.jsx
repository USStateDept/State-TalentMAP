import React from 'react';
import PropTypes from 'prop-types';
import PositionsSectionTitleHeader from '../PositionsSectionTitleHeader';
import PositionsSectionTitleViewMore from '../PositionsSectionTitleViewMore';

const PositionsSectionTitle = ({ title }) => (
  <div className="usa-grid-full" style={{ borderBottom: 'solid 1px gray', marginBottom: '10px' }}>
    <div className="usa-width-one-half" style={{ float: 'left' }}>
      <PositionsSectionTitleHeader title={title} />
    </div>
    <div className="usa-width-one-half" style={{ float: 'left', textAlign: 'right' }}>
      <PositionsSectionTitleViewMore />
    </div>
  </div>
);

PositionsSectionTitle.propTypes = {
  title: PropTypes.node,
};

PositionsSectionTitle.defaultProps = {
  title: '',
};

export default PositionsSectionTitle;
