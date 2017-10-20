import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import BidListButton from '../BidListButton';
import { POSITION_DETAILS, GO_BACK_TO_LINK, BID_LIST } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import { shortenString } from '../../utilities';

const PositionTitle = ({ details, goBackLink, toggleBidPosition, bidList,
  bidListToggleIsLoading }) => {
  const postWebSite = details.description && details.description.website ?
    <a href={details.description.website}>{details.description.website}</a> :
    SystemMessages.NO_POSITION_WEB_SITE;
  const pointOfContact = details.description && details.description.point_of_contact ?
    <a href={`tel:${details.description.point_of_contact}`}>{details.description.point_of_contact}</a> :
    SystemMessages.NO_POSITION_POC;
  return (
    <div className="position-details-header-container">
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
              <strong>Post website: </strong>
              {postWebSite}
            </div>
            <div className="usa-width-one-half position-details-header-body">
              <strong>Point of Contact: </strong>
              {pointOfContact}
            </div>
          </div>
        </div>
        <img
          className="position-details-header-image"
          alt="department of state seal"
          src="/assets/img/rsz_dos-seal-bw.png"
        />
      </div>
      <div className="offset-bid-button-container">
        <BidListButton
          toggleBidPosition={toggleBidPosition}
          compareArray={bidList.results}
          id={details.id}
          isLoading={bidListToggleIsLoading}
        />
      </div>
    </div>
  );
};

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  goBackLink: GO_BACK_TO_LINK.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListToggleIsLoading: PropTypes.bool,
};

PositionTitle.defaultProps = {
  details: null,
  bidListToggleIsLoading: false,
};

export default PositionTitle;
