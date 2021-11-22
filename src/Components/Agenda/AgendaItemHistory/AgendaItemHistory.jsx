import { useState } from 'react';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import BidderPortfolioSearch from '../../BidderPortfolio/BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ExportLink from '../../BidderPortfolio/ExportLink';
import BackButton from '../../BackButton';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';

const AgendaItemHistory = () => {
  const [viewType, setViewType] = useState(true);
  const [item, setItem] = useState(true);
  const view = viewType ? 'card' : 'row';
  const sorts = AGENDA_ITEM_HISTORY_FILTERS;

  // will need to be updated
  // with the create functionality
  // functionality will be done in the card ticket
  const createItem = () => {
    setItem(!item);
  };

  return (
    <div>
      <div className="employee-agenda-page">
        <BidderPortfolioSearch />
        <div className="usa-grid-full profile-content-inner-container">
          <ProfileSectionTitle title="Last Name, First Name - Agenda Item History" icon="user-circle-o" />
        </div>
        <div className="usa-grid-full profile-content-inner-container">
          <div className="usa-grid-full">
            <div className="usa-width-one-whole">
              <BackButton />
              <div className="usa-width-one-whole results-dropdown agenda-controls-container">
                <button className="create-item-button" onClick={createItem}>Create</button>
                <div className="agenda-controls-right">
                  <div className="agenda-results-controls">
                    <ResultsViewBy initial={view} onClick={() => setViewType(!viewType)} />
                    {/* still needs to be intergrated into */}
                    <SelectForm
                      id="agenda-item-history-results"
                      options={sorts.options}
                      label="Sort by:"
                    />
                    <ExportLink disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaItemHistory;
