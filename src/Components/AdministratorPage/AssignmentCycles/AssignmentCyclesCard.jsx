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
    description,
    displayNewModal,
  } = props;

  // =============== View Mode ===============
  const editSeason = (currentAssignmentInfo, isNew) => {
    swal({
      title: 'Assignment Cycle',
      button: false,
      content: (
        <EditAssignmentCycles
          id={isNew ? '' : id}
          details={
            isNew ? {} : {
              cycle_name,
              cycle_category,
              cycle_begin_date,
              cycle_end_date,
              cycle_excl_position,
              cycle_post_view,
              cycle_status,
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
