import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserBureauExceptions, deleteUserBureauExceptions, updateUserBureauExceptions, userBureauExceptionsAndMetaDataFetch } from 'actions/bureauExceptions';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';

const BureauExceptionsCard = ({ userData, bureaus, bureausHasErrored, bureausIsLoading }) => {

  const {
    userBureauCodeList,
    // eslint-disable-next-line no-unused-vars
    hruId,
    name,
  } = userData;

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const userBureauExceptionsAndMetaDataHasErrored =
    useSelector(state => state.userBureauExceptionsAndMetaDataHasErrored);
  const userBureauExceptionsAndMetaDataIsLoading =
    useSelector(state => state.userBureauExceptionsAndMetaDataIsLoading);
  const userBureauExceptionsAndMetaData =
    useSelector(state => state.userBureauExceptionsAndMetaData);

  const [selectAll, setSelectAll] = useState(false);


  const [bureauFilterText, setBureauFilterText] = useState('');
  const [bureauCodes, setBureauCodes] = useState([]);
  const isBureauAccess = userBureauCodeList !== null && userBureauCodeList !== undefined && userBureauCodeList !== ' ' && userBureauCodeList !== '' && userBureauCodeList.length !== 0;
  const isAdd = userBureauExceptionsAndMetaData?.pvId === -1 || userBureauExceptionsAndMetaData?.pvId === null || userBureauExceptionsAndMetaData?.pvId === '-';

  const CloseCards = useSelector(state => state.closeAllCards);
  const [isEditable, setIsEditable] = useState(CloseCards === id);
  const currentUserInfo = BureauExceptionOptionsData?.data;
  const currentUserBureauCodeList = BureauExceptionOptionsData?.data?.bureauRefList;
  const showBtn = BureauCardError || BureauExceptionListLoading;

  const gatherInitialBureauCodes = () => {
    if (isBureauAccess) {
      const newBureauCodes = bureauCodeList && bureauCodeList.split(',').map(bu => bu);
      setBureauCodes(newBureauCodes);
    } else {
      setBureauCodes([]);
    }
  };

  useEffect(() => {
    // for initial list check
    setIsEditable(CloseCards === id);
    gatherInitialBureauCodes();
  }, [CloseCards]);

  useEffect(() => {
    if (currentUserBureauCodeList?.length === bureauCodes.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [bureauCodes.length]);

  const collapseCard = () => {
    setIsEditable(!isEditable);
    gatherInitialBureauCodes();
    dispatch(userBureauExceptionsAndMetaDataFetch());
  };

  const onCancelRequest = () => {
    swal.close();
    setBureauFilterText('');
    setIsEditable(false);
    setBureauCodes([]);
    setSelectAll(false);
    gatherInitialBureauCodes();
  };

  const addBureaus = () => {
    const currentUser = {
      bureauCodeList: bureauCodes.join(', '),
      id,
      pvId,
      lastUpdatedUserID: currentUserInfo?.lastUpdatedUserID,
      lastUpdated: currentUserInfo?.lastUpdated,
    };
    dispatch(addUserBureauExceptions(currentUser));
  };

  const deleteBureaus = () => {
    const currentUser = {
      id,
      pvId,
      lastUpdatedUserID: currentUserInfo?.lastUpdatedUserID,
      lastUpdated: currentUserInfo?.lastUpdated,
    };
    dispatch(deleteUserBureauExceptions(currentUser));
  };

  const modify = () => {
    const currentUser = {
      bureauCodeList: bureauCodes.join(', '),
      id,
      pvId,
      lastUpdatedUserID: currentUserInfo?.lastUpdatedUserID,
      lastUpdated: currentUserInfo?.lastUpdated,
    };
    dispatch(updateUserBureauExceptions(currentUser));
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
      setBureauCodes(currentUserBureauCodeList?.map(bu => bu.bureauCode));
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
      setSelectAll(currentUserBureauCodeList?.length === bureauCodes.length);
    }
  });


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

  const getOverlay = () => {
    let overlay;
    if (userBureauExceptionsAndMetaDataIsLoading || bureausIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="small" />;
    } else if (BureauCardError || bureausHasErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="bureau-card box-shadow-standard standard-blue-border-left">
      <div>{name || 'N/A'}</div>
      <div>{isBureauAccess ? bureaus : 'No Access'}</div>
      <div>
        <Link
          onClick={(e) => {
            e.preventDefault();
            collapseCard();
          }}
          to="#"
        >
          {!isEditable ? (
            <div>
              <FA className="fa-solid fa-pencil" />
              Edit
            </div>
          ) : (
            <span>Close</span>
          )}
        </Link></div>
      {isEditable && (
        <div>
          <form>
            <table className="bureau-exception-table">
              {
                getOverlay()
                  ||
                  <div>
                    <thead>
                      <tr>
                        <div className="bureau-exception-text-input">
                          <TextInput
                            changeText={(e) => setBureauFilterText(e)}
                            placeholder="Filter by Bureau"
                            value={bureauFilterText}
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
                        {currentUserBureauCodeList?.length &&
                        currentUserBureauCodeList
                          .filter((x) =>
                            x.description
                              .toLowerCase()
                              .includes(bureauFilterText.toLowerCase()),
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
                  </div>
              }
            </table>
            <div style={{ visibility: showBtn && 'hidden' }}>
              <button
                onClick={saveBureaus}
              >
                  Save
              </button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

BureauExceptionsCard.propTypes = {
  userData: PropTypes.shape({
    userBureauCodeList: PropTypes.arrayOf(PropTypes.string),
    hruId: PropTypes.number,
    name: PropTypes.string,
  }),
  bureaus: PropTypes.arrayOf(PropTypes.string),
  bureausHasErrored: PropTypes.bool,
  bureausIsLoading: PropTypes.bool,
};

BureauExceptionsCard.defaultProps = {
  userData: {},
};

export default BureauExceptionsCard;
