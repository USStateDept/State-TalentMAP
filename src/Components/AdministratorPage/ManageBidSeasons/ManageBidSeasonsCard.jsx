import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import {
  NO_DATE, NO_GRADE, NO_NOTES,
} from 'Constants/SystemMessages';
import { availableBidderEditData } from 'actions/availableBidders';
import EditBidSeasons from './EditBidSeasons';

const ManageBidSeasonsCard = (props) => {
  const {
    cycle_name,
    cycle_category,
    cycle_begin_date,
    cycle_end_date,
    cycle_excl_position,
    id,
    bidder,
    bureaus,
    sort,
    isPost,
    isInternalCDA,
  } = props;

  const shared = get(bidder, 'available_bidder_details.is_shared', false);
  const ocBureau = get(bidder, 'available_bidder_details.oc_bureau');
  const ocReason = get(bidder, 'available_bidder_details.oc_reason');
  const status = get(bidder, 'available_bidder_details.status');
  const languages = get(bidder, 'languages') || [];
  const name = get(bidder, 'name');
  const bidderBureau = get(bidder, 'current_assignment.position.bureau_code');
  const created = get(bidder, 'available_bidder_details.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;
  const stepLetterOne = get(bidder, 'available_bidder_details.step_letter_one');
  const stepLetterTwo = get(bidder, 'available_bidder_details.step_letter_two');
  const notes = get(bidder, 'available_bidder_details.comments') || NO_NOTES;
  const tedToolTip =
  (<Tooltip
    html={
      <div>
        <div className="ab-row-tooltip-wrapper">
          <div>
            <span className="title">TED: <span className="ab-row-tooltip-data">TEST</span></span>
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
    TEST
  </Tooltip>);
  const notesToolTip = notes !== NO_NOTES ?
    (<Tooltip
      html={
        <div>
          <div className="ab-row-tooltip-wrapper">
            <div>
              <span className="title">Notes: <span className="ab-row-tooltip-data">{notes}</span></span>
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
    </Tooltip>) : notes;
  const getSections = (isModal = false) => {
    // when adding/removing columns, make sure to update the
    // $abl-actions-td and $abl-gray-config variables
    const notes$ = isModal ? get(bidder, 'available_bidder_details.comments') || NO_NOTES : notesToolTip;
    const ted$ = tedToolTip;
    return isInternalCDA ? {
      grade: get(bidder, 'grade') || NO_GRADE,
      ted: ted$,
      notes: notes$,
    } : {
      name: (<Link to={`/profile/public/${id}/${isPost ? 'post' : 'bureau'}`}>{name}</Link>),
      grade: get(bidder, 'grade') || NO_GRADE,
      ted: ted$,
    };
  };

  const modalSections = getSections(true);
  const dispatch = useDispatch();
  const submitAction = (userInputs) => {
    dispatch(availableBidderEditData(id, userInputs, sort));
    swal.close();
  };

  // =============== View Mode ===============
  const editSeason = () => {
    swal({
      title: 'Bid Season Information',
      button: false,
      content: (
        <EditBidSeasons
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

  return (
    <div className="position-form">
      <Row fluid className="cycle-search-card box-shadow-standard">
        <Row fluid className="cyc-card--row">
          <Column columns={3}>
            {cycle_name}
          </Column>
          <Column columns={12} className="cyc-card--middle-cols">
            <Column>
              {`Start Date: ${cycle_begin_date ? formatDate(cycle_begin_date) : ''}`}
            </Column>
            <Column>
              {`End Date: ${cycle_end_date ? formatDate(cycle_end_date) : ''}`}
            </Column>
            <Column>
              {`Panel Cutoff: ${cycle_category}`}
            </Column>
            <Column>
              {`Future Vacancy: ${cycle_excl_position}`}
            </Column>
          </Column>
          <Column onClick={() => editSeason(props)} columns={3} className="cyc-card--link-col">
            <span>
              <FA className="fa-solid fa-plus" />
              {' Edit'}
            </span>
          </Column>
        </Row>
      </Row>
    </div>
  );
};


export default ManageBidSeasonsCard;
