import { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { checkFlag } from 'flags';
import { Cusp, Eligible } from 'Components/Ribbon';
import { NO_GRADE, NO_LANGUAGE, NO_POST, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { formatDate, getBidderPortfolioUrl } from 'utilities';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import { saveBidderPortfolioSelections } from 'actions/bidderPortfolio';
import ToggleButton from 'Components/ToggleButton';
import InteractiveElement from 'Components/InteractiveElement';
import { BIDDER_OBJECT, CLASSIFICATIONS } from '../../../Constants/PropTypes';
import SkillCodeList from '../../SkillCodeList';
import ClientBadgeList from '../ClientBadgeList';
import CheckboxList from '../CheckboxList';
import SearchAsClientButton from '../SearchAsClientButton';
import AddToInternalListButton from '../AddToInternalListButton';

const BidderPortfolioStatRow = ({ userProfile, showEdit, classifications, viewType }) => {
  const dispatch = useDispatch();
  const showCDOD30 = checkFlag('flags.CDOD30');

  const currentAssignmentText = get(userProfile, 'pos_location');
  const clientClassifications = get(userProfile, 'classifications');
  const perdet = get(userProfile, 'perdet_seq_number');
  const id = get(userProfile, 'employee_id');
  const ted = formatDate(get(userProfile, 'current_assignment.end_date'));
  const languages = get(userProfile, 'current_assignment.position.language');
  const bidder = get(userProfile, 'shortened_name') || 'None listed';
  // This is the new key bidder_types. It returns a string of either 'cusp' or 'eligible'
  const bidderType = 'cusp';
  const orgShortDesc = get(userProfile, 'current_assignment.position.organization');
  const email = get(userProfile, 'cdos')[0]?.cdo_email || 'None listed';
  const [currentBidderType, setCurrentBidderType] = useState(bidderType);
  const [edit, setEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [included, setIncluded] = useState(bidderType === 'cusp');
  const [comments, setComments] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [verifyComments, setVerifyComments] = useState('');
  const [verifyAltEmail, setVerifyAltEmail] = useState('');

  const cusp = included;
  const eligible = !included;
  const showToggle = bidderType !== null;
  const showSaveAndCancel = edit && showMore;

  const editClient = (e) => {
    e.preventDefault();
    setEdit(previous => !previous);
  };

  const saveEdit = () => {
    setComments(verifyComments);
    setAltEmail(verifyAltEmail);
    // Nothing to do yet, will add later
    const clientData = {
      id,
      verifyComments,
      verifyAltEmail,
      bidder_type: currentBidderType,
    };
    dispatch(saveBidderPortfolioSelections(clientData));
    setEdit(false);
  };

  useEffect(() => {
    if (currentBidderType === 'eligible') {
      setIncluded(false);
    }
    if (currentBidderType === 'cusp') {
      setIncluded(true);
    }
  }, [currentBidderType]);

  const onToggleChange = () => {
    if (currentBidderType === 'cusp') {
      setCurrentBidderType('eligible');
    }
    if (currentBidderType === 'eligible') {
      setCurrentBidderType('cusp');
    }
  };

  const showSearch = !showEdit && !edit;
  const collapseCard = () => {
    setShowMore(!showMore);
    setEdit(false);
  };

  const onCancel = () => {
    setVerifyComments('');
    setVerifyAltEmail('');
    setEdit(false);
  };


  const ribbons = (
    <div>
      {
        eligible &&
        <Tooltip
          title="Eligible"
          arrow
          offset={-60}
        >
          <Eligible />
        </Tooltip>
      }
      {
        cusp &&
        <Tooltip
          title="Cusp"
          arrow
          offset={-60}
        >
          <Cusp />
        </Tooltip>
      }
    </div>
  );

  return (
    <div className="usa-grid-full bidder-portfolio-stat-row">
      <div className="stat-card-header">
        {showToggle && showCDOD30 &&
          <ToggleButton
            labelTextRight={!included ? 'Excluded' : 'Included'}
            checked={included}
            onChange={onToggleChange}
            onColor="#0071BC"
          />
        }
      </div>
      <div className="stat-card-data-point stat-card-data-point--name stat-card-data-space">
        <Link to={getBidderPortfolioUrl(perdet, viewType)}>{bidder}</Link>
        { showMore &&
          <Link to="#" onClick={(e) => editClient(e)}>
            <FA name="pencil" />
            Edit
          </Link>
        }
      </div>
      {showToggle && showCDOD30 &&
        <div className="bidder-portfolio-ribbon-container">
          <div className="ribbon-container-condensed">
            {ribbons}
          </div>
        </div>
      }
      <div>
        <div>
          <div className="stat-card-data-point">
            <dt>Employee ID:</dt><dd>{id}</dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Skill:</dt><dd><SkillCodeList skillCodes={userProfile.skills} /></dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Grade:</dt><dd>{userProfile.grade || NO_GRADE}</dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Languages:</dt><dd>{languages || NO_LANGUAGE}</dd>
          </div>
          <div className="stat-card-data-point">
            <dt>TED:</dt><dd>{ted || NO_TOUR_END_DATE}</dd>
          </div>
          <div className="stat-card-data-point">
            <dt>Location (Org):</dt><dd>{currentAssignmentText || NO_POST} ({orgShortDesc})</dd>
          </div>
        </div>

        { showCDOD30 &&
          <>
            <div className="stat-card-data-point">
              <dt>DOS Email:</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div className={!edit && 'stat-card-data-point'}>
              <dt>Alt Email:</dt>
              {altEmail ?
                <dd>
                  <a href={`mailto:${altEmail}`}>{altEmail}</a>
                </dd> :
                <dd>
                  None Listed
                </dd>}
              {edit &&
                <input
                  type="text"
                  defaultValue=""
                  placeholder="example@gmail.com"
                  onChange={(e) => setVerifyAltEmail(e.target.value)}
                />
              }
            </div>
          </>
        }


        {
          !showEdit &&
          <div className="bidder-portfolio-stat-row-updates">
            <h4>Classifications: </h4>
            <ClientBadgeList
              clientClassifications={clientClassifications}
              classifications={classifications}
            />
          </div>
        }
        {
          showEdit &&
          <CheckboxList id={userProfile.id} />
        }
      </div>
      { showMore && showEdit &&
        <div>
          <dt>Comments:</dt>
          <div className="stat-card-data-point stat-card-comments">
            <TextareaAutosize
              className="stat-card-textarea"
              disabled={!edit}
              maxLength="255"
              name="note"
              placeholder="No Notes"
              defaultValue={!comments ? '' : comments}
              onChange={(e) => setVerifyComments(e.target.value)}
            />
          </div>
        </div>
      }
      { showSaveAndCancel && showEdit && showCDOD30 &&
        <div className="stat-card-btn-container">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={saveEdit} disabled={!verifyComments && !verifyAltEmail}>Save</button>
        </div>
      }
      {
        showSearch &&
        <div className="button-container">
          <SearchAsClientButton user={userProfile} />
          <AddToInternalListButton refKey={perdet} />
        </div>
      }
      {
        showEdit && showCDOD30 &&
          <div className="toggle-more-container">
            <InteractiveElement className="toggle-more" onClick={collapseCard}>
              <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
            </InteractiveElement>
          </div>
      }
    </div>
  );
};

BidderPortfolioStatRow.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
  showEdit: PropTypes.bool,
  classifications: CLASSIFICATIONS,
  viewType: PropTypes.string,
};

BidderPortfolioStatRow.defaultProps = {
  showEdit: false,
  classifications: [],
  viewType: '',
};

export default BidderPortfolioStatRow;
