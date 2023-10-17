import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addBureauExceptionSelections, bureauExceptionBureauDataFetchData, deleteBureauExceptionList, saveBureauExceptionSelections } from 'actions/bureauException';
import { Column, Row } from 'Components/Layout';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';

const BureauExceptionListCard = (props) => {
  const {
    BureauExceptionOptionsData,
    userData,
  } = props;

  const {
    bureaus,
    id,
    name,
    pv_id,
    seqNum,
  } = userData;
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = BureauExceptionOptionsData;
  const [selectAll, setSelectAll] = useState(false);
  const [checkedBureauIds, setCheckedBureauIds] = useState([]);
  const [bureau, setBureau] = useState('');
  const [bureauList, setBureauList] = useState([]);
  const [bureauCodes, setBureauCodes] = useState([]);

  const fetchAndSet = () => {
    dispatch(bureauExceptionBureauDataFetchData());
  };

  useEffect(() => {
    fetchAndSet();
  }, []);

  const collapseCard = () => {
    setShowMore(!showMore);
    setEdit(e => !e);
  };

  const onCancelRequest = () => {
    swal.close();
    setEdit(false);
    setCheckedBureauIds([]);
    setBureau('');
    setBureauCodes([]);
  };

  const addBureaus = (e) => {
    e.preventDefault();
    const currentUser = {
      bureauCode: bureauCodes,
      name,
      id,
    };
    dispatch(addBureauExceptionSelections(currentUser));
  };

  const deleteBureaus = (e) => {
    e.preventDefault();
    const currentUser = {
      bureauCode: bureauCodes,
      bureaus,
      id,
      name,
      pv_id,
      seqNum,
    };
    dispatch(deleteBureauExceptionList(currentUser));
  };

  const modify = (e) => {
    e.preventDefault();
    const currentUser = {
      bureauCode: bureauCodes.join(),
      bureaus: bureauList.join(),
      id,
      name,
      pv_id,
      seqNum,
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
      setBureauCodes(data.map(bu => bu.bureaus[0]));
    } else {
      setSelectAll(false);
      setCheckedBureauIds([]);
    }
  };

  const handleSelectBureau = (selectedBureau => {
    if (checkedBureauIds.includes(selectedBureau?.code)) {
      const filteredBureau = checkedBureauIds.filter(x => x !== selectedBureau?.code);
      setCheckedBureauIds(filteredBureau);
      setBureauCodes(bureauCodes.filter(x => x !== selectedBureau?.code));
      setBureauList(bureauList.filter(x => x !== selectedBureau?.description));
    } else {
      setCheckedBureauIds([...checkedBureauIds, selectedBureau?.code]);
      setBureauCodes([...bureauCodes, selectedBureau?.code]);
      setBureauList([...bureauList, selectedBureau?.description]);
    }
  });

  return (
    <div className="position-form">
      <Row fluid className="bureau-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column>
            Person: {name || 'N/A'}
          </Column>
          <Column>
            Bureau Access: {bureaus || 'No Access'}
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
                        label={`F/S Employee Name: ${name}`}
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
                        data.filter(x => x.description.toLowerCase()
                          .includes(bureau.toLowerCase())).map(post => (
                          <tr key={post.bureauCode}>
                            <td className="checkbox-pac checkbox-pos">
                              <CheckBox
                                label={post.description}
                                value={checkedBureauIds.includes(post.bureauCode)}
                                onCheckBoxClick={() => handleSelectBureau(post)}
                                id={`${post.bureauCode}`}
                              />
                            </td>
                          </tr>
                        ))
                    }
                  </div>
                </tbody>
              </table>
              <button onClick={addBureaus}>Add Bureau(s)</button>
              <button onClick={deleteBureaus}>Delete Bureau(s)</button>
              <button onClick={modify}>Modify Bureau(s)</button>
              <button onClick={cancel}>Cancel</button>
            </form>
          </div>
        }
      </Row>
    </div>
  );
};

BureauExceptionListCard.propTypes = {
  userData: PropTypes.shape({
    bureauCode: PropTypes.string,
    bureaus: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    pv_id: PropTypes.number,
    seqNum: PropTypes.number,
  }),
  BureauExceptionOptionsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
  })),
};

BureauExceptionListCard.defaultProps = {
  userData: {},
  BureauExceptionOptionsData: [],
};

export default BureauExceptionListCard;
