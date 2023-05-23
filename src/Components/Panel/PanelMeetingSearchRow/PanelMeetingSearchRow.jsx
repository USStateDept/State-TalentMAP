import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { get } from 'lodash';
import { checkFlag } from 'flags';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';
import { saveSelectedEditPanelMeeting } from 'actions/panelMeetingAgendas';

const FALLBACK = 'None listed';
const usePanelMeetingsAgendas = () => checkFlag('flags.panel_meeting_agendas');

const PanelMeetingSearchRow = ({ isCDO, pm }) => {
  const dispatch = useDispatch();
  const pmSeqNum = get(pm, 'pm_seq_num') || FALLBACK;
  const showPanelMeetingsAgendas = usePanelMeetingsAgendas();

  const userRole = isCDO ? 'cdo' : 'ao';

  const onEditClick = (panelMeeting) => {
    dispatch(saveSelectedEditPanelMeeting(panelMeeting));
  };

  return (
    <div className="panel-meeting-row">
      <PanelMeetingTracker panelMeeting={pm} />
      {
        showPanelMeetingsAgendas &&
        <div className="button-box-container">
          <LinkButton className="button-box" toLink={`/profile/${userRole}/panelmeetingagendas/${pmSeqNum}`}>View</LinkButton>
          <Link to={'/profile/administrator/panel/'} >
            <button
              className="usa-button-secondary"
              onClick={() => onEditClick(pm)}
            >
              Edit
            </button>
          </Link>
        </div>
      }
    </div>
  );
};

PanelMeetingSearchRow.propTypes = {
  isCDO: PropTypes.bool,
  pm: PANEL_MEETING,
};

PanelMeetingSearchRow.defaultProps = {
  isCDO: false,
  pm: {},
};

export default PanelMeetingSearchRow;
