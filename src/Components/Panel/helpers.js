import { findLastIndex, get, isEmpty } from 'lodash';
import { format, isPast } from 'date-fns-v2';
import { createPanelMeeting } from '../../actions/panelMeetingAdmin';

export const formatPanelMeetingTrackerData = (meetingDates = []) => {
  const pre = { label: 'Pre-Panel' };
  const add = { label: 'Addendum' };
  const panel = { label: 'Panel' };
  const post = { label: 'Post-Panel' };

  meetingDates.forEach(pmd => {
    const meetingDate = pmd?.pmd_dttm ? format(new Date(pmd.pmd_dttm), 'MM/dd/yyyy hh:mm a') : '';
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
  });
  const trackerData = [pre, add, panel, post];
  const idx = findLastIndex(trackerData, (d) => !!d.isActive);
  if (idx >= 0) { trackerData[idx].isCurrent = true; }
  return trackerData;
};

/**
 * Utility for creating/editing a panel meeting with only the new fields specified
 * and retaining all of the other original fields.
 */
export const submitPanelMeeting = (originalFields, newFields) => {
  const {
    panelMeetingDates,
  } = originalFields;

  // eslint-disable-next-line no-unused-vars
  const panelMeetingDate = panelMeetingDates?.find(x => x.mdt_code === 'MEET');
  // eslint-disable-next-line no-unused-vars
  const prelimCutoff = panelMeetingDates?.find(x => x.mdt_code === 'CUT');
  // eslint-disable-next-line no-unused-vars
  const addendumCutoff = panelMeetingDates?.find(x => x.mdt_code === 'ADD');
  // eslint-disable-next-line no-unused-vars
  const prelimRuntime = panelMeetingDates?.find(x => x.mdt_code === 'OFF');
  // eslint-disable-next-line no-unused-vars
  const addendumRuntime = panelMeetingDates?.find(x => x.mdt_code === 'OFFA');
  // eslint-disable-next-line no-unused-vars
  const postPanelStarted = panelMeetingDates?.find(x => x.mdt_code === 'POSS');
  // eslint-disable-next-line no-unused-vars
  const postPanelRuntime = panelMeetingDates?.find(x => x.mdt_code === 'POST');

  const data = {
    originalReference: originalFields,
    panelMeetingStatus: newFields?.panelMeetingStatus,
    panelMeetingType: newFields?.panelMeetingType,
    panelMeetingDate: newFields?.panelMeetingDate
      && format(newFields?.panelMeetingDate, 'MM/dd/yyyy HH:mm'),
    prelimCutoff: newFields?.prelimCutoff
      && format(newFields?.prelimCutoff, 'MM/dd/yyyy HH:mm'),
    addendumCutoff: newFields?.addendumCutoff
      && format(newFields?.addendumCutoff, 'MM/dd/yyyy HH:mm'),
    // prelimRuntime: newFields?.prelimRuntime ??
    //  (prelimRuntime ? new Date(prelimRuntime.pmd_dttm) : undefined),
    // addendumRuntime: newFields?.addendumRuntime ??
    //  (addendumRuntime ? new Date(addendumRuntime.pmd_dttm) : undefined),
    // postPanelStarted: newFields?.postPanelStarted ??
    //  (postPanelStarted ? new Date(postPanelStarted.pmd_dttm) : undefined),
    // postPanelRuntime: newFields?.postPanelRuntime ??
    //  (postPanelRuntime ? new Date(postPanelRuntime.pmd_dttm) : undefined),
    // agendaCompletedTime: newFields?.agendaCompletedTime ??
    //  (agendaCompletedTime ? new Date(agendaCompletedTime.pmd_dttm) : undefined),
  };

  return createPanelMeeting(data, isEmpty(originalFields));
};
