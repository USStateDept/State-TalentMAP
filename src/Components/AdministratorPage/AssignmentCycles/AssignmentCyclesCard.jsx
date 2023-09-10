import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import { NO_DATE } from 'Constants/SystemMessages';
import EditAssignmentCycles from './EditAssignmentCycles';

const ManageBidSeasonsCard = (props) => {
  const {
    cycle_begin_date,
    cycle_end_date,
    cycle_name,
    cycle_category,
    cycle_excl_position,
    cycle_post_view,
    cycle_status,
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
  const editSeason = (currentAssignmentInfo, isNew) => {
    swal({
      title: 'Assignment Cycle',
      button: false,
      content: (
        <EditAssignmentCycles
          submitAction={submitAction}
          id={isNew ? '' : id}
          currentAssignmentInfo={isNew ? {} : currentAssignmentInfo}
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
      <Row fluid className="assignment-cycle-search-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column columns={12} className="bs-card--middle-cols">
            <Column>
              Cycle Name: {cycle_name}
            </Column>
            <Column>
              Status: {cycle_status}
            </Column>
            <Column>
              Begin Date: {formatDate(cycle_begin_date)}
            </Column>
            <Column>
              End Date: {formatDate(cycle_end_date)}
            </Column>
            <Column>
              Excl Pos: {cycle_excl_position}
            </Column>
            <Column>
              Post View: {cycle_post_view}
            </Column>
          </Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editSeason({
                  cycle_name,
                  cycle_category,
                  cycle_begin_date,
                  cycle_end_date,
                  cycle_excl_position,
                  cycle_post_view,
                  cycle_status,
                  description,
                }, false);
              }
              }
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
  cycle_begin_date: PropTypes.string.isRequired,
  cycle_end_date: PropTypes.string.isRequired,
  cycle_name: PropTypes.string.isRequired,
  cycle_category: PropTypes.string.isRequired,
  cycle_excl_position: PropTypes.string.isRequired,
  cycle_post_view: PropTypes.string.isRequired,
  cycle_status: PropTypes.string.isRequired,
  id: PropTypes.string,
  description: PropTypes.string.isRequired,
  displayNewModal: PropTypes.bool.isRequired,
};

ManageBidSeasonsCard.defaultProps = {
  cycle_begin_date: '',
  cycle_end_date: '',
  cycle_name: '',
  cycle_category: '',
  cycle_excl_position: '',
  cycle_post_view: '',
  cycle_status: '',
  id: '',
  description: '',
  displayNewModal: false,
};

export default ManageBidSeasonsCard;
