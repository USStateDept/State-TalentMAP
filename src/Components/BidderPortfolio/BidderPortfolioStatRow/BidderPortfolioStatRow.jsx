import { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { Cusp, Eligible } from 'Components/Ribbon';
import { NO_GRADE, NO_LANGUAGE, NO_POST, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { formatDate } from 'utilities';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import { toastSuccess } from 'actions/toast';
import ToggleButton from 'Components/ToggleButton';
import InteractiveElement from 'Components/InteractiveElement';
import { BIDDER_OBJECT, CLASSIFICATIONS } from '../../../Constants/PropTypes';
import SkillCodeList from '../../SkillCodeList';
import ClientBadgeList from '../ClientBadgeList';
import CheckboxList from '../CheckboxList';
import SearchAsClientButton from '../SearchAsClientButton';
import AddToInternalListButton from '../AddToInternalListButton';

const BidderPortfolioStatRow = ({ userProfile, showEdit, classifications }) => {
  const dispatch = useDispatch();
  const currentAssignmentText = get(userProfile, 'pos_location');
  const clientClassifications = get(userProfile, 'classifications');
  const perdet = get(userProfile, 'perdet_seq_number');
  const id = get(userProfile, 'employee_id');
  const ted = formatDate(get(userProfile, 'current_assignment.end_date'));
  const languages = get(userProfile, 'current_assignment.position.language');
  const bidder = get(userProfile, 'shortened_name') || 'None listed';
  const orgShortDesc = get(userProfile, 'current_assignment.position.organization');
  const email = get(userProfile, 'cdos')[0]?.cdo_email || 'None listed';
  const [edit, setEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [included, setIncluded] = useState(true);
  const [comments, setComments] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [verifyComments, setVerifyComments] = useState('');
  const [verifyAltEmail, setVerifyAltEmail] = useState('');

  const editClient = (e) => {
    e.preventDefault();
    setEdit(previous => !previous);
  };

  const saveEdit = () => {
    setComments(verifyComments);
    setAltEmail(verifyAltEmail);
    // Nothing to do yet, will add later
    dispatch(toastSuccess(`Changes saved for ${bidder}.`));
    setEdit(false);
  };

  const showSaveAndCancel = edit && showMore;

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

  // const cusp = get(userProfile, 'cusp', false);
  // using this as a placeholder
  const cusp = true;
  const eligible = get(userProfile, 'eligible', false);

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
        <h3 className="stat-card-client">Client Overview</h3>
        <ToggleButton
          labelTextRight={!included ? 'Excluded' : 'Included'}
          checked={included}
          onChange={() => setIncluded(!included)}
          onColor="#0071BC"
        />
      </div>
      { showMore &&
        <div className="stat-card-data-point stat-card-data-point--name stat-card-data-space">
          <Link to={`/profile/public/${perdet}`}>{bidder}</Link>
          <Link to="#" onClick={(e) => editClient(e)}>
            <FA name="pencil" />
            Edit
          </Link>
        </div>
      }
      <div className="bidder-portfolio-ribbon-container">
        <div className="ribbon-container-condensed">
          {ribbons}
        </div>
      </div>
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
      { showMore &&
        <div>
          <div className="stat-card-data-point stat-card-comments">
            <dt>Comments:</dt>
            <dd className="stat-card-dd">
              <TextareaAutosize
                className="stat-card-textarea"
                maxRows={4}
                minRows={4}
                disabled={!edit}
                maxLength="255"
                name="note"
                placeholder="No Notes"
                defaultValue={!comments ? '' : comments}
                onChange={(e) => setVerifyComments(e.target.value)}
              />
            </dd>
          </div>
          <div className="stat-card-data-point">
            <dt>DOS Email:</dt><a href="mailto: example@gmail.com">{email}</a>
          </div>
          <div className={!edit && 'stat-card-data-point'} >
            <dt>Alt Email:</dt>
            <a href={`mailto: ${altEmail}`}>{altEmail}</a>
            {edit &&
              <input
                type="text"
                defaultValue=""
                placeholder="example@gmail.com"
                onChange={(e) => setVerifyAltEmail(e.target.value)}
              />
            }
          </div>
        </div>
      }
      { showSaveAndCancel &&
        <div className="stat-card-btn-container">
          <button className="stat-card-cancel-btn" onClick={onCancel}>Cancel</button>
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
      <div className="toggle-more-container">
        <InteractiveElement className="toggle-more" onClick={collapseCard}>
          <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
        </InteractiveElement>
      </div>
    </div>
  );
};

BidderPortfolioStatRow.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
  showEdit: PropTypes.bool,
  classifications: CLASSIFICATIONS,
};

BidderPortfolioStatRow.defaultProps = {
  showEdit: false,
  classifications: [],
};

export default BidderPortfolioStatRow;
