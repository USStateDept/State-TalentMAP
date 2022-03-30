import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys, omit } from 'lodash';
import { checkFlag } from 'flags';
import { formatDate, getCustomLocation, useCloseSwalOnUnmount } from 'utilities';
import { availableBidderEditData, availableBiddersToggleUser } from 'actions/availableBidders';
import { useDispatch } from 'react-redux';
import {
  NO_BUREAU, NO_CDO, NO_COMMENTS, NO_DATE, NO_END_DATE, NO_GRADE, NO_LANGUAGE,
  NO_LANGUAGES, NO_NUMBER, NO_OC_REASON, NO_STATUS,
} from 'Constants/SystemMessages';
import EditBidder from 'Components/AvailableBidder/EditBidder';
import InteractiveElement from 'Components/InteractiveElement';
import MailToButton from 'Components/MailToButton';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import swal from '@sweetalert/with-react';
import { AVAILABLE_BIDDER_OBJECT, FILTER } from 'Constants/PropTypes';
import SkillCodeList from '../../SkillCodeList';

const useStepLetter = () => checkFlag('flags.step_letters');


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading, isCDO, isAO, isPost, bureaus } = props;
  const isCDOorAO = (isCDO || isAO);

  useCloseSwalOnUnmount();

  // Formatting
  const shared = get(bidder, 'available_bidder_details.is_shared', false);
  const ted = get(bidder, 'current_assignment.end_date');
  const formattedTed = ted ? formatDate(ted, 'MM/YYYY') : NO_END_DATE;
  const formattedTedTooltip = ted ? formatDate(ted) : NO_END_DATE;
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
  const stepLetterOne = get(bidder, 'available_bidder_details.step_letter_one');
  const formattedStepLetterOne = stepLetterOne ? formatDate(stepLetterOne, 'M/D/YY') : NO_DATE;
  const stepLetterTwo = get(bidder, 'available_bidder_details.step_letter_two');
  const formattedStepLetterTwo = stepLetterTwo ? formatDate(stepLetterTwo, 'M/D/YY') : NO_DATE;
  const stepLetters = {
    letter_one: formattedStepLetterOne,
    letter_two: formattedStepLetterTwo,
  };

  const noStepLettersIconStyling = formattedStepLetterOne === NO_DATE ? 'no-step-letters-icon' : '';
  const stepLetterOneIconStyling = (formattedStepLetterOne !== NO_DATE)
    && (formattedStepLetterTwo === NO_DATE) ? 'one-step-letter-icon' : '';
  const stepLettersOneAndTwoIconStyling = (formattedStepLetterOne !== NO_DATE)
    && (formattedStepLetterTwo !== NO_DATE) ? 'both-step-letters-icon' : '';
  const comments = get(bidder, 'available_bidder_details.comments') || NO_COMMENTS;
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
              <span className="language-name">{get(l, 'language') || NO_LANGUAGE}: </span>
              <span className="title">Speaking:</span> <span className="text">{get(l, 'speaking_score') || NO_NUMBER} | </span>
              <span className="title">Reading:</span> <span className="text">{get(l, 'reading_score') || NO_NUMBER}</span>
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

  const stepLettersToolTip =
    (<Tooltip
      html={
        <div>
          <div className="step-letter-tooltip-wrapper">
            <div>
              <span className="title">Letter 1: <span className="step-letter-date">{stepLetters.letter_one}</span></span>
            </div>
            <div>
              <span className="title">Letter 2: <span className="step-letter-date">{stepLetters.letter_two}</span></span>
            </div>
          </div>
        </div>
      }
      theme="step-letters"
      arrow
      tabIndex="0"
      interactive
      useContext
    >
      <FA
        name="envelope-square"
        className={`fa-2x ${noStepLettersIconStyling} ${stepLetterOneIconStyling} ${stepLettersOneAndTwoIconStyling}`}
      />
    </Tooltip>);

  const tedToolTip =
    (<Tooltip
      html={
        <div>
          <div className="ab-row-tooltip-wrapper">
            <div>
              <span className="title">TED: <span className="ab-row-tooltip-data">{formattedTedTooltip}</span></span>
            </div>
          </div>
        </div>
      }
      theme="ab-row"
      arrow
      tabIndex="0"
      interactive
      useContext
    >
      {formattedTed}
    </Tooltip>);

  const commentsToolTip = comments !== NO_COMMENTS ?
    (<Tooltip
      html={
        <div>
          <div className="ab-row-tooltip-wrapper">
            <div>
              <span className="title">Comments: <span className="ab-row-tooltip-data">{comments}</span></span>
            </div>
          </div>
        </div>
      }
      theme="ab-row"
      arrow
      tabIndex="0"
      interactive
      useContext
    >
      <FA name="comments" className="fa-lg comments-icon" />
    </Tooltip>) : comments;

  const getSections = (isModal = false) => {
    const comments$ = isModal ? get(bidder, 'available_bidder_details.comments') || NO_COMMENTS : commentsToolTip;
    const ted$ = isModal ? formattedTedTooltip : tedToolTip;
    return isCDOorAO ? omit({
      name: (<Link to={`/profile/public/${id}${isAO ? '/bureau' : ''}`}>{name}</Link>),
      status: getStatus(),
      step_letters: stepLettersToolTip,
      skill: <SkillCodeList skillCodes={get(bidder, 'skills')} />,
      grade: get(bidder, 'grade') || NO_GRADE,
      languages: languages.length ? getLanguages() : NO_LANGUAGES,
      ted: ted$,
      current_post: currentPost,
      cdo: cdo ? getCDO() : NO_CDO,
      comments: comments$,
    }, useStepLetter() ? [] : ['step_letters']) : {
      name: (<Link to={`/profile/public/${id}/${isPost ? 'post' : 'bureau'}`}>{name}</Link>),
      skill: <SkillCodeList skillCodes={get(bidder, 'skills')} />,
      grade: get(bidder, 'grade') || NO_GRADE,
      languages: languages ? getLanguages() : NO_LANGUAGES,
      ted: ted$,
      current_post: currentPost,
      cdo: cdo ? getCDO() : NO_CDO,
    };
  };

  const modalSections = getSections(true);
  const rowSections = getSections(false);

  if (isLoading) {
    keys(rowSections).forEach(k => {
      rowSections[k] = <Skeleton />;
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
          sections={modalSections}
          submitAction={submitAction}
          bureaus={bureaus}
          details={{ ocBureau,
            ocReason,
            status,
            shared,
            languages,
            bidderBureau,
            formattedCreated,
            stepLetterOne,
            stepLetterTwo }}
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
        keys(rowSections).map(i => {
          if (i === 'comments' && rowSections[i] === NO_COMMENTS) {
            return (<td key={i}><text aria-disabled="true" className="no-comments">{rowSections[i]}</text></td>);
          }
          return (
            <td key={i}>{rowSections[i]}</td>
          );
        })
      }
      {
        isLoading && isCDOorAO ? <td><Skeleton /></td> :
          isCDOorAO &&
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
  bidder: AVAILABLE_BIDDER_OBJECT,
  CDOView: PropTypes.bool,
  isLoading: PropTypes.bool,
  isCDO: PropTypes.bool,
  isAO: PropTypes.bool,
  isPost: PropTypes.bool,
  bureaus: FILTER,
};

AvailableBidderRow.defaultProps = {
  bidder: {},
  CDOView: false,
  isLoading: false,
  isCDO: false,
  isAO: false,
  isPost: false,
  bureaus: [],
};

export default AvailableBidderRow;
