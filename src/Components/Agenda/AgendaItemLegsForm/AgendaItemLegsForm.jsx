import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, includes, isEmpty } from 'lodash';
import { AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaLeg from '../AgendaLeg';
import Alert from '../../Alert';

const AgendaItemLegsForm = props => {
  const {
    efPos,
    legs,
    onClose,
    updateLeg,
    AIvalidation,
    setLegsContainerExpanded,
    updateResearchPaneTab,
    setActiveAIL,
    legsData,
  } = props;

  const { todData, legATData, legATLoading, travelFData, travelFLoading } = legsData;

  const TODs = get(todData, 'data') || [];
  const legActionTypes = get(legATData, 'data.results') || [];
  const travelFunctions = get(travelFData, 'data.results') || [];
  const hasEf = !isEmpty(efPos);
  const showOverlay = !legs.length && !hasEf;
  const [rowHoverNum, setRowHoverNum] = useState();

  const onClose$ = leg => {
    onClose(leg);
  };

  const updateLeg$ = (legID, dropdown, value) => {
    updateLeg(legID, dropdown, value);
  };

  const legHeaderData = [
    'Position Title',
    'Position Number',
    'Location/Org',
    'Grade',
    'Lang',
    'Skills',
    'ETA',
    '',
    'TED',
    'TOD',
    'Action',
    'Travel',
    'Vice',
    'Pay Plan',
  ];

  useEffect(() => {
    legs.forEach(l => {
      const isLegacyValue = (!includes(legActionTypes, l.action_code) && l.action_code !== '');
      if (isLegacyValue) {
        legActionTypes.push({
          code: 'LA',
          abbr_desc_text: l.action_code,
          desc_text: l.action_code,
        });
      }
    });
  }, [legATLoading]);

  useEffect(() => {
    legs.forEach(l => {
      const isLegacyValue = (!includes(travelFunctions, l.travel_code) && l.travel_code !== '');
      if (isLegacyValue) {
        travelFunctions.push({
          code: '999',
          desc_text: l.travel_code,
          abbr_desc_text: l.travel_code,
        });
      }
    });
  }, [travelFLoading]);

  return (
    <>
      {
        showOverlay ?
          <Alert type="info" title="No Agenda Item Legs" /> :
          <div className={`legs-form-container ${AIvalidation?.legs?.allLegs?.valid ? '' : 'validation-error-border-legs'}`}>
            <div className="legs-form">
              {
                legHeaderData.map((title, i) => (
                  <InteractiveElement
                    className={`grid-col-1 grid-row-${i + 2}${rowHoverNum === (i + 2) ? ' grid-row-hover' : ''}`}
                    onMouseOver={() => setRowHoverNum(i + 2)}
                    onMouseLeave={() => setRowHoverNum('')}
                    key={title}
                  >
                    {title}
                  </InteractiveElement>
                ))
              }
              {
                hasEf &&
                <AgendaLeg
                  leg={efPos}
                  legNum={2}
                  TODs={TODs}
                  legActionTypes={legActionTypes}
                  travelFunctions={travelFunctions}
                  onClose={onClose$}
                  updateLeg={updateLeg$}
                  isEf
                  onHover={(row) => setRowHoverNum(row)}
                  rowNum={rowHoverNum}
                />
              }
              {
                // grid-col 2 or 3 dependent on hasEf
                legs.map((leg, i) => {
                  const keyId = i;
                  return (
                    <AgendaLeg
                      AIvalidation={AIvalidation}
                      leg={leg}
                      key={`${leg.ail_seq_num}-${keyId}`}
                      legNum={i + (hasEf ? 3 : 2)}
                      TODs={TODs}
                      legActionTypes={legActionTypes}
                      travelFunctions={travelFunctions}
                      onClose={onClose$}
                      updateLeg={updateLeg$}
                      onHover={(row) => setRowHoverNum(row)}
                      rowNum={rowHoverNum}
                      updateResearchPaneTab={updateResearchPaneTab}
                      setLegsContainerExpanded={setLegsContainerExpanded}
                      setActiveAIL={setActiveAIL}
                    />
                  );
                })
              }
            </div>
          </div>
      }
    </>
  );
};

AgendaItemLegsForm.propTypes = {
  efPos: PropTypes.shape({}),
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func,
  setLegsContainerExpanded: PropTypes.func,
  updateLeg: PropTypes.func,
  updateResearchPaneTab: PropTypes.func,
  setActiveAIL: PropTypes.func,
  AIvalidation: AI_VALIDATION,
  legsData: PropTypes.shape({
    todData: PropTypes.shape({}),
    legATData: PropTypes.shape({}),
    legATLoading: PropTypes.bool,
    travelFData: PropTypes.shape({}),
    travelFLoading: PropTypes.bool,
  }).isRequired,
};

AgendaItemLegsForm.defaultProps = {
  efPos: {},
  legs: [],
  setLegsContainerExpanded: EMPTY_FUNCTION,
  onClose: EMPTY_FUNCTION,
  updateLeg: EMPTY_FUNCTION,
  updateResearchPaneTab: EMPTY_FUNCTION,
  setActiveAIL: EMPTY_FUNCTION,
  AIvalidation: {},
  legsData: {
    todData: {},
    legATData: {},
    legATLoading: false,
    travelFData: {},
    travelFLoading: false,
  },
};

export default AgendaItemLegsForm;
