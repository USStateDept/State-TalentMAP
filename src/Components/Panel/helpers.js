import { findLastIndex, get } from 'lodash';
import { formatDate } from 'utilities';
import { isPast } from 'date-fns-v2';
import { createPanelMeeting } from '../../actions/panelMeetingAdmin';

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

/**
 * Utility for creating/editing a panel meeting with only the new fields specified
 * and retaining all of the other original fields.
 */
export const submitPanelMeeting = (panelMeetingsResults, newFields) => {
  const { pmt_code, pms_desc_text, panelMeetingDates } = panelMeetingsResults;

  const panelMeetingDate = panelMeetingDates?.find(x => x.mdt_code === 'MEET');
  const prelimCutoff = panelMeetingDates?.find(x => x.mdt_code === 'CUT');
  const addendumCutoff = panelMeetingDates?.find(x => x.mdt_code === 'ADD');
  const prelimRuntime = panelMeetingDates?.find(x => x.mdt_code === 'OFF');
  const addendumRuntime = panelMeetingDates?.find(x => x.mdt_code === 'OFFA');
  const postPanelStarted = panelMeetingDates?.find(x => x.mdt_code === 'POSS');
  const postPanelRuntime = panelMeetingDates?.find(x => x.mdt_code === 'POST');
  const agendaCompletedTime = panelMeetingDates?.find(x => x.mdt_code === 'COMP');

  createPanelMeeting({
    panelMeetingType: newFields.panelMeetingType ?? pmt_code,
    panelMeetingDate: newFields.panelMeetingDate ??
      (panelMeetingDate ? new Date(panelMeetingDate.pmd_dttm) : undefined),
    prelimCutoff: newFields.prelimCutoff ??
      (prelimCutoff ? new Date(prelimCutoff.pmd_dttm) : undefined),
    addendumCutoff: newFields.addendumCutoff ??
      (addendumCutoff ? new Date(addendumCutoff.pmd_dttm) : undefined),
    prelimRuntime: newFields.prelimRuntime ??
      (prelimRuntime ? new Date(prelimRuntime.pmd_dttm) : undefined),
    addendumRuntime: newFields.addendumRuntime ??
      (addendumRuntime ? new Date(addendumRuntime.pmd_dttm) : undefined),
    panelMeetingStatus: newFields.panelMeetingStatus ?? pms_desc_text,
    postPanelStarted: newFields.postPanelStarted ??
      (postPanelStarted ? new Date(postPanelStarted.pmd_dttm) : undefined),
    postPanelRuntime: newFields.postPanelRuntime ??
      (postPanelRuntime ? new Date(postPanelRuntime.pmd_dttm) : undefined),
    agendaCompletedTime: newFields.agendaCompletedTime ??
      (agendaCompletedTime ? new Date(agendaCompletedTime.pmd_dttm) : undefined),
  });
};
