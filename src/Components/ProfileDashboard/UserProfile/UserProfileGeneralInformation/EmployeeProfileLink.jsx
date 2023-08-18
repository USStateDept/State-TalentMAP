import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import axios from 'axios';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream } from 'utilities';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import { useDataLoader } from 'hooks';
import Alert from '../../../Alert';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';
import api from '../../../../api';

const EmployeeProfileLink = ({ userProfile, showEmployeeProfileLinks }) => {
  const dispatch = useDispatch();
  const { data: reportData, error: reportError, loading: reportLoading } = useDataLoader(api().get, `/fsbid/employee/${userProfile?.user_info?.hru_id}/employee_profile_report/`);

  const downloadEmployeeProfile = () => {
    dispatch(toastInfo('Please wait while we process your request.', 'Loading...'));
    /* eslint-disable no-console */
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');
    console.log('🦄 current: reportData:', reportData);
    console.log('🦄 current: reportError:', reportError);
    console.log('🦄 current: reportLoading:', reportLoading);
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');

    axios.get(reportData)
      .then(response => {
        downloadPdfStream(response.data);
        dispatch(toastSuccess('Employee profile successfully downloaded.', 'Success'));
      })
      .catch(() => {
        dispatch(toastError('We were unable to process your Employee Profile download. Please try again later.', 'An error has occurred'));
      });
  };

  const openPdf = () => swal({
    title: 'Employee Profile Report:',
    button: false,
    className: 'modal-1300',
    content: (
      <EmployeeProfileModal
        url={'unredactedUrl'}
      />
    ),
  });

  return (
    <InformationDataPoint
      content={
        <div>
          {
            showEmployeeProfileLinks &&
            <Alert type="error" title="Error grabbing Employee Profile" messages={[{ body: 'Please try again.' }]} tinyAlert />
          }
          {
            showEmployeeProfileLinks &&
            <InteractiveElement
              onClick={openPdf}
              type="a"
              title="View Unredacted Employee Profile PDF"
            >
              Employee Profile
            </InteractiveElement>
          }
          {
            showEmployeeProfileLinks &&
            <InteractiveElement
              onClick={downloadEmployeeProfile}
              type="a"
              title="Download Redacted Employee Profile PDF"
              className="ml-10"
            >
              <FA name="download" />
            </InteractiveElement>
          }
        </div>
      }
    />
  );
};

EmployeeProfileLink.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEmployeeProfileLinks: PropTypes.bool.isRequired,
};

EmployeeProfileLink.defaultProps = {
};

export default EmployeeProfileLink;
