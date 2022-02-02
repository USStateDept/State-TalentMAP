import { useState } from 'react';
import NavTabs from 'Components/NavTabs';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { useDataLoader } from 'hooks';
import Alert from 'Components/Alert';
import AssignmentHistory from './AssignmentHistory';
import api from '../../../api';

const AgendaItemResearchPane = props => {
  const { perdet } = props;
  const tabs = [
    { text: 'Assignment History', value: 'asgh' },
    { text: 'Frequent Positions', value: 'fp' },
    { text: 'Languages', value: 'l' },
    { text: 'Remarks Glossary', value: 'RG' },
    { text: 'Classifications', value: 'TP' },
    { text: 'another one', value: 'AO' },
    { text: 'another another', value: 'AA' },
  ];

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');

  // assignments
  const { data, error, loading /* , retry */ } = useDataLoader(api().get, `/fsbid/client/${perdet}/`);
  const assignments = get(data, 'data.assignments') || [];

  return (
    <div className="ai-research-pane">
      <MediaQuery breakpoint="screenSmMax" widthType="max">
        {matches => (
          <NavTabs
            passNavValue={setSelectedNav}
            tabs={tabs}
            collapseToDd={matches}
            value={tabs[0].value}
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
          selectedNav === tabs[0].value && !loading && !error &&
            <AssignmentHistory
              assignments={assignments}
            />
        }
      </div>
    </div>
  );
};

AgendaItemResearchPane.propTypes = {
  perdet: PropTypes.string.isRequired,
};

export default AgendaItemResearchPane;
