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
  console.log('userda', BureauExceptionOptionsData);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const data = BureauExceptionOptionsData;
  const [selectAll, setSelectAll] = useState(false);
  const [bureau, setBureau] = useState('');
  const [bureauCodes, setBureauCodes] = useState([]);

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
      setBureauCodes(data.map(bu => bu.bureauCode));
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
      setSelectAll(data.length === bureauCodes.length);
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
                        value={data.length === bureauCodes.length}
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
                                value={bureaus.split(', ').includes(post.description) || bureauCodes.includes(post.bureauCode)}
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
                style={{ display: !isAdd ? 'none' : '' }}
              >
                Add Bureau(s)
              </button>
              <button
                onClick={deleteBureaus}
                style={{ display: pv_id < 0 ? 'none' : '' }}
              >
                Delete Bureau(s)
              </button>
              <button
                onClick={modify}
                style={{ display: pv_id < 0 ? 'none' : '' }}
              >
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
