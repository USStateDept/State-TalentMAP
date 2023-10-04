import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import { bidSeasonsEdit } from 'actions/BidSeasons';
import EditBidSeasons from './EditBidSeasons';

const ManageBidSeasonsCard = (props) => {
  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(bidSeasonsEdit(data));
  };


  const editSeason = () => {
    swal({
      title: 'Bid Season Information',
      button: false,
      content: (
        <EditBidSeasons
          submitAction={submit}
          {...props}
        />
      ),
    });
  };

  return (
    <div className="position-form">
      <Row fluid className="bid-seasons-search-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column columns={3}>
            {props?.description}
          </Column>
          <Column columns={12} className="bs-card--middle-cols">
            <Column>
              Start Date: {props?.bid_seasons_begin_date ? formatDate(props?.bid_seasons_begin_date) : ''}
            </Column>
            <Column>
              End Date: {props?.bid_seasons_end_date ? formatDate(props?.bid_seasons_end_date) : ''}
            </Column>
            <Column>
              Panel Cutoff: {props?.bid_seasons_panel_cutoff ? formatDate(props?.bid_seasons_panel_cutoff) : ''}
            </Column>
            <Column>
              Future Vacancy: {props?.bid_seasons_future_vacancy}
            </Column>
          </Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editSeason();
              }}
              to="#"
            >
              <FA className="fa-solid fa-pencil" />
               Edit
            </Link>
          </Column>
        </Row>
      </Row>
    </div>
  );
};

ManageBidSeasonsCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  bid_seasons_begin_date: PropTypes.string.isRequired,
  bid_seasons_end_date: PropTypes.string.isRequired,
  bid_seasons_panel_cutoff: PropTypes.string.isRequired,
  bid_seasons_future_vacancy: PropTypes.string.isRequired,
};

export default ManageBidSeasonsCard;
