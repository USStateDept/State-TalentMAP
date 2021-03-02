import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys } from 'lodash';
import { formatDate } from 'utilities';
import { availableBiddersToggleUser, availableBidderEditData } from 'actions/availableBidders';
import { useDispatch } from 'react-redux';
import { NO_GRADE, NO_END_DATE, NO_CDO, NO_BUREAU, NO_USER_SKILL_CODE, NO_OC_REASON, NO_POST, NO_STATUS, NO_COMMENTS } from 'Constants/SystemMessages';
import EditBidder from 'Components/AvailableBidder/EditBidder';
import InteractiveElement from 'Components/InteractiveElement';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import swal from '@sweetalert/with-react';
import { FILTER } from 'Constants/PropTypes';


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading, isCDO, bureaus } = props;

  // Formatting
  const shared = get(bidder, 'is_shared', false);
  const ted = get(bidder, 'TED') || get(bidder, 'current_assignment.end_date');
  const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
  const id = get(bidder, 'bidder_perdet') || get(bidder, 'perdet_seq_number');
  const name = get(bidder, 'name');
  const ocBureau = get(bidder, 'oc_bureau') || NO_BUREAU;
  const ocReason = get(bidder, 'oc_reason') || NO_OC_REASON;
  const status = get(bidder, 'status') || NO_STATUS;
  const getStatus = () => {
    if (status === 'OC') {
      return (
        <Tooltip
          html={
            <div>
              <div className={'tooltip-text'}>
                <div>
                  <span className="title">OC Reason:</span> <span className="text">{ocReason}</span>
                </div>
                <div>
                  <span className="title">OC Bureau:</span> <span className="text">{ocBureau}</span>
                </div>
              </div>
            </div>
          }
          theme="oc-status-long"
          arrow
          tabIndex="0"
          interactive
          useContext
        >
          {status} <FA className="oc-icon" name="question-circle" />
        </Tooltip>
      );
    }
    return status;
  };

  const getLanguage = () => (
    <Tooltip
      html={
        <div>
          <div className={'tooltip-text'}>
            <div>
              <span className="title">Speaking:</span> <span className="text">{3}</span>
            </div>
            <div>
              <span className="title">Reading:</span> <span className="text">{4}</span>
            </div>
          </div>
        </div>
      }
      theme="oc-status-long"
      arrow
      tabIndex="0"
      interactive
      useContext
      hideDelay="100"
    >
      {'Fr'} <FA className="oc-icon" name="question-circle" />
    </Tooltip>
  );

  const sections = isCDO ? {
    name: (<Link to={`/profile/public/${id}/cdo`}>{name}</Link>),
    status: getStatus(),
    skill: get(bidder, 'skills[0].description') || NO_USER_SKILL_CODE,
    grade: get(bidder, 'grade') || NO_GRADE,
    // Update Language
    language: getLanguage(),
    ted: formattedTed,
    current_post: get(bidder, 'post.location.country') || NO_POST,
    cdo: get(bidder, 'cdo.name') || NO_CDO,
    comments: get(bidder, 'comments') || NO_COMMENTS,
  } : {
    name: (<Link to={`/profile/public/${id}/bureau`}>{name}</Link>),
    skill: get(bidder, 'skills[0].description') || NO_USER_SKILL_CODE,
    grade: get(bidder, 'grade') || NO_GRADE,
    // Update language
    language: getLanguage(),
    ted: formattedTed,
    current_post: get(bidder, 'current_assignment.position.post.location.country') || NO_POST,
    cdo: get(bidder, 'cdo.name') || NO_CDO,
  };

  if (isLoading) {
    keys(sections).forEach(k => {
      sections[k] = <Skeleton />;
    });
  }

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
          bureaus={bureaus}
          details={{ ocBureau, ocReason, status, shared }}
        />
      ),
    });
  };

  const getTRClass = () => {
    if (CDOView) {
      return '';
    } else if (shared) {
      return 'ab-active';
    }
    return 'ab-inactive';
  };

  return (
    <tr className={getTRClass()}>
      {
        keys(sections).map(i => (
          <td>{sections[i]}</td>
        ))
      }
      {
        isLoading && isCDO ? <td><Skeleton /></td> :
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
                <InteractiveElement onClick={availableBidderModal}>
                  <FA name="pencil-square-o" className="fa-lg" />
                </InteractiveElement>
              </Tooltip>
              {
                status === 'OC' || status === 'UA' ?
                  <Tooltip
                    title={shared ? 'Unshare with Bureaus' : 'Share with Bureaus'}
                    arrow
                    offset={-95}
                    position="top-end"
                    tabIndex="0"
                  >
                    <InteractiveElement
                      onClick={() => dispatch(availableBidderEditData(id, { is_shared: !shared }))}
                    >
                      <FA name={shared ? 'building' : 'building-o'} className="fa-lg" />
                    </InteractiveElement>
                  </Tooltip>
                  :
                  <Tooltip
                    title={'Status must be UA or OC to share with bureau'}
                    arrow
                    offset={-95}
                    position="top-end"
                    tabIndex="0"
                  >
                    <FA name="lock" className="fa-lg" />
                  </Tooltip>
              }
              <Tooltip
                title="Remove from Available Bidders List"
                arrow
                offset={-95}
                position="top-end"
                tabIndex="0"
              >
                <InteractiveElement
                  onClick={() => dispatch(availableBiddersToggleUser(id, true, true))}
                >
                  <FA name="trash-o" className="fa-lg" />
                </InteractiveElement>
              </Tooltip>
            </div>
          </td>
      }
    </tr>
  );
};

AvailableBidderRow.propTypes = {
  bidder: PropTypes.shape({}),
  // build out bidder proptype after connected with real data
  CDOView: PropTypes.bool,
  isLoading: PropTypes.bool,
  isCDO: PropTypes.bool,
  bureaus: FILTER,
};

AvailableBidderRow.defaultProps = {
  bidder: {},
  CDOView: false,
  isLoading: false,
  isCDO: false,
  bureaus: [],
};

export default AvailableBidderRow;
