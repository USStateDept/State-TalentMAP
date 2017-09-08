import React from 'react';
import PositionsSectionTitleHeader from '../PositionsSectionTitleHeader';
import PositionsSectionTitleViewMore from '../PositionsSectionTitleViewMore';

const PositionsSectionTitle = () => (
  <div className="usa-grid-full">
    <div className="usa-width-one-half" style={{ float: 'left' }}>
      <PositionsSectionTitleHeader />
    </div>
    <div className="usa-width-one-half" style={{ float: 'left', textAlign: 'right' }}>
      <PositionsSectionTitleViewMore />
    </div>
  </div>
);

export default PositionsSectionTitle;
