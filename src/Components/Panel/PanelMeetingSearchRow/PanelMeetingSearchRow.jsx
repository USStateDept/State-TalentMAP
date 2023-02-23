import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { findLastIndex, get, includes } from 'lodash';
import { formatDate } from 'utilities';
import { isPast } from 'date-fns-v2';
import Tracker from 'Components/Tracker';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, pm }) => {
  const pmSeqNum = get(pm, 'pm_seq_num') || FALLBACK;
  const meetingTypeText = get(pm, 'pmt_desc_text') || '';
  const meetingStatus = get(pm, 'pms_desc_text') || FALLBACK;
  const meetingDates = get(pm, 'panelMeetingDates') || [];

  const userRole = isCDO ? 'cdo' : 'ao';

  const formatTrackerData = () => {
    const pre = { label: 'Pre-Panel' };
    const add = { label: 'Addendum' };
    const panel = { label: 'Panel' };
    const post = { label: 'Post-Panel' };
    const complete = { label: 'Complete' };

    meetingDates.forEach(pmd => {
      const meetingDate = formatDate(get(pmd, 'pmd_dttm'), 'MM/DD/YYYY HH:mm') || '';
      const code = get(pmd, 'mdt_code');
      const isPast$ = isPast(new Date(pmd.pmd_dttm));
      if (includes(['OFF', 'CUT'], code)) {
        if ((code === 'CUT') && isPast$) {
          pre.description = meetingDate;
          pre.isActive = isPast$;
        } else if (code === 'OFF' && isPast$) {
          pre.description = meetingDate;
          pre.isActive = isPast$;
        } else if (code === 'OFF') {
          pre.description = meetingDate;
          pre.isActive = isPast$;
        }
      } else if (includes(['ADD', 'OFFA'], code)) {
        if ((code === 'OFFA') && isPast$) {
          add.description = meetingDate;
          add.isActive = isPast$;
        } else if (code === 'ADD' && isPast$) {
          add.description = meetingDate;
          add.isActive = isPast$;
        } else if (code === 'ADD') {
          add.description = meetingDate;
          add.isActive = isPast$;
        }
      } else if (includes(['MEET'], code)) {
        panel.description = meetingDate;
        panel.isActive = isPast$;
      } else if (includes(['POSS', 'POST'], code)) {
        if ((code === 'POST') && isPast$) {
          post.description = meetingDate;
          post.isActive = isPast$;
        } else if (code === 'POSS' && isPast) {
          post.description = meetingDate;
          post.isActive = isPast$;
        } else if (code === 'POSS') {
          post.description = meetingDate;
          post.isActive = isPast$;
        }
      } else if (includes(['COMP'], code)) {
        complete.description = meetingDate;
        complete.isActive = isPast$;
      }
    });
    const trackerData = [pre, add, panel, post, complete];
    const idx = findLastIndex(trackerData, (d) => !!d.isActive);
    if (idx >= 0) { trackerData[idx].isCurrent = true; }
    return trackerData;
  };

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
          data={formatTrackerData()}
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
