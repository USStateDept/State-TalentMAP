import { useState } from 'react';
import BidderPortfolioSearch from '../../../Components/BidderPortfolio/BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ExportLink from '../../BidderPortfolio/ExportLink';
import BackButton from '../../BackButton';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';

const AgendaItemHistory = () => {
  const [viewType, setViewType] = useState('true');
  const view = viewType ? 'card' : 'row';

  return (
    <div>
      <div className="bidder-portfolio-page card-view">
        <div className="usa-grid-full results-search-bar-container">
          <ProfileSectionTitle title="Last Name, First Name - Agenda Item History" icon="user-circle-o" />
          <BidderPortfolioSearch />
        </div>
        <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
          <div className="usa-grid-full">
            <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
              <BackButton />
              <div>
                <ResultsViewBy initial={view} onClick={() => setViewType(!viewType)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ExportLink disabled={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaItemHistory;
