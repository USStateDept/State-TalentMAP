import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { get } from 'lodash';
import Tracker from 'Components/Tracker';
import { formatPanelMeetingTrackerData } from '../helpers';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, pm }) => {
  const pmSeqNum = get(pm, 'pm_seq_num') || FALLBACK;
  const meetingTypeText = get(pm, 'pmt_desc_text') || '';
  const meetingStatus = get(pm, 'pms_desc_text') || FALLBACK;
  const meetingDates = get(pm, 'panelMeetingDates') || [];

  const userRole = isCDO ? 'cdo' : 'ao';

  const data = formatPanelMeetingTrackerData(meetingDates);

  return (
    <div className="panel-meeting-row">
      <div className="panel-meeting-type-container">
        <div className="panel-meeting-row-name">
          {meetingTypeText}
        </div>
        <div className={`panel-status panel-status--${get(pm, 'pms_code')}`}>{meetingStatus}</div>
      </div>
      <div className="progress-container">
        <Tracker
          data={data}
        />
      </div>
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
