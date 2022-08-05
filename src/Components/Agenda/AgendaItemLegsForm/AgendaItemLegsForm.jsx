import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, includes } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { useDataLoader } from 'hooks';
import Spinner from 'Components/Spinner';
import AgendaLeg from '../AgendaLeg';
import Alert from '../../Alert';
import api from '../../../api';

const AgendaItemLegsForm = props => {
  const {
    legs,
    onClose,
    updateLeg,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const { data: todData, error: todError, loading: TODLoading } = useDataLoader(api().get, '/fsbid/reference/tourofduties/');
  // eslint-disable-next-line no-unused-vars
  const { data: legATData, error: legATError, loading: legATLoading } = useDataLoader(api().get, '/fsbid/agenda/leg_action_types/');
  // eslint-disable-next-line no-unused-vars
  const { data: travelFData, error: travelFError, loading: travelFLoading } = useDataLoader(api().get, '/fsbid/reference/travelfunctions/');

  const TODs = get(todData, 'data') || [];
  const legActionTypes = get(legATData, 'data.results') || [];
  const travelFunctions = get(travelFData, 'data.results') || [];
  const legsLoading = includes([TODLoading, legATLoading, travelFLoading], true);

  const onClose$ = leg => {
    onClose(leg);
  };

  const updateLeg$ = (legID, dropdown, value) => {
    updateLeg(legID, dropdown, value);
  };

  const legHeaderData = [
    'Position Title',
    'Position Number',
    'Grade',
    'Language',
    'Org',
    'ETA',
    '',
    'TED',
    'TOD',
    'Action',
    'Travel',
  ];

  const [numLegs, setNumLegs] = useState(0);

  useEffect(() => {
    setNumLegs(legs.length);
  }, [legs]);

  return (
    <>
      {
        legsLoading &&
          <Spinner type="legs" size="small" />
      }
      {
        !numLegs &&
        <Alert type="info" title="No Agenda Item Legs" />
      }
      {
        !legsLoading && numLegs &&
          <div className="legs-form-container">
            {
              legHeaderData.map((title, i) => (
                <div className={`grid-col-1 grid-row-${i + 2}`}>
                  {title}
                </div>
              ))
            }
            {
              legs.map((leg, i) => (
                <AgendaLeg
                  leg={leg}
                  legNum={i + 2}
                  TODs={TODs}
                  legActionTypes={legActionTypes}
                  travelFunctions={travelFunctions}
                  onClose={onClose$}
                  updateLeg={updateLeg$}
                />
              ))
            }
          </div>
      }
    </>
  );
};

AgendaItemLegsForm.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func,
  updateLeg: PropTypes.func,
};

AgendaItemLegsForm.defaultProps = {
  legs: [],
  onClose: EMPTY_FUNCTION,
  updateLeg: EMPTY_FUNCTION,
};

export default AgendaItemLegsForm;
