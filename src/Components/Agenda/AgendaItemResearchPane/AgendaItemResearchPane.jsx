import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavTabs from 'Components/NavTabs';
import { get, includes } from 'lodash';
import PropTypes from 'prop-types';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { useDataLoader } from 'hooks';
import Alert from 'Components/Alert';
import Languages from 'Components/ProfileDashboard/Languages/Languages';
import { fetchClassifications, fetchUserClassifications } from 'actions/classifications';
import { addFrequentPositionsData } from 'actions/positions';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AssignmentHistory from './AssignmentHistory';
import FrequentPositions from './FrequentPositions';
import RemarksGlossary from './RemarksGlossary';
import Classifications from './Classifications';
import api from '../../../api';

export const ASGH = 'asgh';
export const FP = 'fp';
export const L = 'l';
export const RG = 'RG';
export const TP = 'TP';
export const AO = 'AO';
export const AA = 'AA';
const tabs = [
  { text: 'Assignment History', value: ASGH },
  { text: 'Frequent Positions', value: FP },
  { text: 'Languages', value: L },
  { text: 'Remarks Glossary', value: RG },
  { text: 'Classifications', value: TP },
];

const AgendaItemResearchPane = forwardRef((props = { perdet: '', clientData: {}, updateSelection: '', userSelection: [], legCount: 0, isReadOnly: false }, ref) => {
  const navTabRef = useRef();
  const dispatch = useDispatch();

  const { perdet, clientData, userSelections, updateSelection, legCount,
    isReadOnly, clientLoading, clientError } = props;

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');
  const classifications = useSelector(state => state.classifications);
  const classificationsError = useSelector(state => state.classificationsHasErrored);
  const classificationsLoading = useSelector(state => state.classificationsIsLoading);
  const clientClassifications = useSelector(state => state.userClassifications);
  const clientClassificationsLoading = useSelector(state => state.userClassificationsIsLoading);
  const clientClassificationsError = useSelector(state => state.userClassificationsHasErrored);

  const classificationsProps = { classifications, clientClassifications };


  const { data: asgHistory, error: asgHistError, loading: asgHistLoading } = useDataLoader(api().get, `/fsbid/assignment_history/${perdet}/`);
  const { data: remarks, error: remarksDataError, loading: remarksDataLoading } = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const { data: frequentPositionsResults, error: frequentPositionsError, loading: frequentPositionsLoading } = useDataLoader(api().get, '/fsbid/positions/frequent_positions/');
  const { data: remarkCategories, error: rmrkCatError, loading: rmrkCatLoading } = useDataLoader(api().get, '/fsbid/agenda/remark-categories/');

  const assignments = get(asgHistory, 'data') || [];
  const languages = get(clientData, 'data.data.languages') || [];

  const remarks_data = remarks?.data?.results?.filter(remark => remark.active_ind === 'Y') || [];
  const remarkCategories_data = get(remarkCategories, 'data.results') || [];
  const frequentPositions = get(frequentPositionsResults, 'data.results') || [];

  const groupLoading = includes([asgHistLoading, remarksDataLoading,
    frequentPositionsLoading, rmrkCatLoading, clientClassificationsLoading,
    classificationsLoading, clientLoading], true);

  const legLimit = legCount >= 10;

  const addFrequentPosition = pos => {
    const posNumber = get(pos, 'pos_num_text') || '';
    if (!legLimit) {
      dispatch(addFrequentPositionsData(`limit=50&page=1&position_num=${posNumber}`));
    }
  };

  useImperativeHandle(ref, () => ({
    setSelectedNav: e => {
      navTabRef.current.setSelectedNav(e);
    },
  }));

  useEffect(() => {
    dispatch(fetchClassifications());
    dispatch(fetchUserClassifications(perdet));
  }, []);

  const loadingSpinner = (<Spinner type="homepage-position-results" size="small" />);
  const errorAlert = (<Alert type="error" title="Error loading data" messages={[{ body: 'This data may not be available.' }]} />);


  function getNavData(navType) {
    switch (navType) {
      case ASGH:
        if (asgHistError) {
          return errorAlert;
        }
        return (<AssignmentHistory
          assignments={assignments}
        />);

      case L:
        if (clientError) {
          return errorAlert;
        }
        return (<Languages
          languagesArray={languages}
          useWrapper
          showHeader={false}
        />);

      case FP:
        if (frequentPositionsError) {
          return errorAlert;
        }
        return (<FrequentPositions
          positions={frequentPositions}
          addFrequentPosition={addFrequentPosition}
          disabled={((legCount >= 10) || isReadOnly)}
        />);

      case TP:
        if (clientClassificationsError || classificationsError) {
          return errorAlert;
        }
        return (<div id="aim-classifications"> {/* needed for css specificity */}
          <Classifications {...classificationsProps} />
        </div>);

      case RG:
        if (remarksDataError || rmrkCatError) {
          return errorAlert;
        }
        return (<RemarksGlossary
          remarks={remarks_data}
          remarkCategories={remarkCategories_data}
          userSelections={userSelections}
          updateSelection={updateSelection}
        />);

      default:
        return errorAlert;
    }
  }

  return (
    <div className="ai-research-pane">
      <MediaQuery breakpoint="screenSmMax" widthType="max">
        {matches => (
          <NavTabs
            passNavValue={setSelectedNav}
            tabs={tabs}
            collapseToDd={matches}
            value={selectedNav}
            ref={navTabRef}
          />
        )}
      </MediaQuery>
      <div className="ai-research-content">
        {
          groupLoading &&
            loadingSpinner
        }
        {
          !groupLoading &&
          getNavData(selectedNav)}
      </div>
    </div>
  );
});

AgendaItemResearchPane.propTypes = {
  perdet: PropTypes.string.isRequired,
  clientData: PropTypes.shape({}),
  updateSelection: PropTypes.func,
  userSelections: PropTypes.arrayOf(
    PropTypes.shape({
      seq_num: PropTypes.number,
      rc_code: PropTypes.string,
      order_num: PropTypes.number,
      short_desc_text: PropTypes.string,
      mutually_exclusive_ind: PropTypes.string,
      text: PropTypes.string,
      active_ind: PropTypes.string,
    }),
  ),
  legCount: PropTypes.number,
  isReadOnly: PropTypes.bool,
  clientLoading: PropTypes.string,
  clientError: PropTypes.string,
};

AgendaItemResearchPane.defaultProps = {
  clientData: {},
  updateSelection: EMPTY_FUNCTION,
  userSelections: [],
  legCount: 0,
  isReadOnly: false,
  clientLoading: '',
  clientError: '',
};

export default AgendaItemResearchPane;
