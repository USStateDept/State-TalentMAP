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
              Start Date: {props?.bidSeasonsBeginDate ? formatDate(props?.bidSeasonsBeginDate) : ''}
            </Column>
            <Column>
              End Date: {props?.bidSeasonsEndDate ? formatDate(props?.bidSeasonsEndDate) : ''}
            </Column>
            <Column>
              Panel Cutoff: {props?.bidSeasonsPanelCutoff ? formatDate(props?.bidSeasonsPanelCutoff) : ''}
            </Column>
            <Column>
              Future Vacancy: {props?.bidSeasonsFutureVacancy}
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
  bidSeasonsBeginDate: PropTypes.string.isRequired,
  bidSeasonsEndDate: PropTypes.string.isRequired,
  bidSeasonsPanelCutoff: PropTypes.string.isRequired,
  bidSeasonsFutureVacancy: PropTypes.string.isRequired,
};

export default ManageBidSeasonsCard;
