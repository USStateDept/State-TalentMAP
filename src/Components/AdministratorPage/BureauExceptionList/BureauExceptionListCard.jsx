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
    NameAbbreviation,
    displayNewModal,
  } = props;

  const submitAction = () => {
    swal.close();
  };

  // =============== View Mode ===============
  const editSeason = (seasonInfo, isNew) => {
    swal({
      title: 'Bid Season Information',
      button: false,
      content: (
        <EditBureauExceptionList
          submitAction={submitAction}
          seasonInfo={isNew ? {} : seasonInfo}
        />
      ),
    });
  };

  useEffect(() => {
    if (displayNewModal) {
      editSeason({}, true);
      console.log(NameAbbreviation);
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
                editSeason({}, false);
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
  NameAbbreviation: PropTypes.string.isRequired,
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
  NameAbbreviation: '',
  displayNewModal: false,
};

export default BureauExceptionListCard;
