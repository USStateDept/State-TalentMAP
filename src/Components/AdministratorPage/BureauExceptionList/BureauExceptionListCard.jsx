import { useEffect } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Column, Row } from 'Components/Layout';
import EditBureauExceptionList from './EditBureauExceptionList';

const BureauExceptionListCard = (props) => {
  const {
    Name,
    BureauNames,
    displayNewModal,
  } = props;

  const submitAction = () => {
    swal.close();
  };

  // =============== View Mode ===============
  const editSeason = (name) => {
    swal({
      title: 'Bureaus',
      button: false,
      content: (
        <EditBureauExceptionList
          submitAction={submitAction}
          Name={name}
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
          <Column>
            Person: {Name}
          </Column>
          <Column>
            Bureau Access: {BureauNames.toString()}
          </Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editSeason(Name);
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

BureauExceptionListCard.propTypes = {
  Name: PropTypes.string.isRequired,
  BureauNames: PropTypes.string.isRequired,
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

BureauExceptionListCard.defaultProps = {
  Name: '',
  BureauNames: '',
  displayNewModal: false,
};

export default BureauExceptionListCard;
