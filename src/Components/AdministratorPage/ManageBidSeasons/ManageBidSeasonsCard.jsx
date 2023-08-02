import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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

  const created = get(bidder, 'bid-seasons.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;
  const stepLetterOne = get(bidder, 'bid-seasons.step_letter_one');
  const stepLetterTwo = get(bidder, 'bid-seasons.step_letter_two');

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
          details={
            isNew ? {} : {
              formattedCreated,
              stepLetterOne,
              stepLetterTwo,
            }}
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
            <span className="editHover">
              <FA className="fa-solid fa-plus" />
              {' Edit'}
            </span>
          </Column>
        </Row>
      </Row>
    </div>
  );
};

ManageBidSeasonsCard.propTypes = {
  cycle_name: PropTypes.string,
  cycle_category: PropTypes.string,
  cycle_begin_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  cycle_excl_position: PropTypes.string,
  id: PropTypes.string,
  sort: PropTypes.string.isRequired,
  displayNewModal: PropTypes.bool.isRequired,
  bidder: PropTypes.shape({
    'bid-seasons': PropTypes.shape({
      date_created: PropTypes.string,
      step_letter_one: PropTypes.string,
      step_letter_two: PropTypes.string,
    }),
  }).isRequired,
};

ManageBidSeasonsCard.defaultProps = {
  cycle_name: '',
  cycle_category: '',
  cycle_begin_date: '',
  cycle_end_date: '',
  cycle_excl_position: '',
  id: '',
  sort: '',
  displayNewModal: false,
};

export default ManageBidSeasonsCard;
