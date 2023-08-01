import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import { NO_DATE } from 'Constants/SystemMessages';
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
    sort,
    displayNewModal,
  } = props;


  const shared = get(bidder, 'available_bidder_details.is_shared', false);
  const ocBureau = get(bidder, 'available_bidder_details.oc_bureau');
  const ocReason = get(bidder, 'available_bidder_details.oc_reason');
  const status = get(bidder, 'available_bidder_details.status');
  const languages = get(bidder, 'languages') || [];
  const bidderBureau = get(bidder, 'current_assignment.position.bureau_code');
  const created = get(bidder, 'available_bidder_details.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;
  const stepLetterOne = get(bidder, 'available_bidder_details.step_letter_one');
  const stepLetterTwo = get(bidder, 'available_bidder_details.step_letter_two');

  const dispatch = useDispatch();
  const submitAction = (userInputs) => {
    dispatch(availableBidderEditData(id, userInputs, sort));
    swal.close();
  };

  // =============== View Mode ===============
  const editSeason = (seasonInfo, isNew) => {
    swal({
      title: 'Bid Season Information',
      button: false,
      content: (
        <EditBidSeasons
          submitAction={submitAction}
          id={isNew ? '' : id}
          seasonInfo={isNew ? {} : seasonInfo}
          details={isNew ? {} : { ocBureau,
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

  useEffect(() => {
    if (displayNewModal) {
      editSeason({}, true);
    }
  }, [displayNewModal]);

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
          <Column onClick={() => editSeason({ cycle_begin_date, cycle_end_date, cycle_name, cycle_category, cycle_excl_position }, false)} columns={3} className="cyc-card--link-col">
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
