import React from 'react';
import PropTypes from 'prop-types';
import PositionInformation from '../../../ProfileDashboard/PositionInformation';
import ItemList from '../ItemList';
import Spinner from '../../../Spinner';
import AlertAlt from '../../../Alert/AlertAlt';
import { CLIENT_BY_ID } from '../../../../Constants/PropTypes';
import { formatBidTitle, formatWaiverTitle } from '../../../../utilities';
import { DRAFT_PROP, SUBMITTED_PROP } from '../../../../Constants/BidData';

const AdditionalView = ({ client, isLoading, hasErrored }) => {
  const showAlert = !isLoading && hasErrored;
  const showLoading = isLoading && !hasErrored;
  const showDetails = !isLoading && !hasErrored;

  // set to empty arrays until we're ready to render data
  let waiverList = [];
  let draftList = [];
  let submittedList = [];

  // If we're ready to render our waivers, convert objects into formatted
  // strings to display in lists
  const shouldMapWaivers = showDetails && client.waivers && client.waivers.length;
  if (shouldMapWaivers) {
    waiverList = client.waivers.map(waiver => formatWaiverTitle(waiver));
  }

  // And do the same for bids
  const shouldMapBids = showDetails && client.bids && client.bids.length;
  if (shouldMapBids) {
    draftList = client.bids
      .filter(bid => bid.status === DRAFT_PROP)
      .map(bid => formatBidTitle(bid));

    submittedList = client.bids
      .filter(bid => bid.status === SUBMITTED_PROP)
      .map(bid => formatBidTitle(bid));
  }
  return (
    <div className="usa-grid-full bidder-portfolio-additional-container">
      {
        showAlert &&
        <AlertAlt
          title="Error loading additional details"
          message="Try closing and re-opening this section"
          type="error"
        />
      }
      {
        showLoading &&
          <Spinner size="big" inverse type="portfolio-additional" />
      }
      {
        showDetails &&
          <div className="usa-grid-full bidder-portfolio-additional">
            <div className="usa-width-one-third bidder-portfolio-additional-section">
              <PositionInformation assignment={client.current_assignment || {}} />
            </div>
            <div className="usa-width-two-thirds">
              <div className="usa-width-one-whole bidder-portfolio-additional-section">
                <ItemList title="Waiver History" items={waiverList} />
              </div>
              <div className="usa-width-one-half bidder-portfolio-additional-section">
                <ItemList title="Draft Bids" items={draftList} />
              </div>
              <div className="usa-width-one-half bidder-portfolio-additional-section">
                <ItemList title="Submitted Bids" items={submittedList} />
              </div>
            </div>
          </div>
      }
    </div>
  );
};

AdditionalView.propTypes = {
  client: CLIENT_BY_ID.isRequired,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

AdditionalView.defaultProps = {
  isLoading: false,
  hasErrored: false,
};

export default AdditionalView;
