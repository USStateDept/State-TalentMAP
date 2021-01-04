import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys } from 'lodash';
import { formatDate } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { availableBiddersToggleUser, availableBidderEditData } from 'actions/cdo';
import { useDispatch } from 'react-redux';
import { NO_GRADE, NO_END_DATE, NO_CDO, NO_BUREAU, NO_USER_SKILL_CODE, NO_OC_REASON, NO_POST, NO_STATUS, NO_COMMENTS } from 'Constants/SystemMessages';
// import EditBidder from 'Components/AvailableBidders/EditBidder';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import swal from '@sweetalert/with-react';


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading } = props;

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(get(bidder, 'status', NO_STATUS));
  const [ocBureau, setOCBureau] = useState(get(bidder, 'current_assignment.position.bureau', NO_BUREAU));
  const [ocReason, setOCReason] = useState(get(bidder, 'oc_reason', NO_OC_REASON));
  const [comment, setComment] = useState(get(bidder, 'comments', NO_COMMENTS));


  const dispatch = useDispatch();

  const shared = get(bidder, 'is_shared', false);
  const ted = get(bidder, 'TED');
  const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
  const id = get(bidder, 'bidder_perdet');

  const sections = {
    Name: (<Link to={`/profile/public/${get(bidder, 'emp_id')}/bureau`}>{get(bidder, 'name')}</Link>),
    Status: status,
    Skill: get(bidder, 'skills[0].description', NO_USER_SKILL_CODE),
    Grade: get(bidder, 'grade', NO_GRADE),
    TED: formattedTed,
    Current_Post: get(bidder, 'post.location.country', NO_POST),
    OC_Bureau: ocBureau,
    OC_Reason: ocReason,
    CDO: get(bidder, 'cdo.name', NO_CDO),
    Comments: comment,
  };

  const userInputs = {
    oc_bureau: ocBureau,
    oc_reason: ocReason,
    status,
    comments: comment,
  };

  const availableBidderModal = () => {
    setShowModal(!showModal);
    swal({
      title: 'Available Bidder Record Editor',
      buttons: ['Cancel', 'Save'],
      show: showModal,
      content: (
        <div>
          <form>
            <label htmlFor="name">Client Name:</label>
            <input type="text" name="name" disabled value={get(bidder, 'name')} />
            <label htmlFor="status">Status:</label>
            <select id="status" onChange={(e) => setStatus(e.value)} defaultValue={status}>
              <option value="OC">OC: Overcompliment</option>
              <option value="UA">UA: Unassigned</option>
              <option value="IT">IT: In Transit</option>
              <option value="AWOL">AWOL: Absent without leave</option>
            </select>
            <label htmlFor="skill">Skill:</label>
            <input type="text" name="skill" disabled value={sections.Skill} />
            <label htmlFor="grade">Grade:</label>
            <input type="text" name="grade" disabled value={sections.Grade} />
            <label htmlFor="ted">TED:</label>
            <input type="text" name="ted" disabled value={sections.TED} />
            <label htmlFor="currentPost">Current Post:</label>
            <input type="text" name="currentPost" disabled value={sections.Current_Post} />
            <label htmlFor="ocBureau">OC Bureau:</label>
            <input type="text" name="ocBureau" defaultValue={ocBureau} onChange={(e) => setOCBureau(e.value)} />
            <label htmlFor="ocReason">OC Reason:</label>
            <input type="text" name="ocReason" defaultValue={ocReason} onChange={(e) => setOCReason(e.value)} />
            <label htmlFor="cdo">CDO:</label>
            <input type="text" name="cdo" disabled value={sections.CDO} />
            <label htmlFor="comment">Comment:</label>
            <input type="text" name="comment" defaultValue={comment} onChange={(e) => setComment(e.value)} />
          </form>
        </div>
      ),
    }).then(() => dispatch(availableBidderEditData(id, userInputs)));
  };

  return (
    <tr className={!CDOView && !shared ? 'ab-inactive' : ''}>
      {
        isLoading ?
          keys(sections).forEach(k => {
            sections[k] = <Skeleton />;
          })
          :
          keys(sections).map(i => (
            <td>{sections[i]}</td>
          ))
      }
      <td>
        <div className="ab-action-buttons">
          <Tooltip
            title="Edit Fields"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            <FA name="pencil-square-o" className="fa-lg" onClick={availableBidderModal} />
          </Tooltip>
          <Tooltip
            title="Share with Bureaus"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            <FA
              name={shared ? 'building' : 'building-o'}
              className="fa-lg"
              onClick={() => dispatch(availableBidderEditData(id, { is_shared: !shared }))}
            />
          </Tooltip>
          <Tooltip
            title="Remove from Available Bidders List"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            <FA name="trash-o" className="fa-lg" onClick={() => dispatch(availableBiddersToggleUser(id, true))} />
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

AvailableBidderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bidder: PropTypes.object,
  CDOView: PropTypes.bool,
  isLoading: PropTypes.bool,
};

AvailableBidderRow.defaultProps = {
  bidder: {},
  CDOView: false,
  isLoading: false,
  showModal: EMPTY_FUNCTION,
};

export default AvailableBidderRow;
