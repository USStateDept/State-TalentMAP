import { useState } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveBureauExceptionSelections } from 'actions/bureauException';
import { Column, Row } from 'Components/Layout';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';

const BureauExceptionListCard = (props) => {
  const {
    id,
    Name,
    BureauExceptionOptionsData,
    BureauNames,
  } = props;

  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = BureauExceptionOptionsData;
  const [selectAll, setSelectAll] = useState(false);
  const [checkedBureauIds, setCheckedBureauIds] = useState([]);
  const [bureau, setBureau] = useState('');
  const [bureauCode, setBureauCode] = useState([]);

  const collapseCard = () => {
    setShowMore(!showMore);
    setEdit(e => !e);
  };

  const onCancelRequest = () => {
    swal.close();
    setEdit(false);
    setCheckedBureauIds([]);
    setBureau('');
    setBureauCode([]);
  };

  const submit = (e) => {
    e.preventDefault();
    const currentUser = {
      id,
      Name,
      bureauCode,
    };
    dispatch(saveBureauExceptionSelections(currentUser));
  };

  const cancel = (e) => {
    e.preventDefault();
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{'Are you sure you want to discard all changes made to this list?'}</span>
          </div>
          <div className="modal-controls">
            <button onClick={onCancelRequest}>Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
          </div>
        </div>
      ),
    });
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedBureauIds(
        data.map(bu => bu.id),
      );
      setBureauCode(data.map(bu => bu.bureaus[0]));
    } else {
      setSelectAll(false);
      setCheckedBureauIds([]);
    }
  };

  const handleSelectBureau = (bu => {
    if (checkedBureauIds.includes(bu.id)) {
      const filteredBureau = checkedBureauIds.filter(x => x !== bu.id);
      setCheckedBureauIds(filteredBureau);
      setBureauCode(bureauCode.filter(x => x !== bu.bureaus[0]));
    } else {
      setCheckedBureauIds([...checkedBureauIds, bu.id]);
      setBureauCode([...bureauCode, bu.bureaus[0]]);
    }
  });

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
                // editBureau({ id, Name, BureauNames });
                collapseCard();
              }
              }
              to="#"
            >
              {!edit ?
                <div>
                  <FA className="fa-solid fa-pencil" />
                  Edit
                </div>
                : <span>Close</span>
              }
            </Link>
          </Column>
        </Row>
        {edit &&
          <div>
            <form>
              <table className="bureau-exception-table">
                <thead>
                  <tr>
                    <div className="bureau-exception-text-input">
                      <TextInput
                        changeText={(e) => setBureau(e)}
                        label={`F/S Employee Name: ${Name}`}
                        placeholder="Filter by Bureau"
                        value={bureau}
                        id="bureau"
                        inputProps={{
                          autoComplete: 'off',
                        }}
                      />
                    </div>
                  </tr>
                  <tr>
                    <th className="checkbox-pac checkbox-pos">
                      <CheckBox
                        label="Bureau"
                        checked={!selectAll}
                        onCheckBoxClick={handleSelectAll}
                        value={selectAll}
                        id="selectAll"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className="bureau-exception-text-table">
                    {
                      data?.length &&
                        data.filter(item => item.bureaus.some(x =>
                          x.toLowerCase().includes(bureau.toLowerCase()))).map(post => (
                          <tr key={post.id}>
                            <td className="checkbox-pac checkbox-pos">
                              <CheckBox
                                label={post.bureaus}
                                value={checkedBureauIds.includes(post.id)}
                                onCheckBoxClick={() => handleSelectBureau(post)}
                                id={`${post.id}`}
                              />
                            </td>
                          </tr>
                        ))
                    }
                  </div>
                </tbody>
              </table>
              <button onClick={submit}>Add Bureau(s)</button>
              <button onClick={cancel}>Cancel</button>
            </form>
          </div>
        }
      </Row>
    </div>
  );
};

BureauExceptionListCard.propTypes = {
  id: PropTypes.number.isRequired,
  Name: PropTypes.string.isRequired,
  BureauExceptionOptionsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
  })),
  BureauNames: PropTypes.arrayOf(PropTypes.string),
};

BureauExceptionListCard.defaultProps = {
  id: 0,
  Name: '',
  BureauExceptionOptionsData: [],
  BureauNames: [],
};

export default BureauExceptionListCard;
