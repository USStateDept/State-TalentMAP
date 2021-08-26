import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys } from 'lodash';
import { formatDate, getCustomLocation, useCloseSwalOnUnmount } from 'utilities';
import { availableBidderEditData, availableBiddersToggleUser } from 'actions/availableBidders';
import { useDispatch } from 'react-redux';
import {
  NO_BUREAU, NO_CDO, NO_COMMENTS, NO_DATE, NO_END_DATE, NO_GRADE, NO_LANGUAGE,
  NO_LANGUAGES, NO_OC_REASON, NO_STATUS,
} from 'Constants/SystemMessages';
import EditBidder from 'Components/AvailableBidder/EditBidder';
import InteractiveElement from 'Components/InteractiveElement';
import MailToButton from 'Components/MailToButton';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import swal from '@sweetalert/with-react';
import { FILTER } from 'Constants/PropTypes';

import SkillCodeList from '../../SkillCodeList';


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading, isCDO, bureaus } = props;

  useCloseSwalOnUnmount();

  // Formatting
  const shared = get(bidder, 'available_bidder_details.is_shared', false);
  const ted = get(bidder, 'current_assignment.end_date');
  const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
  const id = get(bidder, 'bidder_perdet') || get(bidder, 'perdet_seq_number');
  const name = get(bidder, 'name');
  const ocBureau = get(bidder, 'available_bidder_details.oc_bureau');
  const ocReason = get(bidder, 'available_bidder_details.oc_reason');
  const status = get(bidder, 'available_bidder_details.status');
  const languages = get(bidder, 'languages') || [];
  const cdo = get(bidder, 'cdo', false);
  const bidderBureau = get(bidder, 'current_assignment.position.bureau_code');
  const created = get(bidder, 'available_bidder_details.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;

  const getStatus = () => {
    if (status === 'OC') {
      return (
        <Tooltip
          html={
            <div>
              <div className={'tooltip-text'}>
                <div>
                  <span className="title">OC Reason:</span> <span className="text">{ocReason || NO_OC_REASON}</span>
                </div>
                <div>
                  <span className="title">OC Bureau:</span> <span className="text">{ocBureau || NO_BUREAU}</span>
                </div>
              </div>
            </div>
          }
          theme="oc-status"
          arrow
          tabIndex="0"
          interactive
          useContext
        >
          {status || NO_STATUS} <FA className="oc-icon" name="question-circle" />
        </Tooltip>
      );
    }
    return status || NO_STATUS;
  };

  const getLanguages = () => (
    <div className="ab-languages">
      <Tooltip
        html={
          languages.map(l => (
            <div className="language-group">
              <span className="language-name">{get(l, 'language', NO_LANGUAGE)}: </span>
              <span className="title">Speaking:</span> <span className="text">{get(l, 'speaking_score') || NO_LANGUAGE} | </span>
              <span className="title">Reading:</span> <span className="text">{get(l, 'reading_score') || NO_LANGUAGE}</span>
            </div>
          ))
        }
        theme="ab-languages"
        arrow
        tabIndex="0"
        interactive
        useContext
      >
        {
          languages.map((l, i) => <span>{get(l, 'code')}{i === languages.length - 1 ? '' : ', '}</span>)
        }
        <FA className="oc-icon" name="question-circle" />
      </Tooltip>
    </div>
  );

  const currentPost = getCustomLocation(get(bidder, 'current_assignment.position.post.location', false),
    get(bidder, 'current_assignment.position.organization'));

  const getCDO = () => (
    <MailToButton email={get(cdo, 'email')} textBefore={`${get(cdo, 'first_name[0]')}. ${get(cdo, 'last_name')}`} />
  );


  const sections = isCDO ? {
    name: (<Link to={`/profile/public/${id}`}>{name}</Link>),
    status: getStatus(),
    skill: <SkillCodeList skillCodes={get(bidder, 'skills')} />,
    grade: get(bidder, 'grade') || NO_GRADE,
    languages: languages.length ? getLanguages() : NO_LANGUAGES,
    ted: formattedTed,
    current_post: currentPost,
    cdo: cdo ? getCDO() : NO_CDO,
    comments: get(bidder, 'available_bidder_details.comments') || NO_COMMENTS,
  } : {
    name: (<Link to={`/profile/public/${id}/bureau`}>{name}</Link>),
    skill: <SkillCodeList skillCodes={get(bidder, 'skills')} />,
    grade: get(bidder, 'grade') || NO_GRADE,
    languages: languages ? getLanguages() : NO_LANGUAGES,
    ted: formattedTed,
    current_post: currentPost,
    cdo: cdo ? getCDO() : NO_CDO,
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
          details={{ ocBureau,
            ocReason,
            status,
            shared,
            languages,
            bidderBureau,
            formattedCreated }}
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
        keys(sections).map(i => {
          if (i === 'comments' && sections[i] === NO_COMMENTS) {
            return (<td key={i}><text aria-disabled="true" className="no-comments">{sections[i]}</text></td>);
          }
          return (
            <td key={i}>{sections[i]}</td>
          );
        })
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
