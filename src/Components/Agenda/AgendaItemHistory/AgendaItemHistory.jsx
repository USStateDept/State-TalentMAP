import { useState } from 'react';
import BidderPortfolioSearch from '../../BidderPortfolio/BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ExportLink from '../../BidderPortfolio/ExportLink';
import BackButton from '../../BackButton';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';

const AgendaItemHistory = () => {
  const [viewType, setViewType] = useState(true);
  const view = viewType ? 'card' : 'row';

  return (
    <div>
      <div className="bidder-portfolio-page">
        <BidderPortfolioSearch />
        <div className="usa-grid-full profile-content-inner-container">
          <ProfileSectionTitle title="Last Name, First Name - Agenda Item History" icon="user-circle-o" />
        </div>
        <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
          <div className="usa-grid-full">
            <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
              <BackButton />
              <div>
                <ResultsViewBy initial={view} onClick={() => setViewType(!viewType)} />
              </div>
              <div className="export-button">
                <ExportLink disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaItemHistory;
