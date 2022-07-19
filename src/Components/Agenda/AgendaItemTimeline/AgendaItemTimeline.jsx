import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemTimeline = ({ unitedLoading, setParentState }) => {
  const FAKE_LEGS = [
    {
      id: 11158,
      pos_title: 'SPECIAL AGENT',
      pos_num: '57159000',
      org: 'FSI',
      eta: '2029-12-05T00:00:00.000Z',
      ted: '2023-05-01T00:00:00',
      tod: '2 YRS/HLRT/2 YRS',
      grade: 'OM',
    },
    {
      id: 41387,
      pos_title: 'REGIONAL SECURITY OFFICER',
      pos_num: '57019000',
      org: 'A',
      eta: '2019-05-05T00:00:00.000Z',
      ted: '2020-07-05T00:00:00.000Z',
      tod: '1 YEAR',
      grade: '00',
      action: 'Extend',
      travel: null,
    },
  ];

  const pos_results = useSelector(state => state.results);
  const pos_results_loading = useSelector(state => state.resultsIsLoading);

  const [selectedLegs, setLegs] = useState(FAKE_LEGS);

  useEffect(() => {
    setParentState(pos_results_loading);
  }, [pos_results_loading]);

  useEffect(() => {
    if (!pos_results_loading) {
      const pos = get(pos_results, 'results[0]');
      if (pos) {
        const legs = selectedLegs;
        const pos$ = {
          id: get(pos, 'id'),
          // id: get(pos, 'position.id'),
          pos_title: get(pos, 'position.title'),
          pos_num: get(pos, 'position.position_number'),
          org: get(pos, 'position.organization'),
          eta: '2019-05-05T00:00:00.000Z',
          ted: '2020-07-05T00:00:00.000Z',
          tod: get(pos, 'position.tour_of_duty'),
          grade: get(pos, 'position.grade'),
          action: null,
          travel: null,
        };
        legs.push(pos$);
        setLegs(legs);
      }
    }
  }, [pos_results_loading]);

  const onClose = leg => {
    const legs$ = selectedLegs.filter(l => l.id !== leg.id);
    setLegs(legs$);
  };

  return (
    <div className="agenda-item-history-container ai-timeline-pane">
      {
        !unitedLoading &&
          <>
            <div className="ai-history-rows-container">
              <div className="ai-history-row">
                <AgendaItemLegs onClose={onClose} hideRemarks legs={selectedLegs} showCloseButton />
              </div>
            </div>
          </>
      }
    </div>);
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentState: PropTypes.func,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentState: EMPTY_FUNCTION,
};

export default AgendaItemTimeline;
