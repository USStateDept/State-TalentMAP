import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavTabs from 'Components/NavTabs';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { useDataLoader } from 'hooks';
import Alert from 'Components/Alert';
import Languages from 'Components/ProfileDashboard/Languages/Languages';
import { fetchClassifications, fetchUserClassifications } from 'actions/classifications';
import AssignmentHistory from './AssignmentHistory';
import FrequentPositions from './FrequentPositions';
import RemarksGlossary from './RemarksGlossary';
import Classifications from './Classifications';
import api from '../../../api';

/* TODO replace with real data */
let positions = [
  { org: 'ORG NAME',
    position_number: '0000000000',
    position_title: 'ECONOMIC OFFICER LONGER NAME HERE (' },
  { org: 'A',
    position_number: '0000100000',
    position_title: 'ECONOMIC OFFICER' },
  { org: 'ORG NAME',
    position_number: '0000000000',
    position_title: 'TRAINING' },
];
positions = [...positions, ...positions, ...positions, ...positions];
/* end TODO */

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

const AgendaItemResearchPane = forwardRef((props = { perdet: '' }, ref) => {
  const navTabRef = useRef();
  const dispatch = useDispatch();

  const { perdet } = props;

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');
  const classifications = useSelector(state => state.classifications);
  const clientClassifications = useSelector(state => state.userClassifications);

  const classificationsProps = { classifications, clientClassifications };

  // assignments
  // need to update once fully integrated
  const { data, error, loading /* , retry */ } = useDataLoader(api().get, `/fsbid/assignment_history/${perdet}/`);
  const client_data = useDataLoader(api().get, `/fsbid/client/${perdet}/`);
  const remarks = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const remarkCategories = useDataLoader(api().get, '/fsbid/agenda/remark-categories/');

  const assignments = get(data, 'data') || [];
  const languages = get(client_data, 'data.data.languages') || [];
  const remarks_data = get(remarks, 'data.data.results') || [];
  const remarkCategories_data = get(remarkCategories, 'data.data.results') || [];

  const onFPClick = pos => {
    // TODO - do something with this
    // eslint-disable-next-line
    console.log(pos);
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
          loading && !error &&
            <Spinner type="homepage-position-results" size="small" />
        }
        {
          !loading && error &&
            <Alert type="error" title="Error loading data" messages={[{ body: 'This data may not be available.' }]} />
        }
        {
          selectedNav === ASGH && !loading && !error &&
            <AssignmentHistory
              assignments={assignments}
            />
        }
        {
          selectedNav === L && !loading && !error &&
            <Languages
              languagesArray={languages}
              useWrapper
            />
        }
        {
          selectedNav === FP && !loading && !error &&
            <FrequentPositions
              positions={positions}
              onClick={onFPClick}
            />
        }
        {
          selectedNav === TP && !loading && !error &&
          <div id="aim-classifications"> {/* needed for css specificity */}
            <Classifications {...classificationsProps} />
          </div>
        }
        {
          selectedNav === RG && !loading && !error &&
            <RemarksGlossary
              remarks={remarks_data}
              remarkCategories={remarkCategories_data}
            />
        }
      </div>
    </div>
  );
});

AgendaItemResearchPane.propTypes = {
  perdet: PropTypes.string.isRequired,
};

export default AgendaItemResearchPane;
