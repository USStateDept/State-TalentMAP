import { useState } from 'react';
import BackButton from 'Components/BackButton';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import AgendaItemCardView from '../AgendaItemCardView';
import AgendaItemRowView from '../AgendaItemRowView';
import ExportLink from '../../BidderPortfolio/ExportLink';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';

const AgendaItemHistory = () => {
  const [cardView, setCardView] = useState(true);
  const view = cardView ? 'card' : 'row';
  const fakeArr = [2, 3, 4, 2, 7, 3, 4, 7, 1, 1, 2, 3, 4, 5, 6, 1, 3, 2, 3, 2, 2, 3];
  const sorts = AGENDA_ITEM_HISTORY_FILTERS;

  return (
    <div className="agenda-item-history-container">
      <div className="usa-grid-full profile-content-inner-container">
        <ProfileSectionTitle title="Last Name, First Name - Agenda Item History" icon="user-circle-o" />
        <BackButton />
        <div className="usa-grid-full portfolio-controls">
          <div className="usa-width-one-whole results-dropdown agenda-controls-container">
            For Pagination Results
            <div className="agenda-results-controls">
              <button className="usa-button-secondary">
                Create Agenda Item
              </button>
              <ResultsViewBy initial={view} onClick={() => setCardView(!cardView)} />
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
        <div className="ai-history-cards-container">
          {
            cardView &&
              <AgendaItemCardView adder />
          }
          {
            cardView ?
              fakeArr.map(result => (
                <AgendaItemCardView result={result} />
              ))
              :
              fakeArr.map(result => (
                <AgendaItemRowView result={result} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default AgendaItemHistory;
