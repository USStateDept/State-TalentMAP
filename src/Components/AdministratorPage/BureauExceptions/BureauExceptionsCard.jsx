import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { addUserBureauExceptions, deleteUserBureauExceptions,
  resetUserBureauExceptionsAndMetaDataRedux, updateUserBureauExceptions,
  userBureauExceptionsAndMetaDataFetch } from 'actions/bureauExceptions';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import { filterObjectArrayByString } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';

const BureauExceptionsCard = ({ userData, onEditModeSearch, disableEdit,
  refBureaus, refBureausHasErrored, refBureausIsLoading }) => {
  const {
    userBureauCodes,
    pvId,
    hruId,
    name,
  } = userData;

  const dispatch = useDispatch();

  const refBureausLookUp = Object.groupBy(refBureaus, ({ code }) => code);

  const userBureauExceptionsAndMetaDataHasErrored =
    useSelector(state => state.userBureauExceptionsAndMetaDataHasErrored);
  const userBureauExceptionsAndMetaDataIsLoading =
    useSelector(state => state.userBureauExceptionsAndMetaDataIsLoading);
  const userBureauExceptionsAndMetaData =
    useSelector(state => state.userBureauExceptionsAndMetaData);

  const [selectAll, setSelectAll] = useState(false);
  const [bureauFilterText, setBureauFilterText] = useState('');
  const [filteredBureaus, setFilteredBureaus] = useState([]);
  const [userSelectedBureauCodes, setUserSelectedBureauCodes] = useState(userBureauCodes);
  const [expandCard, setExpandCard] = useState(false);

  useEffect(() => {
    onEditModeSearch(expandCard);
    if (expandCard) {
      dispatch(userBureauExceptionsAndMetaDataFetch());
    } else {
      dispatch(resetUserBureauExceptionsAndMetaDataRedux());
    }
  }, [expandCard]);

  useEffect(() => {
    setFilteredBureaus(filterObjectArrayByString(refBureaus, 'long_description', bureauFilterText));
  }, [bureauFilterText]);

  const onCancelRequest = () => {
    swal.close();
    setExpandCard(false);
    setUserSelectedBureauCodes([...userBureauCodes]);
  };

  const saveBureaus = (e) => {
    e.preventDefault();
    if ([-1, null].includes(pvId)) {
      // add if pvId does not exist
      dispatch(addUserBureauExceptions({
        hruId,
        bureauCodeList: userSelectedBureauCodes,
      }));
    } else if (userSelectedBureauCodes.length === 0) {
      // delete if pvId exists and no bureaus in current selection
      dispatch(deleteUserBureauExceptions({
        pvId,
        hruId,
        lastUpdatedUserId: userBureauExceptionsAndMetaData?.lastUpdatedUserId,
        lastUpdatedDate: userBureauExceptionsAndMetaData?.lastUpdatedDate,
      }));
    } else {
      // update if pvId exists and some bureaus exist in current selection
      dispatch(updateUserBureauExceptions({
        pvId,
        hruId,
        bureauCodeList: userSelectedBureauCodes,
        lastUpdatedUserId: userBureauExceptionsAndMetaData?.lastUpdatedUserId,
        lastUpdatedDate: userBureauExceptionsAndMetaData?.lastUpdatedDate,
      }));
    }
  };


  const cancel = (e) => {
    e.preventDefault();

    if (isEqual(userSelectedBureauCodes, userBureauCodes)) {
      setExpandCard(false);
    } else {
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
    }
  };

  const formatBureauDisplay = (bureauCode) => {
    const burObj = refBureausLookUp[bureauCode]?.[0];
    return `${burObj?.long_description} (${burObj?.short_description})`;
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setUserSelectedBureauCodes(refBureaus?.map(({ code }) => code));
    } else {
      setSelectAll(false);
      setUserSelectedBureauCodes([]);
    }
  };

  const handleSelectBureau = (selectedBureau) => {
    if (userSelectedBureauCodes.includes(selectedBureau)) {
      const newSelectedBureauCodes = userSelectedBureauCodes.filter(x => x !== selectedBureau);
      setUserSelectedBureauCodes(newSelectedBureauCodes);
    } else {
      setUserSelectedBureauCodes([...userSelectedBureauCodes, selectedBureau]);
    }
  };

  const getOverlay = () => {
    let overlay;
    if (userBureauExceptionsAndMetaDataIsLoading || refBureausIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="small" />;
    } else if (userBureauExceptionsAndMetaDataHasErrored || refBureausHasErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="bureau-exceptions-card box-shadow-standard standard-blue-border-left">
      <div>{name || 'N/A'}</div>
      <div>{userBureauCodes.length ? userBureauCodes.map(a => formatBureauDisplay(a)).join(', ') : 'No Access'}</div>
      <InteractiveElement className={`bureau-exceptions-edit ${expandCard ? 'hide' : ''}`} onClick={disableEdit ? () => {} : () => setExpandCard(true)}>
        <div className={`${disableEdit ? 'disabled-action' : ''}`}> <FA name="pencil" /> Edit </div>
      </InteractiveElement>
      {
        expandCard && (
          <form>
            <div className="bureau-exceptions-select-bureaus ml-50 mt-50">
              {
                getOverlay()
                  ||
                  <>
                    <div className="bureau-exceptions-text-input mb-20">
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
                    <div className={`bureau-exceptions-select-bureaus-header
                     bureau-exceptions-select-bureaus-checkboxes pl-20 ${bureauFilterText ? 'remove' : ''}`}
                    >
                      <CheckBox
                        onCheckBoxClick={handleSelectAll}
                        value={userSelectedBureauCodes.length === refBureaus.length}
                        id={`${name} - ${hruId}`}
                        disabled={!!bureauFilterText}
                      />
                      <div>Select All Bureaus</div>
                    </div>
                    {
                      filteredBureaus.length === 0 ?
                        <Alert type="info" title="No bureau descriptions match filter text." tinyAlert />
                        :
                        filteredBureaus.map((bur) => (
                          <div className="bureau-exceptions-select-bureaus-checkboxes pl-20" key={bur.code}>
                            <CheckBox
                              value={userSelectedBureauCodes.includes(bur.code)}
                              onCheckBoxClick={() => handleSelectBureau(bur.code)}
                              id={`${name} - ${bur.code}`}
                            />
                            <div>{formatBureauDisplay(bur.code)}</div>
                          </div>
                        ))}
                  </>
              }
            </div>
            <div>
              <button
                className={`${isEqual(userSelectedBureauCodes, userBureauCodes) ? 'disabled-bg' : ''}`}
                onClick={isEqual(userSelectedBureauCodes, userBureauCodes)
                  ? (e) => { e.preventDefault(); }
                  : (e) => saveBureaus(e)}
              >Save</button>
              <button
                className="usa-button-secondary"
                onClick={cancel}
              >Cancel</button>
            </div>
          </form>
        )}
    </div>
  );
};

BureauExceptionsCard.propTypes = {
  userData: PropTypes.shape({
    userBureauCodes: PropTypes.arrayOf(PropTypes.string),
    pvId: PropTypes.number,
    hruId: PropTypes.number,
    name: PropTypes.string,
  }),
  onEditModeSearch: PropTypes.func,
  disableEdit: PropTypes.bool,
  refBureaus: PropTypes.arrayOf(PropTypes.string),
  refBureausHasErrored: PropTypes.bool,
  refBureausIsLoading: PropTypes.bool,
};

BureauExceptionsCard.defaultProps = {
  userData: {},
  onEditModeSearch: EMPTY_FUNCTION,
  disableEdit: false,
  refBureaus: [],
  refBureausHasErrored: false,
  refBureausIsLoading: false,
};

export default BureauExceptionsCard;
