import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import shortid from 'shortid';
import { useDidMountEffect } from 'hooks';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegsForm from '../AgendaItemLegsForm';

const AgendaItemTimeline = ({ unitedLoading, setParentLoadingState, updateLegs,
  // eslint-disable-next-line no-unused-vars
  asgSepBid, efPos, agendaItemLegs, isReadOnly }) => {
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const legacyLeg = [
    {
      id: 127613,
      ail_seq_num: 307089,
      pos_title: 'TEST LEGACY LEG',
      pos_num: '55004008',
      org: 'CSO',
      eta: '2017-10-21T00:00:00.000Z',
      ted: '2018-09-21T00:00:00.000Z',
      tod: 'Legacy TOD Value',
      grade: '00',
      languages: [
        {
          language: 'HUNGARIAN',
          spoken_proficiency: '3',
          reading_proficiency: '3',
          code: 'HU',
          representation: 'HUNGARIAN (HU) 3/3',
        },
        {
          language: 'ARABIC EGYPTIAN',
          spoken_proficiency: '2',
          reading_proficiency: '2',
          code: 'AE',
          representation: 'ARABIC EGYPTIAN (AE) 2/2',
        },
      ],
      action: 'Legacy Action Value',
      travel: 'Legacy Travel Value',
      tourOfDutyCode: 'Legacy TOD Value',
      legActionType: 'Legacy Action Value',
      travelFunctionCode: 'Legacy Travel Value',
    },
  ];
  // const [legs, setLegs] = useState(agendaItemLegs);
  const [legs, setLegs] = useState(legacyLeg);

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
          posSeqNum: get(pos_results, 'pos_seq_num'),
          org: get(pos_results, 'organization'),
          legStartDate: get(pos_results, 'start_date'),
          legEndDate: null,
          languages: get(pos_results, 'languages'),
          tourOfDutyCode: null,
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
        tourOfDutyCode: null,
        grade: get(asgSepBid, 'grade'),
        legActionType: null,
        travelFunctionCode: null,
      });
      setLegs(legs$);
    }
  }, [asgSepBid]);

  const onClose = leg => {
    if (!isReadOnly) {
      const legs$ = legs.filter(l => l.ail_seq_num !== leg.ail_seq_num);
      setLegs(legs$);
    }
  };

  const updateLeg = (legID, dropdown, value) => {
    const temp = [...legs];
    const legToModify = temp.findIndex(l => l.ail_seq_num === legID);
    temp[legToModify][dropdown] = value;
    setLegs(temp);
  };

  return (
    !unitedLoading &&
      <AgendaItemLegsForm
        onClose={onClose}
        legs={legs}
        updateLeg={updateLeg}
        efPos={efPos}
        isReadOnly={isReadOnly}
      />
  );
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentLoadingState: PropTypes.func,
  updateLegs: PropTypes.func,
  asgSepBid: PropTypes.shape({}),
  efPos: PropTypes.shape({}),
  agendaItemLegs: PropTypes.arrayOf({}),
  isReadOnly: PropTypes.bool,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentLoadingState: EMPTY_FUNCTION,
  updateLegs: EMPTY_FUNCTION,
  asgSepBid: {},
  efPos: {},
  agendaItemLegs: [],
  isReadOnly: false,
};

export default AgendaItemTimeline;
