import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Column, Row } from 'Components/Layout';
import EditBureauExceptionList from './EditBureauExceptionList';

const BureauExceptionListCard = (props) => {
  const {
    id,
    Name,
    BureauNames,
    BureauExceptionOptionsData,
    dispatch,
  } = props;

  const submitAction = () => {
    swal.close();
  };

  // =============== View Mode ===============
  const editBureau = (bureauUser) => {
    swal({
      title: 'Bureaus',
      button: false,
      content: (
        <EditBureauExceptionList
          submitActioaddn={submitAction}
          user={bureauUser}
          BureauExceptionOptionsData={BureauExceptionOptionsData}
          dispatch={dispatch}
        />
      ),
    });
  };


  return (
    <div className="position-form">
      <Row fluid className="bureau-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column>
            Person: {Name}
          </Column>
          <Column>
            Bureau Access: {BureauNames.toString().split(',').join(', ')}
          </Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editBureau({ id, Name, BureauNames });
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
  id: PropTypes.number.isRequired,
  Name: PropTypes.string.isRequired,
  BureauNames: PropTypes.string.isRequired,
  BureauExceptionOptionsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
    BureauNames: PropTypes.arrayOf(PropTypes.string),
  })),
  dispatch: PropTypes.func.isRequired,
};

BureauExceptionListCard.defaultProps = {
  id: 0,
  Name: '',
  BureauNames: '',
  BureauExceptionOptionsData: [],
  dispatch: () => {},
};

export default BureauExceptionListCard;
