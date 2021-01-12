import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys } from 'lodash';
import { formatDate } from 'utilities';
import { availableBiddersToggleUser, availableBidderEditData } from 'actions/cdo';
import { useDispatch } from 'react-redux';
import { NO_GRADE, NO_END_DATE, NO_CDO, NO_BUREAU, NO_USER_SKILL_CODE, NO_OC_REASON, NO_POST, NO_STATUS, NO_COMMENTS } from 'Constants/SystemMessages';
import EditBidder from 'Components/AvailableBidders/EditBidder';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import swal from '@sweetalert/with-react';


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading, isCDO } = props;

  // Formatting
  const shared = get(bidder, 'is_shared', false);
  const ted = get(bidder, 'TED') || get(bidder, 'current_assignment.end_date');
  const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
  const id = get(bidder, 'bidder_perdet') || get(bidder, 'perdet_seq_number');
  const name = get(bidder, 'name');

  const sections = isCDO ? {
    Name: (<Link to={`/profile/public/${get(bidder, 'emp_id')}/bureau`}>{name}</Link>),
    Status: get(bidder, 'status', NO_STATUS),
    Skill: get(bidder, 'skills[0].description', NO_USER_SKILL_CODE),
    Grade: get(bidder, 'grade', NO_GRADE),
    TED: formattedTed,
    Current_Post: get(bidder, 'post.location.country', NO_POST),
    OC_Bureau: get(bidder, 'oc_bureau', NO_BUREAU),
    OC_Reason: get(bidder, 'oc_reason', NO_OC_REASON),
    CDO: get(bidder, 'cdo.name', NO_CDO),
    Comments: get(bidder, 'comments', NO_COMMENTS),
  } : {
    Name: (<Link to={`/profile/public/${get(bidder, 'emp_id')}/bureau`}>{name}</Link>),
    Skill: get(bidder, 'skills[0].description', NO_USER_SKILL_CODE),
    Grade: get(bidder, 'grade', NO_GRADE),
    TED: formattedTed,
    Current_Post: get(bidder, 'current_assignment.position.post.location.country', NO_POST),
    CDO: get(bidder, 'cdo.name', NO_CDO),
  };

  // Replaces connect() functionality
  const dispatch = useDispatch();

  const submitAction = (userInputs) => {
    dispatch(availableBidderEditData(id, userInputs));
    swal.close();
  };

  // See sweet alert library docs
  const availableBidderModal = () => {
    swal({
      title: 'Available Bidder Record Editor',
      button: false,
      content: (
        <EditBidder
          name={name}
          sections={sections}
          submitAction={submitAction}
        />
      ),
    });
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
      {
        isCDO &&
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
              <FA name="trash-o" className="fa-lg" onClick={() => dispatch(availableBiddersToggleUser(id, true, true))} />
            </Tooltip>
          </div>
        </td>
      }
    </tr>
  );
};

AvailableBidderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bidder: PropTypes.object,
  // build out bidder proptype
  CDOView: PropTypes.bool,
  isLoading: PropTypes.bool,
  isCDO: PropTypes.bool,
};

AvailableBidderRow.defaultProps = {
  bidder: {},
  CDOView: false,
  isLoading: false,
  isCDO: false,
};

export default AvailableBidderRow;
