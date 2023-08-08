import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    description,
    bidder,
    displayNewModal,
  } = props;
  const created = get(bidder, 'bid-seasons.date_created');
  const formattedCreated = created ? formatDate(created) : NO_DATE;
  const startDate = get(bidder, 'bid-seasons.start_date');
  const endDate = get(bidder, 'bid-seasons.end_date');
  const panelCutoff = get(bidder, 'bid-seasons.panel_cutOff');
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
              startDate,
              endDate,
              panelCutoff,
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
      <Row fluid className="bid-seasons-search-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column columns={3}>
            {bid_seasons_name}
          </Column>
          <Column columns={12} className="bs-card--middle-cols">
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
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editSeason({
                  bid_seasons_begin_date,
                  bid_seasons_end_date,
                  bid_seasons_name,
                  bid_seasons_category,
                  bid_seasons_future_vacancy,
                  description,
                }, false);
              }
              }
              to="#"
            >
              <FA className="fa-solid fa-pencil" />
              {' Edit'}
            </Link>
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
  bid_seasons_future_vacancy: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string.isRequired,
  displayNewModal: PropTypes.bool.isRequired,
  bidder: PropTypes.shape({
    'bid-seasons': PropTypes.shape({
      date_created: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      panelCutoff: PropTypes.string,
    }),
  }).isRequired,
};

ManageBidSeasonsCard.defaultProps = {
  bid_seasons_name: '',
  bid_seasons_category: '',
  bid_seasons_begin_date: '',
  bid_seasons_end_date: '',
  bid_seasons_panel_cutoff: '',
  bid_seasons_future_vacancy: '',
  id: '',
  description: '',
  displayNewModal: false,
};

export default ManageBidSeasonsCard;
