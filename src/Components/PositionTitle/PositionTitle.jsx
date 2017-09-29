import React from 'react';
import FontAwesome from 'react-fontawesome';
import { POSITION_DETAILS, GO_BACK_TO_LINK } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import { shortenString } from '../../utilities';

const PositionTitle = ({ details, goBackLink }) => (
  <div className="position-details-header">
    <div className="usa-grid positions-details-header-grid">
      <div className="usa-width-one-half">
        <div className="position-details-header-back">
          {
            goBackLink.text && // if goBackLink.text is defined, render...
            <div>
              <FontAwesome name="arrow-left" />
                  &nbsp;
              <a
                className="back-link"
                tabIndex="0"
                role="link"
                onClick={() => window.history.back()}
              >
                {goBackLink.text}
              </a>
            </div>
          }
        </div>
        <div className="position-details-header-title">
          <strong>Position Number: {details.position_number}</strong>
        </div>
        <p className="position-details-header-body">
          <strong>Description: </strong>
          {
            details.description && details.description.content ?
              shortenString(details.description.content) :
              SystemMessages.NO_POSITION_DESCRIPTION
          }
        </p>
        <div className="usa-width-one-half position-details-header-body">
          <strong>Post website:</strong> <a href="https://www.state.gov">www.state.gov</a>
        </div>
        <div className="usa-width-one-half position-details-header-body">
          <strong>Point of Contact:</strong> <a href="tel:222-222-2222">222-222-2222</a>
        </div>
      </div>
    </div>
    <img
      className="position-details-header-image"
      alt="department of state seal"
      src="/assets/img/rsz_dos-seal-bw.png"
    />
  </div>
);

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  goBackLink: GO_BACK_TO_LINK.isRequired,
};

PositionTitle.defaultProps = {
  details: null,
};

export default PositionTitle;
