import { useEffect, useState } from 'react';
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
    bureauCodeList,
    id,
    name,
    pv_id,
  } = userData;
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [bureau, setBureau] = useState('');
  const [bureauCodes, setBureauCodes] = useState([]);
  const gatherInitialBureauCodes = () => {
    if (bureauCodeList !== null && bureauCodeList !== undefined && bureauCodeList !== ' ') {
      const newBureauCodes = bureauCodeList.map(bu => bu);
      setBureauCodes(newBureauCodes);
    }
  };

  useEffect(() => {
    // for initial list check
    gatherInitialBureauCodes();
  }, []);

  useEffect(() => {
    if (BureauExceptionOptionsData.length === bureauCodes.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [bureauCodes.length]);

  const collapseCard = () => {
    setShowMore(!showMore);
    setEdit(e => !e);
  };

  const onCancelRequest = () => {
    swal.close();
    setEdit(false);
    setBureau('');
    setBureauCodes([]);
    setSelectAll(false);
    gatherInitialBureauCodes();
  };

  const addBureaus = () => {
    const currentUser = {
      bureauCode: bureauCodes,
      id,
    };
    dispatch(addBureauExceptionSelections(currentUser));
  };

  const deleteBureaus = () => {
    const currentUser = {
      id,
      pv_id,
    };
    dispatch(deleteBureauExceptionList(currentUser));
  };

  const modify = () => {
    const currentUser = {
      bureauCode: bureauCodes,
      id,
      pv_id,
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
      setBureauCodes(BureauExceptionOptionsData.map(bu => bu.bureauCode));
    } else {
      setSelectAll(false);
      setBureauCodes([]);
    }
  };

  const handleSelectBureau = (selectedBureau => {
    if (bureauCodes.includes(selectedBureau?.bureauCode)) {
      const filteredBureauCodes = bureauCodes.filter(x => x !== selectedBureau?.bureauCode);
      setBureauCodes(filteredBureauCodes);
      setSelectAll(false);
    } else {
      setBureauCodes([...bureauCodes, selectedBureau?.bureauCode]);
      setSelectAll(BureauExceptionOptionsData.length === bureauCodes.length);
    }
  });

  const isBureauAccess = bureaus !== null && bureaus !== undefined && !bureaus.includes(' ') && bureaus.length !== 0;
  const isAdd = pv_id === -1 || pv_id === null || pv_id === '-';

  const saveBureaus = (e) => {
    e.preventDefault();
    if (isAdd) {
      addBureaus();
    } else if (bureauCodes.length === 0) {
      deleteBureaus();
    } else {
      modify();
    }
  };

  return (
    <div className="position-form">
      <Row fluid className="bureau-card box-shadow-standard">
        <Row fluid className="bs-card--row">
          <Column>Person: {name || 'N/A'}</Column>
          <Column>Bureau Access: {isBureauAccess ? bureaus.join(', ') : 'No Access'}</Column>
          <Column columns={3} className="bs-card--link-col">
            <Link
              onClick={(e) => {
                e.preventDefault();
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
                        onCheckBoxClick={handleSelectAll}
                        value={selectAll}
                        id={`${name} - ${id}`}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className="bureau-exception-text-table">
                    {BureauExceptionOptionsData?.length &&
                      BureauExceptionOptionsData
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
                                value={bureauCodes.includes(post.bureauCode)}
                                onCheckBoxClick={() => handleSelectBureau(post)}
                                id={`${name} - ${post.bureauCode}`}
                              />
                            </td>
                          </tr>
                        ))}
                  </div>
                </tbody>
              </table>
              <button
                onClick={saveBureaus}
              >
                Save
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
    bureauCodeList: PropTypes.arrayOf(PropTypes.string),
    bureaus: PropTypes.arrayOf(PropTypes.string),
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
