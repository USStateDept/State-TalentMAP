import { findLastIndex, get } from 'lodash';
import { formatDate } from 'utilities';
import { isPast } from 'date-fns-v2';

export const formatPanelMeetingTrackerData = (meetingDates = []) => {
  const pre = { label: 'Pre-Panel' };
  const add = { label: 'Addendum' };
  const panel = { label: 'Panel' };
  const post = { label: 'Post-Panel' };
  const complete = { label: 'Complete' };

  meetingDates.forEach(pmd => {
    const meetingDate = formatDate(get(pmd, 'pmd_dttm'), 'MM/DD/YYYY HH:mm') || '';
    const code = get(pmd, 'mdt_code');
    const isPast$ = isPast(new Date(pmd.pmd_dttm));

    if ((code === 'OFF') && isPast$) {
      pre.description = meetingDate;
      pre.isActive = isPast$;
    }
    if (code === 'CUT') {
      pre.description ??= meetingDate;
      pre.isActive ??= isPast$;
    }
    if ((code === 'OFFA') && isPast$) {
      add.description = meetingDate;
      add.isActive = isPast$;
    }
    if (code === 'ADD') {
      add.description ??= meetingDate;
      add.isActive ??= isPast$;
    }
    if (code === 'MEET') {
      panel.description = meetingDate;
      panel.isActive = isPast$;
    }
    if ((code === 'POST') && isPast$) {
      post.description = meetingDate;
      post.isActive = isPast$;
    }
    if (code === 'POSS') {
      post.description ??= meetingDate;
      post.isActive ??= isPast$;
    }
    if (code === 'COMP') {
      complete.description = meetingDate;
      complete.isActive = isPast$;
    }
  });
  const trackerData = [pre, add, panel, post, complete];
  const idx = findLastIndex(trackerData, (d) => !!d.isActive);
  if (idx >= 0) { trackerData[idx].isCurrent = true; }
  return trackerData;
};

export default formatPanelMeetingTrackerData;
