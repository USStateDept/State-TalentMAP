import { useEffect, useState } from 'react';
import BackButton from 'Components/BackButton';
import { AGENDA_ITEM_HISTORY_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import { get, isNil } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { agendaItemHistoryExport, aihFetchData } from 'actions/agendaItemHistory';
import { useMount, usePrevious } from 'hooks';
import ExportButton from 'Components/ExportButton';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import { checkFlag } from 'flags';
import FontAwesome from 'react-fontawesome';
import AgendaItemCard from '../AgendaItemCard';
import AgendaItemRow from '../AgendaItemRow';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import ScrollUpButton from '../../ScrollUpButton';

const useAgendaItemMaintenance = () => checkFlag('flags.agenda_item_maintenance');

const AgendaItemHistory = (props) => {
  const sorts = AGENDA_ITEM_HISTORY_FILTERS;
  const perdet = get(props, 'match.params.id');
  const isCDO = get(props, 'isCDO');
  const viewType = get(props, 'viewType');
  const showAgendaItemMaintenance = useAgendaItemMaintenance();

  const [cardView, setCardView] = useState(false);
  const [sort, setSort] = useState(sorts.defaultSort);

  const [exportIsLoading, setExportIsLoading] = useState(false);
  const view = cardView ? 'card' : 'grid';

  const aihResults = useSelector(state => state.aih);
  const isLoading = useSelector(state => state.aihIsLoading);
  const hasErrored = useSelector(state => state.aihHasErrored);

  const aih = get(aihResults, 'results.results') || [];

  const employee = get(aihResults, 'employee.results', [])[0] || {};
  const employeeName = get(employee, 'person.fullName') || '';

  const employeeHasCDO = !isNil(get(employee, 'person.cdo'));

  let profileLink;
  switch (viewType) {
    case 'ao':
      profileLink = employeeHasCDO ?
        (
          <Link to={`/profile/public/${perdet}/ao`}>
            <span className="aih-title">
              {` ${employeeName}`}
            </span>
          </Link>
        ) : employeeName;
      break;
    case 'cdo':
      profileLink = isCDO && employeeHasCDO ?
        (<Link to={`/profile/public/${perdet}`}>
          <span className="aih-title">
            {` ${employeeName}`}
          </span>
        </Link>)
        : employeeName;
      break;
    default:
      profileLink = employeeName;
      break;
  }

  // Actions
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(aihFetchData(perdet, sort));
  };

  const prevSort = usePrevious(sort);

  const exportAgendaItem = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      agendaItemHistoryExport(perdet, sort, employeeName.replaceAll(' ', '_'))
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
  };

  useMount(() => {
    getData();
  });

  useEffect(() => {
    if (prevSort && sort && sort !== prevSort) {
      getData();
    }
  }, [sort]);

  const isLoading$ = isLoading;

  const exportDisabled = (aih || []).length <= 0;

  return (
    <div className="agenda-item-history-container">
      <div className="aih-header-container">
        <FontAwesome
          name="user-circle-o"
          size="lg"
        />
        Agenda Item History
        {
          <span className="aih-title-dash">
              -
            {profileLink}
          </span>
        }
      </div>
      <div className="usa-grid-full profile-content-inner-container">
        <BackButton />
        <div className="usa-grid-full portfolio-controls">
          <div className="usa-width-one-whole results-dropdown agenda-controls-container">
            <div className="agenda-results-controls">
              <ResultsViewBy initial={view} onClick={e => setCardView(e === 'card')} />
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
                  disabled={exportDisabled}
                />
              </div>
            </div>
          </div>
        </div>
        {
          isLoading$ && !hasErrored && <div className="ai-history-cards-container"><Spinner type="agenda-item-history" size="big" /></div>
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
          !isLoading$ && !hasErrored &&
            <>
              {
                cardView &&
                <div className="ai-history-cards-container">
                  {
                    showAgendaItemMaintenance &&
                      <AgendaItemCard
                        isCreate
                        isCDO={isCDO}
                        perdet={perdet}
                      />
                  }
                  {
                    aih.map(result => (
                      <AgendaItemCard
                        key={result.id}
                        agenda={result}
                        isCDO={isCDO}
                        isAIHView
                      />
                    ))
                  }
                </div>
              }
              {
                !cardView &&
                <div className="agenda-item-row-container">
                  {
                    showAgendaItemMaintenance &&
                      <AgendaItemRow
                        isCreate
                        isCDO={isCDO}
                        perdet={perdet}
                      />
                  }
                  {
                    aih.map(result => (
                      <AgendaItemRow
                        agenda={result}
                        key={result.id}
                        isCDO={isCDO}
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
