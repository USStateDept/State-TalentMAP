import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from 'utilities';
import { Column, Row } from 'Components/Layout';
import EditAssignmentCycles from './EditAssignmentCycles';

const AssignmentCyclesCard = (props) => {
  const {
    cycle_begin_date,
    cycle_end_date,
    cycle_name,
    cycle_category,
    cycle_excl_position,
    cycle_post_view,
    cycle_status,
    id,
    displayNewModal,
  } = props;

  const dummyInfo = {
    assignmentCycle: 'This is a dummy assignment cycle',
    cycleCategory: 'Summer',
    cycleStatus: 'Winter',
    excludePosition: 'Yes',
    postView: 'Yes',
    cycleBoundary: [formatDate('1976-10-01T21:12:12.854000Z'), formatDate('2014-31-12T21:12:12.854000Z')],
    sixMonthBoundary: [formatDate('1976-11-11T21:12:12.854000Z'), formatDate('2022-31-17T21:12:12.854000Z')],
    twelveMonthBoundary: [formatDate('2005-10-25T21:12:12.854000Z'), formatDate('2018-31-14T21:12:12.854000Z')],
    twentyFourMonthBoundary: [formatDate('2003-10-22T21:12:12.854000Z'), formatDate('2014-31-22T21:12:12.854000Z')],
    bureaPositionReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidDueDate: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauPreSeasonBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauEarlySeasonBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidAudit: formatDate('1976-10-01T21:12:12.854000Z'),
    bidBookReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidCountReview: formatDate('1976-10-01T21:12:12.854000Z'),
    htfReview: formatDate('1976-10-01T21:12:12.854000Z'),
    organizationCountReview: formatDate('1976-10-01T21:12:12.854000Z'),
    mdsReview: formatDate('1976-10-01T21:12:12.854000Z'),
    assignedBidder: formatDate('1976-10-01T21:12:12.854000Z'),
  };

  // =============== View Mode ===============
  const editSeason = (details, isNew) => {
    swal({
      title: 'Assignment Cycle',
      button: false,
      content: (
        <EditAssignmentCycles
          id={isNew ? '' : id}
          details={
            isNew ? {} : {
              assignmentCycle: dummyInfo,
              details,
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
                  id,
                  cycle_name,
                  cycle_category,
                  cycle_begin_date,
                  cycle_end_date,
                  cycle_excl_position,
                  cycle_post_view,
                  cycle_status,
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

AssignmentCyclesCard.propTypes = {
  cycle_begin_date: PropTypes.string.isRequired,
  cycle_end_date: PropTypes.string.isRequired,
  cycle_name: PropTypes.string.isRequired,
  cycle_category: PropTypes.string.isRequired,
  cycle_excl_position: PropTypes.string.isRequired,
  cycle_post_view: PropTypes.string.isRequired,
  cycle_status: PropTypes.string.isRequired,
  id: PropTypes.string,
  displayNewModal: PropTypes.bool.isRequired,
};

AssignmentCyclesCard.defaultProps = {
  cycle_begin_date: '',
  cycle_end_date: '',
  cycle_name: '',
  cycle_category: '',
  cycle_excl_position: '',
  cycle_post_view: '',
  cycle_status: '',
  id: '',
  displayNewModal: false,
};

export default AssignmentCyclesCard;
