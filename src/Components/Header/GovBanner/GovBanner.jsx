import React from 'react';
import { getAssetPath } from '../../../utilities';

const dosSeal = getAssetPath('/assets/img/rsz_dos-seal.png');

const GovBanner = () => (
  <div className="usa-banner">
    <div className="usa-accordion">
      <header className="usa-banner-header">
        <div className="usa-grid usa-banner-inner padded-main-content">
          <img src={flag} alt="U.S. flag" />
          <p>An official website of the United States government</p>
          <button
            className="usa-accordion-button usa-banner-button"
            aria-expanded="false"
            aria-controls="gov-banner"
          >
            <span className="usa-banner-button-text">Here&#39;s how you know&nbsp;</span>
          </button>
        </div>
      </header>
    </div>
  </div>
);

export default GovBanner;
