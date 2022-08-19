import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import shortid from 'shortid';
import { useDidMountEffect } from 'hooks';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState, updateLegs,
  asgSepBid, efPos }) => {
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const [legs, setLegs] = useState([]);

  useEffect(() => {
    if (!legs.length && !isEmpty(efPos)) {
      // TODO: waiting for updates to generic pos EP to pull in eta, language
      // and possibly others
      setLegs([{
        ail_seq_num: shortid.generate(),
        pos_title: get(efPos, 'pos_title'),
        pos_num: get(efPos, 'pos_num'),
        org: get(efPos, 'org'),
        eta: 'Coming Soon',
        ted: null,
        language: 'Coming Soon',
        tod: null,
        grade: get(efPos, 'grade'),
        action: null,
        travel: null,
        asg_seq_num: get(efPos, 'id'),
        revision_num: get(efPos, 'revision_num'),
      }]);
    }
  }, [efPos]);

  useEffect(() => {
    setParentLoadingState(pos_results_loading);
  }, [pos_results_loading]);

  useEffect(() => {
    updateLegs(legs);
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

  useEffect(() => {
    if (!isEmpty(asgSepBid)) {
      const legs$ = [...legs];
      // TODO: waiting for updates to generic pos EP to pull in eta, language
      // and possibly others
      legs$.push({
        ail_seq_num: shortid.generate(),
        pos_title: get(asgSepBid, 'pos_title'),
        pos_num: get(asgSepBid, 'pos_num'),
        org: get(asgSepBid, 'org'),
        eta: 'Coming Soon',
        ted: null,
        language: 'Coming Soon',
        tod: null,
        grade: get(asgSepBid, 'grade'),
        action: null,
        travel: null,
      });
      setLegs(legs$);
    }
  }, [asgSepBid]);

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
  updateLegs: PropTypes.func,
  asgSepBid: PropTypes.shape({}),
  efPos: PropTypes.shape({}),
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
  updateLegs: EMPTY_FUNCTION,
  asgSepBid: {},
  efPos: {},
};

export default AgendaItemTimeline;
