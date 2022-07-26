import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';

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

  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const [selectedLegs, setLegs] = useState(FAKE_LEGS);

  useEffect(() => {
    setParentLoadingState(pos_results_loading);
  }, [pos_results_loading]);

  useEffect(() => {
    if (!pos_results_loading && !pos_results_errored) {
      const pos = pos_results;
      if (pos) {
        const legs = [...selectedLegs];
        const pos$ = {
          id: get(pos, 'id'),
          pos_title: get(pos, 'title'),
          pos_num: get(pos, 'position_number'),
          org: get(pos, 'organization'),
          eta: '2019-05-05T00:00:00.000Z',
          ted: '2020-07-05T00:00:00.000Z',
          tod: '2 Years',
          grade: get(pos, 'grade'),
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
    <div className="ai-timeline-pane">
      {
        !unitedLoading &&
          <div className="aim-legs-row">
            <AgendaItemLegsForm onClose={onClose} hideRemarks legs={selectedLegs} showCloseButton />
          </div>
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
