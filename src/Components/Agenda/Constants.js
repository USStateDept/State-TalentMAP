import { formatDate } from 'utilities';

/* eslint-disable import/prefer-default-export */
// TODO: remove
export const borderColors = {
  Withdrawn: '#227C9D', // turqoise
  Disapproved: '#913831', // red
  Approved: '#2D6E0E', // dark green
  Deferred: '#36454F', // grey
  'Deferred - Proposed Position': '#483C32', // dark brown
  Ready: '#003EBD', // blue
  Held: '#6421A2', // purple
  'Not Ready': '#DC6601', // Orange
  'Out of Order': '#946f00', // copper
  PIP: '#75673E', // light brown
  'Move to ML/ID': '#301934', // dark purple
  Default: '#513C2C', // brown
};

export const statusRenaming = [
  { value: 'APR', text: 'Approved' },
  { value: 'DEF', text: 'Deferred' },
  { value: 'XXX', text: 'Deferred - Proposed Position' },
  { value: 'DIS', text: 'Disapproved' },
  { value: 'HLD', text: 'Held' },
  { value: 'MOV', text: 'Move to ML/ID' },
  { value: 'NR', text: 'Not Ready' },
  { value: 'OOO', text: 'Out of Order' },
  { value: 'PIP', text: 'PIP' },
  { value: 'RDY', text: 'Ready' },
  { value: 'WDR', text: 'Withdrawn' },
];
/* eslint-enable import/prefer-default-export */

export const dateTernary = date => date ? `${formatDate(date, 'MM/dd/yyyy')}` : '--/--/--';

export const formatVice = (viceObj) => {
  const first = viceObj?.emp_first_name;
  const last = viceObj?.emp_last_name;
  const vice = (first || last)
    ? `${first ? `${first} ` : ''}${last || ''}`
    : '';
  const vacancy = viceObj?.asgd_etd_ted_date && formatDate(viceObj.asgd_etd_ted_date, 'MM/yyyy');
  if (vice || vacancy) {
    return `${vice || ''}${(vice && vice !== 'Multiple Incumbents' && vacancy) ? ', ' : ''} ${vacancy || ''}`;
  }
  return '-';
};
