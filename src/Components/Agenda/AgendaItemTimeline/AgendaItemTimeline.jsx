import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState }) => {
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
  // eslint-disable-next-line no-unused-vars
  const [localLoading, setLocalLoading] = useState(true);

  const pos_results = useSelector(state => state.results);
  const pos_results_loading = useSelector(state => state.resultsIsLoading);

  const [selectedLegs, setLegs] = useState(FAKE_LEGS);


  useEffect(() => {
    setTimeout(() => {
      setLocalLoading(false);
      setParentLoadingState(false);
    }, '9000');
  }, []);

  useEffect(() => {
    if (!pos_results_loading) {
      const pos = get(pos_results, 'results[0]');
      if (pos) {
        const legs = [...selectedLegs];
        const pos$ = {
          id: get(pos, 'position.id'),
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

  return (
    <div className="agenda-item-history-container ai-timeline-pane">
      {
        !unitedLoading &&
          <>
            <div className="ai-history-rows-container">
              <div className="ai-history-row">
                <AgendaItemLegs hideRemarks legs={selectedLegs} showCloseButton />
              </div>
            </div>
          </>
      }
    </div>);
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentLoadingState: PropTypes.func,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
};

export default AgendaItemTimeline;
