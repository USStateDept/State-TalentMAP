import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bidAuditHTFFetchModalData, bidAuditUpdateHTF } from 'actions/bidAudit';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';

const BidAuditHTFModal = ({ id, setOpen, position, onSuccessFunction }) => {
  const dispatch = useDispatch();

  const HTFData = useSelector(state => state.bidAuditHTFFetchModalData);
  const HTFDataFetchLoading = useSelector(state => state.bidAuditHTFFetchModalDataLoading);
  const HTFDataFetchError = useSelector(state => state.bidAuditHTFFetchModalDataErrored);

  useEffect(() => {
    dispatch(bidAuditHTFFetchModalData(id));
  }, [id]);

  const updateHTF = () => {
    dispatch(bidAuditUpdateHTF(HTFData, onSuccessFunction));
    setOpen(false);
  };

  const getOverlay = () => {
    let overlay;
    if (HTFDataFetchLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="small" />;
    } else if (HTFDataFetchError) {
      overlay = <Alert type="error" title="Error loading" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="modal-child bid-audit-modal-wrapper">
      { getOverlay() ||
      <div className="usa-width-one-whole">
        <div className="ba-modal-title">
          Update Position Hard to Fill
        </div>
        <div className="ba-form">
          <div className="ba-htf-help-text">
            <span>{`Change HTF Designation for Position ${position}?`}</span>
          </div>
          <div className="ba-data-form--actions">
            <button onClick={() => updateHTF()}>Yes</button>
            <button className="usa-button-secondary" onClick={() => setOpen(false)}>No</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

BidAuditHTFModal.propTypes = {
  id: PropTypes.number,
  position: PropTypes.string,
  setOpen: PropTypes.func.isRequired,
  onSuccessFunction: PropTypes.func.isRequired,
};

BidAuditHTFModal.defaultProps = {
  id: null,
  position: null,
};

export default BidAuditHTFModal;
