import { PANEL_MEETING } from 'Constants/PropTypes';
import { get } from 'lodash';
import Tracker from 'Components/Tracker';
import { formatPanelMeetingTrackerData } from '../helpers';

const FALLBACK = 'None listed';

const PanelMeetingTracker = ({ panelMeeting }) => {
  const meetingTypeText = get(panelMeeting, 'pmt_desc_text') || '';
  const meetingStatusCode = get(panelMeeting, 'pms_code') || '';
  const meetingStatus = get(panelMeeting, 'pms_desc_text') || FALLBACK;
  const meetingDates = get(panelMeeting, 'panelMeetingDates') || [];

  const data = formatPanelMeetingTrackerData(meetingDates);

  return (
    <>
      <div className="panel-meeting-type-container">
        <div className="panel-meeting-row-name">
          {meetingTypeText}
        </div>
        <div className={`panel-status panel-status--${meetingStatusCode}`}>{meetingStatus}</div>
      </div>
      <div className="progress-container">
        <Tracker
          data={data}
        />
      </div>
    </>
  );
};

PanelMeetingTracker.propTypes = {
  panelMeeting: PANEL_MEETING,
};

PanelMeetingTracker.defaultProps = {
  panelMeeting: {},
};

export default PanelMeetingTracker;
