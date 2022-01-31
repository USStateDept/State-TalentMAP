import { useState } from 'react';
import NavTabs from 'Components/NavTabs';
import { get } from 'lodash';
import MediaQuery from '../../MediaQuery';

// eslint-disable-next-line no-unused-vars
const AgendaItemResearchPane = props => {
  const tabs = [
    { text: 'Assignment History', value: 'asgh' },
    { text: 'Frequent Positions', value: 'fp' },
    { text: 'Languages', value: 'l' },
    { text: 'Remarks Glossary', value: 'RG' },
    { text: 'Classifications', value: 'TP' },
    { text: 'another one', value: 'AO' },
    { text: 'another another', value: 'AA' },
  ];

  // eslint-disable-next-line no-unused-vars
  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');

  return (
    <div className="ai-research-pane">
      <MediaQuery breakpoint="screenSmMax" widthType="max">
        {matches => (
          <NavTabs passNavValue={setSelectedNav} tabs={tabs} collapseToDd={matches} />
        )}
      </MediaQuery>
    </div>
  );
};


AgendaItemResearchPane.propTypes = {

};


AgendaItemResearchPane.defaultProps = {


};

export default AgendaItemResearchPane;
