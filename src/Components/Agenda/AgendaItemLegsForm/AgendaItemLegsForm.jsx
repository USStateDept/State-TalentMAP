/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, includes } from 'lodash';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { useDataLoader } from 'hooks';
import Spinner from 'Components/Spinner';
import AgendaLeg from '../AgendaLeg';
import api from '../../../api';

const AgendaItemLegsForm = props => {
  const {
    legs,
    onClose,
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

  const legHeaderData = [
    {
      title: 'Position Title',
    },
    {
      title: 'Position Number',
    },
    {
      title: 'Grade',
    },
    {
      title: 'Language',
    },
    {
      icon: 'building-o',
      title: 'Org',
    },
    {
      icon: 'paper-plane-o',
      title: 'ETA',
    },
    {
      icon: 'clock-o',
      title: 'TED',
    },
    {
      title: 'TOD',
    },
    {
      title: 'Action',
    },
    {
      title: 'Travel',
    },
  ];

  return (
    <>
      {
        legsLoading &&
          <Spinner type="legs" size="small" />
      }
      {
        !legsLoading &&
          <div className="legs-form-container">
            {
              legHeaderData.map((h, i) => (
                <div className={`grid-col-1 grid-row-${i + 1}`}>
                  {h.title}
                </div>
              ))
            }
            {
              legs.map((tr, i) => (
                <AgendaLeg leg={tr} legNum={i + 2} />
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
};

AgendaItemLegsForm.defaultProps = {
  legs: [],
  onClose: EMPTY_FUNCTION,
};

export default AgendaItemLegsForm;
