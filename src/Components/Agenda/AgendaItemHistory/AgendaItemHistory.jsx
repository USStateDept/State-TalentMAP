import { useEffect, useState } from 'react';
import BackButton from 'Components/BackButton';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { agendaItemHistoryExport, aihFetchData } from 'actions/agendaItemHistory';
import { fetchClient } from 'actions/client';
import { useMount, usePrevious } from 'hooks';
import ExportButton from 'Components/ExportButton';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import AgendaItemCard from '../AgendaItemCard';
import AgendaItemRow from '../AgendaItemRow';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import ScrollUpButton from '../../ScrollUpButton';

const AgendaItemHistory = (props) => {
  const sorts = AGENDA_ITEM_HISTORY_FILTERS;
  const id = get(props, 'match.params.id'); // client's perdet

  const [cardView, setCardView] = useState(false);
  const [sort, setSort] = useState(sorts.defaultSort);
  const [client, setClient] = useState('');
  const [clientIsLoading, setClientIsLoading] = useState(false);
  const [clientHasErrored, setClientHasErrored] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);
  const view = cardView ? 'card' : 'grid';

  const aih = useSelector(state => state.aih);
  const isLoading = useSelector(state => state.aihIsLoading);
  const hasErrored = useSelector(state => state.aihHasErrored);

  // Actions
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(aihFetchData(id, sort));
  };

  const prevSort = usePrevious(sort);

  const exportAgendaItem = () => {
    setExportIsLoading(true);
    agendaItemHistoryExport(id, sort)
      .then(() => {
        setExportIsLoading(false);
        // downloadFromResponse(res);
      })
      .catch(() => {
        setExportIsLoading(false);
      });
  };

  const getClient = () => {
    setClientIsLoading(true);
    setClientHasErrored(false);
    Promise.all([fetchClient(id)])
      .then((res) => {
        setClient(get(res, '[0].name'));
        setClientHasErrored(false);
        setClientIsLoading(false);
      })
      .catch(() => {
        setClientHasErrored(true);
        setClientIsLoading(false);
      });
  };

  useMount(() => {
    getData();
    getClient();
  });

  useEffect(() => {
    if (prevSort && sort && sort !== prevSort) {
      getData();
    }
  }, [sort]);

  const isLoading$ = isLoading || clientIsLoading;
  let title = 'Agenda Item History';
  if (client) {
    title = `${client}'s ${title}`;
  }
  if (clientIsLoading || clientHasErrored) {
    title = '';
  }

  return (
    <div className="agenda-item-history-container">
      <div className="usa-grid-full profile-content-inner-container">
        <ProfileSectionTitle title={title} icon="user-circle-o" />
        <BackButton />
        <div className="usa-grid-full portfolio-controls">
          <div className="usa-width-one-whole results-dropdown agenda-controls-container">
            <div className="agenda-results-controls">
              <ResultsViewBy initial={view} onClick={() => setCardView(!cardView)} />
              <SelectForm
                id="agenda-item-history-results"
                options={sorts.options}
                label="Sort by:"
                defaultSort={sort}
                onSelectOption={e => setSort(get(e, 'target.value'))}
              />
              <div className="export-button-container">
                <ExportButton
                  onClick={exportAgendaItem}
                  isLoading={exportIsLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {
          isLoading$ && !hasErrored && <div className="ai-history-cards-container"><Spinner type="homepage-position-results" size="big" /></div>
        }
        {
          !isLoading$ && !hasErrored && (aih || []).length < 1 &&
          <div className="ai-history-cards-container"><Alert type="info" title="No agenda items" messages={[{ body: 'This user does not have any agenda items.' }]} /></div>
        }
        {
          !isLoading$ && hasErrored &&
          <div className="ai-history-cards-container"><Alert type="error" title="Error loading agenda history" messages={[{ body: 'Please try again.' }]} /></div>
        }
        {
          !isLoading$ && !hasErrored && (aih || []).length > 0 &&
            <>
              {
                cardView &&
                <div className="ai-history-cards-container">
                  {
                    aih.map((result) => (
                      <AgendaItemCard
                        key={result.id}
                        agenda={result}
                        /* use isCreate prop in future */
                      />
                    ))
                  }
                </div>
              }
              {
                !cardView &&
                <div className="ai-history-rows-container">
                  {
                    aih.map((result) => (
                      <AgendaItemRow
                        key={result.id}
                        agenda={result}
                        /* use isCreate prop in future */
                      />
                    ))
                  }
                </div>
              }
            </>
        }
        <ScrollUpButton />
      </div>
    </div>
  );
};

export default withRouter(AgendaItemHistory);
