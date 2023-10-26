import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import shortid from 'shortid';
import { useDispatch } from 'react-redux';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream } from 'utilities';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import api from '../../../../api';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';

const EmployeeProfileLink = ({ userProfile, showEmployeeProfileLinks }) => {
  const dispatch = useDispatch();
  const hruId = userProfile?.user_info?.hru_id;


  const downloadEmployeeProfile = () => {
    const id = shortid.generate();
    dispatch(toastInfo('Please wait while we process your request.', 'Loading...', id));

    api().get(`/fsbid/employee/${hruId}/employee_profile_report/?redacted_report=true`,
      {
        responseType: 'arraybuffer',
      },
    ).then(response => {
      downloadPdfStream(response.data);
      dispatch(toastSuccess('Employee profile successfully downloaded.', 'Success', id, true));
    }).catch(() => {
      dispatch(toastError('We were unable to process your Employee Profile download. Please try again later.', 'An error has occurred', id, true));
    });
  };

  const openPdf = (url) => swal({
    title: 'Employee Profile Report:',
    button: false,
    className: 'modal-1300',
    content: (
      <EmployeeProfileModal
        url={url}
      />
    ),
  });

  const viewEmployeeProfile = () => {
    const id = shortid.generate();

    dispatch(toastInfo('Please wait while we process your request.', 'Loading...', id));
    api().get(`/fsbid/employee/${hruId}/employee_profile_report/?redacted_report=false`,
      {
        responseType: 'arraybuffer',
      },
    ).then(response => {
      dispatch(toastSuccess('Viewing Unredacted Profile.', 'Success', id, true));

      const unredactedBlob = new Blob([response?.data], { type: 'application/pdf' });
      const bloburl = window.URL.createObjectURL(unredactedBlob);

      openPdf(bloburl);
    }).catch(() => {
      dispatch(toastError('We were unable to process your Employee Profile download. Please try again later.', 'An error has occurred', id, true));
    });
  };

  return (
    <InformationDataPoint
      content={
        <div>
          {
            showEmployeeProfileLinks &&
            <>
              <InteractiveElement
                onClick={viewEmployeeProfile}
                type="a"
                title="View Unredacted Employee Profile PDF"
              >
                Employee Profile
              </InteractiveElement>
              <InteractiveElement
                onClick={downloadEmployeeProfile}
                type="a"
                title="Download Redacted Employee Profile PDF"
                className="ml-10"
              >
                <FA name="download" />
              </InteractiveElement>
            </>
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
