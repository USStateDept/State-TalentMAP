import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { get } from 'lodash';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, pm }) => {
  const pmSeqNum = get(pm, 'pm_seq_num') || FALLBACK;

  const userRole = isCDO ? 'cdo' : 'ao';

  return (
    <div className="panel-meeting-row">
      <PanelMeetingTracker panelMeeting={pm} />
      <div className="button-box-container">
        <LinkButton className="button-box" toLink={`/profile/${userRole}/panelmeetingagendas/${pmSeqNum}`}>View</LinkButton>
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
