import { useState } from 'react';
import BackButton from 'Components/BackButton';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import { isEqual } from 'lodash';
import AgendaItemCard from '../AgendaItemCard';
import AgendaItemRow from '../AgendaItemRow';
import ExportLink from '../../BidderPortfolio/ExportLink';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import ScrollUpButton from '../../ScrollUpButton';

const AgendaItemHistory = () => {
  const [cardView, setCardView] = useState(false);
  const view = cardView ? 'card' : 'grid';
  const fakeArr = [2, 3, 4, 2, 7, 3, 4, 7, 1, 1, 2, 3, 4, 5, 6, 1, 3, 2, 3, 2, 2, 3];
  const sorts = AGENDA_ITEM_HISTORY_FILTERS;

  return (
    <div className="agenda-item-history-container">
      <div className="usa-grid-full profile-content-inner-container">
        <ProfileSectionTitle title="Rehman, Tarek - Agenda Item History" icon="user-circle-o" />
        <BackButton />
        <div className="usa-grid-full portfolio-controls">
          <div className="usa-width-one-whole results-dropdown agenda-controls-container">
            <div className="agenda-results-controls">
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
            cardView ?
              fakeArr.map((result, i) => (
                <AgendaItemCard result={result} isFirst={isEqual(i, 0)} />
              ))
              :
              fakeArr.map((result, i) => (
                <AgendaItemRow result={result} isFirst={isEqual(i, 0)} />
              ))
          }
          <ScrollUpButton />
        </div>
      </div>
    </div>
  );
};

export default AgendaItemHistory;
