import { useState } from 'react';
import BackButton from 'Components/BackButton';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import shortid from 'shortid';
import SelectForm from 'Components/SelectForm';
import { slice } from 'lodash';
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
  const agendaItemData = {
    legs: [
      {
        position: 'FACILITY MANAGER',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/16',
        ted: '9/5/18',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: '',
        travel: '',
      },
      {
        position: 'SPECIAL ENVOY AND COORDINATOR',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/18',
        ted: '12/17/20',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'TRAINING',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '3/15/20',
        ted: '9/5/22',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'INFO MANAGENT',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '6/22/22',
        ted: '12/17/24',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien purus, fermentum ac fringilla faucibus, pretium ac mi. Nam placerat molestie semper. Maecenas consectetur, massa quis hendrerit euismod, erat urna mattis risus, id rhoncus leo nisl eu arcu. Sed ac lacinia enim, vel porttito',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/16',
        ted: '9/5/18',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'DEPUTY REGIONAL SECURITY OFFIC',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/18',
        ted: '12/17/20',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'INFORMATION TECHNOLOGY MANAGEM',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '3/15/20',
        ted: '9/5/22',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
    ],
    panelDate: '8/3/2021',
    status: '',
  };

  const sorts = AGENDA_ITEM_HISTORY_FILTERS;

  // temp until integration
  const agendaItemDataCards = () => {
    const aIDataC = agendaItemData;
    aIDataC.legs = slice(agendaItemData.legs, 0, 2);
    return aIDataC;
  };

  return (
    <div className="agenda-item-history-container">
      <div className="usa-grid-full profile-content-inner-container">
        <ProfileSectionTitle title="Rehman, Tarek - Agenda Item History" icon="user-circle-o" />
        <BackButton />
        <div className="usa-grid-full portfolio-controls">
          <div className="usa-width-one-whole results-dropdown agenda-controls-container">
            <div className="agenda-results-controls">
              <ResultsViewBy initial={view} onClick={() => setCardView(!cardView)} />
              <SelectForm
                id="agenda-item-history-results"
                options={sorts.options}
                label="Sort by:"
              />
              <ExportLink disabled />
            </div>
          </div>
        </div>
        {
          cardView &&
            <div className="ai-history-cards-container">
              {
                fakeArr.map((result, i) => (
                  <AgendaItemCard
                    key={shortid.generate()}
                    result={result}
                    isFirst={i === 0}
                    fakeData={agendaItemDataCards()}
                  />
                ))
              }
            </div>
        }
        {
          !cardView &&
          <div className="ai-history-rows-container">
            {
              fakeArr.map((result, i) => (
                <AgendaItemRow
                  key={shortid.generate()}
                  isFirst={i === 0}
                  fakeData={agendaItemData}
                />
              ))
            }
          </div>
        }
        <ScrollUpButton />
      </div>
    </div>
  );
};

export default AgendaItemHistory;
