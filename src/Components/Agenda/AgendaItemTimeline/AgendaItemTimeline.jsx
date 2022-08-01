import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import shortid from 'shortid';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState }) => {
  const FAKE_LEGS = [
    {
      ail_seq_num: shortid.generate(),
      pos_title: 'SPECIAL AGENT',
      pos_num: '57159000',
      org: 'FSI',
      eta: '2029-12-05T00:00:00.000Z',
      ted: '2023-05-01T00:00:00',
      tod: '2 YRS/HLRT/2 YRS',
      grade: 'OM',
    },
    {
      ail_seq_num: shortid.generate(),
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
        // TODO: waiting for updates to generic pos EP to pull in eta, language
        // and possibly others
        const pos$ = {
          ail_seq_num: shortid.generate(),
          pos_title: get(pos, 'title'),
          pos_num: get(pos, 'position_number'),
          org: get(pos, 'organization'),
          eta: '2019-05-05T00:00:00.000Z',
          ted: null,
          language: 'FR 3/2, SP 1/1+, RS 0+/0+',
          tod: null,
          grade: get(pos, 'grade'),
          action: null,
          travel: null,
        };
        legs.push(pos$);
        setLegs(legs);
      }
    }
  }, [pos_results]);

  const onClose = leg => {
    const legs$ = selectedLegs.filter(l => l.ail_seq_num !== leg.ail_seq_num);
    setLegs(legs$);
  };

  const updateLeg = leg => {
    // eslint-disable-next-line no-console
    console.log('current: leg', leg);
  };

  return (
    !unitedLoading &&
      <AgendaItemLegsForm onClose={onClose} legs={selectedLegs} updateLeg={updateLeg} />
  );
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
