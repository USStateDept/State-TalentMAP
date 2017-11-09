// store any bid statuses from the API here
// class_name is used to pass to parent container for conditional css class name
export const APPROVED = { property: 'approved', class_name: 'approved', text: 'Approved' };
export const CLOSED = { property: 'closed', class_name: 'closed', text: 'Closed' };
export const DRAFT = { property: 'draft', class_name: 'draft', text: 'Draft Bid' };
export const DECLINED = { property: 'declined', class_name: 'declined', text: 'Bid Unapproved' };
export const HAND_SHAKE_ACCEPTED = { property: 'handshake accepted', class_name: 'hand-shake-accepted', text: 'Handshake Accepted' };
export const HAND_SHAKE_OFFERED = { property: 'handshake offered', class_name: 'hand-shake-offered', text: 'Handshake Offered' };
export const IN_PANEL = { property: 'in panel', class_name: 'in-panel', text: 'In Panel' };
export const SUBMITTED = { property: 'submitted', class_name: 'submitted', text: 'Bid Submitted' };

const statusArray = [
  APPROVED, CLOSED, DRAFT, DECLINED, HAND_SHAKE_ACCEPTED, HAND_SHAKE_OFFERED, IN_PANEL, SUBMITTED,
];

// find the correct object based on status, then return the class_name
export const getStatusClass = (status) => {
  let className = '';
  statusArray.forEach((s) => {
    if (s.property === status) {
      className = s.class_name;
    }
  });
  return className;
};
