import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import FA from 'react-fontawesome';
import axios from 'axios';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream, fetchJWT, isOnProxy } from 'utilities';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import Alert from '../../../Alert';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';

const EmployeeProfileLink = (props) => {
  const { userProfile } = props;
  const dispatch = useDispatch();
  const emp_profile_urls = userProfile?.employee_profile_url;
  let redactedUrl = emp_profile_urls?.internalRedacted;
  let unredactedUrl = emp_profile_urls?.internal;

  if (isOnProxy()) {
    redactedUrl = emp_profile_urls?.externalRedacted;
    unredactedUrl = emp_profile_urls?.external;
  }

  const downloadEmployeeProfile = () => {
    dispatch(toastInfo('Please wait while we process your request.', 'Loading...'));
    axios.get(redactedUrl, {
      withCredentials: true,
      headers: { JWTAuthorization: fetchJWT() },
      responseType: 'arraybuffer' },
    )
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
        url={unredactedUrl}
      />
    ),
  });

  return (
    <InformationDataPoint
      content={
        <div>
          {
            !unredactedUrl && !redactedUrl &&
            <Alert type="error" title="Error grabbing Employee Profile" messages={[{ body: 'Please try again.' }]} tinyAlert />
          }
          {
            unredactedUrl &&
            <InteractiveElement
              onClick={openPdf}
              type="a"
              title="View Unredacted Employee Profile PDF"
            >
              Employee Profile
            </InteractiveElement>
          }
          {
            redactedUrl &&
            <InteractiveElement
              onClick={downloadEmployeeProfile}
              type="a"
              title="Download Redacted Employee Profile PDF"
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
};

export default EmployeeProfileLink;
