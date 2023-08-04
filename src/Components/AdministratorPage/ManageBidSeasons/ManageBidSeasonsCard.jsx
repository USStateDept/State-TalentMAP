import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import { NO_DATE } from 'Constants/SystemMessages';
import EditBidSeasons from './EditBidSeasons';

const ManageBidSeasonsCard = (props) => {
  const {
    bid_seasons_name,
    bid_seasons_category,
    bid_seasons_begin_date,
    bid_seasons_end_date,
    bid_seasons_future_vacancy,
    bid_seasons_panel_cutoff,
    id,
    bidder,
    displayNewModal,
  } = props;
  console.log('props', props);
  const created = get(bidder, 'bid-seasons.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;
  const stepLetterOne = get(bidder, 'bid-seasons.step_letter_one');
  const stepLetterTwo = get(bidder, 'bid-seasons.step_letter_two');
  const submitAction = () => {
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
            {bid_seasons_name}
          </Column>
          <Column columns={12} className="cyc-card--middle-cols">
            <Column>
              {`Start Date: ${bid_seasons_begin_date ? formatDate(bid_seasons_begin_date) : ''}`}
            </Column>
            <Column>
              {`End Date: ${bid_seasons_end_date ? formatDate(bid_seasons_end_date) : ''}`}
            </Column>
            <Column>
              {`Panel Cutoff: ${bid_seasons_panel_cutoff ? formatDate(bid_seasons_panel_cutoff) : ''}`}
            </Column>
            <Column>
              {`Future Vacancy: ${bid_seasons_future_vacancy}`}
            </Column>
          </Column>
          <Column onClick={() => editSeason({ bid_seasons_begin_date, bid_seasons_end_date, bid_seasons_name, bid_seasons_category, bid_seasons_future_vacancy }, false)} columns={3} className="cyc-card--link-col">
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
  bid_seasons_name: PropTypes.string,
  bid_seasons_category: PropTypes.string,
  bid_seasons_begin_date: PropTypes.string,
  bid_seasons_end_date: PropTypes.string,
  bid_seasons_panel_cutoff: PropTypes.string,
  id: PropTypes.string,
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
  bid_seasons_name: '',
  bid_seasons_category: '',
  bid_seasons_begin_date: '',
  bid_seasons_end_date: '',
  bid_seasons_panel_cutoff: '',
  id: '',
  displayNewModal: false,
};

export default ManageBidSeasonsCard;
