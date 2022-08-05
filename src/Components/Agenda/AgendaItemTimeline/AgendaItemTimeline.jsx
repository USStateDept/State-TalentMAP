import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import shortid from 'shortid';
import { useDidMountEffect } from 'hooks';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState, updateLegCount }) => {
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const [legs, setLegs] = useState([]);

  useEffect(() => {
    setParentLoadingState(pos_results_loading);
  }, [pos_results_loading]);

  useEffect(() => {
    updateLegCount(legs.length);
  }, [legs]);

  useDidMountEffect(() => {
    if (!pos_results_loading && !pos_results_errored) {
      if (pos_results) {
        const legs$ = [...legs];
        // TODO: waiting for updates to generic pos EP to pull in eta, language
        // and possibly others
        legs$.push({
          ail_seq_num: shortid.generate(),
          pos_title: get(pos_results, 'title'),
          pos_num: get(pos_results, 'position_number'),
          org: get(pos_results, 'organization'),
          eta: 'Coming Soon',
          ted: null,
          language: 'Coming Soon',
          tod: null,
          grade: get(pos_results, 'grade'),
          action: null,
          travel: null,
        });
        setLegs(legs$);
      }
    }
  }, [pos_results]);

  const onClose = leg => {
    const legs$ = legs.filter(l => l.ail_seq_num !== leg.ail_seq_num);
    setLegs(legs$);
  };

  const updateLeg = (legID, dropdown, value) => {
    const temp = [...legs];
    const legToModify = temp.findIndex(l => l.ail_seq_num === legID);
    temp[legToModify][dropdown] = value;
    setLegs(temp);
  };

  return (
    !unitedLoading &&
      <AgendaItemLegsForm onClose={onClose} legs={legs} updateLeg={updateLeg} />
  );
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentLoadingState: PropTypes.func,
  updateLegCount: PropTypes.func,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
  updateLegCount: EMPTY_FUNCTION,
};

export default AgendaItemTimeline;
