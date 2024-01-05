import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, isEmpty, isEqual } from 'lodash';
import shortid from 'shortid';
import { useDidMountEffect, usePrevious } from 'hooks';
import { AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';
import AgendaItemLegsFormReadOnly from '../AgendaItemLegsFormReadOnly';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState, updateLegs,
  asgSepBid, efPos, agendaItemLegs, fullAgendaItemLegs, readMode, AIvalidation, isNewSeparation,
  updateResearchPaneTab, setLegsContainerExpanded, location, activeAIL, setActiveAIL,
  setLocation, legsData,
}) => {
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const [legs, setLegs] = useState(agendaItemLegs);

  const usePrevIsNewSeparation = usePrevious(isNewSeparation);
  const usePrevAgendaItemLegs = usePrevious(agendaItemLegs);

  useEffect(() => {
    setParentLoadingState(pos_results_loading);
  }, [pos_results_loading]);

  // Always call parent update method whenever legs form changes
  useEffect(() => {
    updateLegs(legs);
  }, [legs]);

  // Set legs to original data if it has been changed i.e. the page has reloaded
  // agenda data
  useEffect(() => {
    if (!isEqual(usePrevAgendaItemLegs, agendaItemLegs)) {
      setLegs(agendaItemLegs);
    }
  }, [agendaItemLegs]);

  // Adds a leg when a position is loaded in redux
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
          eta: get(pos_results, 'start_date'),
          ted: null,
          languages: get(pos_results, 'languages'),
          tod: null,
          tod_months: null,
          tod_long_desc: null,
          tod_short_desc: null,
          tod_is_dropdown: true,
          grade: get(pos_results, 'grade'),
          action_code: null,
          travel_code: null,
          pay_plan: get(pos_results, 'pay_plan'),
        });
        setLegs(legs$);
      }
    }
  }, [pos_results]);

  // Adds a leg when an assignment/separation/bid is selected
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
        eta: null,
        ted: null,
        languages: get(asgSepBid, 'languages'),
        tod: null,
        tod_months: null,
        tod_long_desc: null,
        tod_short_desc: null,
        tod_is_dropdown: true,
        grade: get(asgSepBid, 'grade'),
        action_code: null,
        travel_code: null,
        pay_plan: null,
      });
      setLegs(legs$);
    }
  }, [asgSepBid]);

  // Adds a new separation leg when selected
  useDidMountEffect(() => {
    if (isNewSeparation !== usePrevIsNewSeparation) {
      const legs$ = [...legs];
      legs$.push({
        ail_seq_num: shortid.generate(),
        pos_title: '-',
        pos_num: null,
        posSeqNum: null,
        cpId: null,
        legAssignmentId: null,
        legAssignmentVersion: null,
        org: null,
        separation_location: null,
        eta: null,
        ted: null,
        languages: [],
        tod: null,
        tod_months: null,
        tod_long_desc: null,
        tod_short_desc: null,
        tod_is_dropdown: false,
        grade: null,
        action_code: null,
        travel_code: 'Separation from the Service',
        is_separation: true,
      });
      setLegs(legs$);
    }
  }, [isNewSeparation]);


  const onClose = leg => {
    const legs$ = legs.filter(l => l.ail_seq_num !== leg.ail_seq_num);
    setLegs(legs$);
    setActiveAIL(null);
  };

  const updateLeg = (legID, dropdownValues) => {
    const temp = [...legs];
    const legToModify = temp.findIndex(l => l.ail_seq_num === legID);
    Object.keys(dropdownValues).forEach(d => {
      temp[legToModify][d] = dropdownValues[d];
    });
    setLegs(temp);
  };

  useEffect(() => {
    if (location && activeAIL) {
      updateLeg(activeAIL, { separation_location: location });
      setActiveAIL(null);
      setLocation(null);
    }
  }, [location]);

  return (
    !unitedLoading && (
      readMode ?
        <AgendaItemLegsFormReadOnly
          legs={fullAgendaItemLegs}
        /> :
        <AgendaItemLegsForm
          AIvalidation={AIvalidation}
          efPos={efPos}
          legs={legs}
          setActiveAIL={setActiveAIL}
          updateLeg={updateLeg}
          updateResearchPaneTab={updateResearchPaneTab}
          setLegsContainerExpanded={setLegsContainerExpanded}
          onClose={onClose}
          legsData={legsData}
        />
    )
  );
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentLoadingState: PropTypes.func,
  updateResearchPaneTab: PropTypes.func,
  updateLegs: PropTypes.func,
  setLegsContainerExpanded: PropTypes.func,
  setActiveAIL: PropTypes.func,
  setLocation: PropTypes.func,
  asgSepBid: PropTypes.shape({}),
  efPos: PropTypes.shape({}),
  location: PropTypes.shape({}),
  agendaItemLegs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  isNewSeparation: PropTypes.bool,
  fullAgendaItemLegs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  readMode: PropTypes.bool,
  AIvalidation: AI_VALIDATION,
  activeAIL: PropTypes.string,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
  updateResearchPaneTab: EMPTY_FUNCTION,
  setLegsContainerExpanded: EMPTY_FUNCTION,
  updateLegs: EMPTY_FUNCTION,
  setActiveAIL: EMPTY_FUNCTION,
  setLocation: EMPTY_FUNCTION,
  asgSepBid: {},
  efPos: {},
  agendaItemLegs: [],
  isNewSeparation: false,
  fullAgendaItemLegs: [],
  readMode: false,
  AIvalidation: {},
  activeAIL: '',
  location: {},
};

export default AgendaItemTimeline;
