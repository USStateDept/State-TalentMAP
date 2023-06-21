import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import shortid from 'shortid';
import { useDidMountEffect } from 'hooks';
import { AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';
import AgendaItemLegsFormReadOnly from '../AgendaItemLegsFormReadOnly';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState, updateLegs,
  asgSepBid, efPos, agendaItemLegs, fullAgendaItemLegs, readMode, AIvalidation }) => {
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const [legs, setLegs] = useState(agendaItemLegs);

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
        legs$.push({
          ail_seq_num: shortid.generate(),
          pos_title: get(pos_results, 'title'),
          pos_num: get(pos_results, 'position_number'),
          posSeqNum: get(pos_results, 'pos_seq_num'),
          org: get(pos_results, 'organization'),
          legStartDate: get(pos_results, 'start_date'),
          legEndDate: null,
          languages: get(pos_results, 'languages'),
          tod: null,
          tod_months: null,
          tod_long_desc: null,
          tod_short_desc: null,
          tod_is_dropdown: true,
          grade: get(pos_results, 'grade'),
          legActionType: null,
          travelFunctionCode: null,
        });
        setLegs(legs$);
      }
    }
  }, [pos_results]);

  useEffect(() => {
    if (!isEmpty(asgSepBid)) {
      const legs$ = [...legs];
      legs$.push({
        ail_seq_num: shortid.generate(),
        pos_title: get(asgSepBid, 'pos_title'),
        pos_num: get(asgSepBid, 'pos_num'),
        posSeqNum: get(asgSepBid, 'pos_seq_num'),
        cpId: get(asgSepBid, 'cp_id'),
        legAssignmentId: get(asgSepBid, 'asg_seq_num'),
        legAssignmentVersion: get(asgSepBid, 'revision_num'),
        org: get(asgSepBid, 'org'),
        legStartDate: 'Coming Soon',
        legEndDate: null,
        languages: get(asgSepBid, 'languages'),
        tod: null,
        tod_months: null,
        tod_long_desc: null,
        tod_short_desc: null,
        tod_is_dropdown: true,
        grade: get(asgSepBid, 'grade'),
        legActionType: null,
        travelFunctionCode: null,
      });
      setLegs(legs$);
    }
  }, [asgSepBid]);

  const onClose = leg => {
    const legs$ = legs.filter(l => l.ail_seq_num !== leg.ail_seq_num);
    setLegs(legs$);
  };

  const updateLeg = (legID, dropdownValues) => {
    const temp = [...legs];
    const legToModify = temp.findIndex(l => l.ail_seq_num === legID);
    Object.keys(dropdownValues).forEach(d => {
      temp[legToModify][d] = dropdownValues[d];
    });
    setLegs(temp);
  };

  return (
    !unitedLoading &&
    readMode ?
      <AgendaItemLegsFormReadOnly
        legs={fullAgendaItemLegs}
      />
      :
      <AgendaItemLegsForm
        AIvalidation={AIvalidation}
        efPos={efPos}
        isReadOnly={readMode}
        legs={legs}
        onClose={onClose}
        updateLeg={updateLeg}
      />
  );
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentLoadingState: PropTypes.func,
  updateLegs: PropTypes.func,
  asgSepBid: PropTypes.shape({}),
  efPos: PropTypes.shape({}),
  agendaItemLegs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  fullAgendaItemLegs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  readMode: PropTypes.bool,
  AIvalidation: AI_VALIDATION,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
  updateLegs: EMPTY_FUNCTION,
  asgSepBid: {},
  efPos: {},
  agendaItemLegs: [],
  fullAgendaItemLegs: [],
  readMode: false,
  AIvalidation: {},
};

export default AgendaItemTimeline;
