import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { get } from 'lodash';
import { checkFlag } from 'flags';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';
import { userHasPermissions } from '../../../utilities';

const FALLBACK = 'None listed';
const usePanelMeetingsAgendas = () => checkFlag('flags.panel_meeting_agendas');
const useEditPanelMeeting = () => checkFlag('flags.panel_admin');

const PanelMeetingSearchRow = ({ isCDO, pm }) => {
  const pmSeqNum = get(pm, 'pm_seq_num') || FALLBACK;
  const showPanelMeetingsAgendas = usePanelMeetingsAgendas();
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  const userRole = isCDO ? 'cdo' : 'ao';

  return (
    <div className="panel-meeting-row">
      <PanelMeetingTracker panelMeeting={pm} />
      <div className="button-box-container">
        {
          showPanelMeetingsAgendas &&
            <LinkButton className="button-box" toLink={`/profile/${userRole}/panelmeetingagendas/${pmSeqNum}`}>View</LinkButton>
        }
        {
          (isSuperUser && useEditPanelMeeting()) &&
          <Link to={`/profile/administrator/panel/${pmSeqNum}`}>
            <button
              className="usa-button-secondary"
            >
              Edit
            </button>
          </Link>
        }
      </div>
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
