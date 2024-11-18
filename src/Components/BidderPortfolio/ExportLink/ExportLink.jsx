import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import { EXPORT_DATA_ERROR, EXPORT_DATA_ERROR_TITLE, EXPORT_DATA_LOADING, EXPORT_DATA_LOADING_TITLE, EXPORT_DATA_SUCCESS, EXPORT_DATA_SUCCESS_TITLE } from 'Constants/SystemMessages';
import { downloadClientData } from 'actions/bidderPortfolio';
import ExportButton from 'Components/ExportButton';

const ExportLink = ({ bidderPortfolioLastQuery, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    if (!isLoading) {
      // reset the state to support multiple clicks
      setIsLoading(true);
      dispatch(toastInfo(EXPORT_DATA_LOADING, EXPORT_DATA_LOADING_TITLE));
      downloadClientData(bidderPortfolioLastQuery)
        .then(() => {
          setIsLoading(false);
          dispatch(toastSuccess(EXPORT_DATA_SUCCESS, EXPORT_DATA_SUCCESS_TITLE));
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(toastError(EXPORT_DATA_ERROR, EXPORT_DATA_ERROR_TITLE));
        });
    }
  };

  return (
    <div className="export-button-container">
      <ExportButton text={'Export - Max. 500'} onClick={onClick} isLoading={isLoading} disabled={disabled} />
    </div>
  );
};

ExportLink.propTypes = {
  bidderPortfolioLastQuery: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

ExportLink.defaultProps = {
  bidderPortfolioLastQuery: {},
  disabled: false,
};

const mapStateToProps = state => ({
  bidderPortfolioLastQuery: state.bidderPortfolioLastQuery,
});

export default connect(mapStateToProps)(ExportLink);
