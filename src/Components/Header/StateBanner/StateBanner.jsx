import React from 'react';
import { getAssetPath } from '../../../utilities';

const dosSeal = getAssetPath('/assets/img/rsz_dos-seal.png');

const StateBanner = () => (
  <div className="usa-banner">
    <div className="usa-accordion">
      <header className="usa-banner-header">
        <div className="usa-grid usa-banner-inner padded-main-content">
          <img src={dosSeal} alt="U.S. flag" />
          <p>This is a product of the Department of State</p>
        </div>
      </header>
    </div>
  </div>
);

export default StateBanner;
