import { useState } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addBureauExceptionSelections, deleteBureauExceptionList, saveBureauExceptionSelections } from 'actions/bureauException';
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
      bureauCode: bureauCodes.join(),
      id,
    };
    dispatch(addBureauExceptionSelections(currentUser));
  };

  const deleteBureaus = (e) => {
    e.preventDefault();
    const currentUser = {
      id,
      pv_id,
    };
    dispatch(deleteBureauExceptionList(currentUser));
  };

  const modify = (e) => {
    e.preventDefault();
    const currentUser = {
      bureauCode: bureauCodes.join(),
      id,
      pv_id,
    };
    dispatch(saveBureauExceptionSelections(currentUser));
  };

  const editBureau = () => {
    const currentUser = {
      id,
      pv_id,
    };
    console.log(currentUser);
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
        data.map(bu => bu.bureauCode),
      );
      setBureauCodes(data.map(bu => bu.bureauCode));
    } else {
      setSelectAll(false);
      setCheckedBureauIds([]);
      setBureauCodes([]);
    }
  };

  const handleSelectBureau = (selectedBureau => {
    if (checkedBureauIds.includes(selectedBureau?.bureauCode)) {
      const filteredBureau = checkedBureauIds.filter(x => x !== selectedBureau?.bureauCode);
      setCheckedBureauIds(filteredBureau);
      setBureauCodes(bureauCodes.filter(x => x !== selectedBureau?.bureauCode));
      setBureauList(bureauList.filter(x => x !== selectedBureau?.description));
    } else {
      setCheckedBureauIds([...checkedBureauIds, selectedBureau?.bureauCode]);
      setBureauCodes([...bureauCodes, selectedBureau?.bureauCode]);
      setBureauList([...bureauList, selectedBureau?.description]);
    }
  });

  const isAdd = pv_id === -1 || pv_id === null || pv_id === '-';
  const isBureauAccess = bureaus !== null && bureaus !== undefined && bureaus !== ' ';

  return (
    <div className="position-form">
      <Row fluid className="bureau-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column>Person: {name || 'N/A'}</Column>
          <Column>Bureau Access: {isBureauAccess ? bureaus : 'No Access'}</Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
                editBureau();
                collapseCard();
              }}
              to="#"
            >
              {!edit ? (
                <div>
                  <FA className="fa-solid fa-pencil" />
                  Edit
                </div>
              ) : (
                <span>Close</span>
              )}
            </Link>
          </Column>
        </Row>
        {edit && (
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
                    {data?.length &&
                      data
                        .filter((x) =>
                          x.description
                            .toLowerCase()
                            .includes(bureau.toLowerCase()),
                        )
                        .map((post) => (
                          <tr key={post.bureauCode}>
                            <td className="checkbox-pac checkbox-pos">
                              <CheckBox
                                label={post.description}
                                value={bureaus.split(', ').includes(post.description)}
                                onCheckBoxClick={() => handleSelectBureau(post)}
                                id={`${post.bureauCode}`}
                              />
                            </td>
                          </tr>
                        ))}
                  </div>
                </tbody>
              </table>
              <button
                onClick={addBureaus}
                disabled={!isAdd}
              >
                Add Bureau(s)
              </button>
              <button onClick={deleteBureaus} disabled={pv_id < 0}>
                Delete Bureau(s)
              </button>
              <button onClick={modify} disabled={pv_id < 0}>
                Modify Bureau(s)
              </button>
              <button onClick={cancel}>Cancel</button>
            </form>
          </div>
        )}
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
