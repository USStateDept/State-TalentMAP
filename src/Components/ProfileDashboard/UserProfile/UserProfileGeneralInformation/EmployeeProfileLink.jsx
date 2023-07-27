import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import FA from 'react-fontawesome';
import axios from 'axios';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream, fetchJWT, isOnProxy } from 'utilities';
import shortid from 'shortid';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';

const EmployeeProfileLink = (props) => {
  const { userProfile } = props;
  const dispatch = useDispatch();
  let emp_profile_urls = userProfile?.employee_profile_url;
  let url$ = emp_profile_urls?.internal || emp_profile_urls?.internalRedacted;

  if (isOnProxy()) {
    url$ = emp_profile_urls?.external || emp_profile_urls?.externalRedacted;
  }

  const getEmployeeProfile = (redactedVersion) => {
    const id = shortid.generate();
    emp_profile_urls = userProfile?.employee_profile_url;

    url$ = (redactedVersion ? emp_profile_urls?.internalRedacted
      : emp_profile_urls?.internal) || emp_profile_urls?.internalRedacted;
    if (isOnProxy()) {
      url$ = (redactedVersion ? emp_profile_urls?.externalRedacted
        : emp_profile_urls?.external) || emp_profile_urls?.externalRedacted;
    }
    dispatch(toastInfo('Please wait while we process your request.', 'Loading...', id));
    axios.get(url$, {
      withCredentials: true,
      headers: { JWTAuthorization: fetchJWT() },
      responseType: 'arraybuffer' },
    )
      .then(response => {
        downloadPdfStream(response.data);
        dispatch(toastSuccess('Employee profile succesfully downloaded.', 'Success', id, true));
      })
      .catch(() => {
        dispatch(toastError('We were unable to process your Employee Profile download. Please try again later.', 'An error has occurred', id, true));
      });
  };

  const openPdf = () => swal({
    title: 'Employee Profile Report:',
    button: false,
    className: 'modal-1300',
    content: (
      <EmployeeProfileModal
        url={url$}
      />
    ),
  });

  return (
    <InformationDataPoint
      content={
        <div>
          <InteractiveElement
            onClick={openPdf}
            type="a"
            title="View Unredacted Employee Profile PDF"
          >
            Employee Profile
          </InteractiveElement>
          <InteractiveElement
            onClick={() => getEmployeeProfile(true)}
            type="a"
            title="Download Redacted Employee Profile PDF"
          >
            <FA name="download" />
          </InteractiveElement>
        </div>
      }
    />
  );
};

EmployeeProfileLink.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

export default EmployeeProfileLink;
