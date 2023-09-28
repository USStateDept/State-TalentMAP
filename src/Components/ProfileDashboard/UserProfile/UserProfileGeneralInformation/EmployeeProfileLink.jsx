import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream, isOnProxy } from 'utilities';
import Alert from '../../../Alert';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';

const EmployeeProfileLink = ({ userProfile, showEmployeeProfileLinks }) => {
  const downloadEmployeeProfile = () => {
    downloadPdfStream(userProfile.redactedReport.data);
  };

  // not showing on GOBrowser until we fix
  const displayLinks = !isOnProxy() && showEmployeeProfileLinks;
  const redactedBlob = new Blob([userProfile?.redactedReport?.data], { type: 'application/pdf' });
  const unredactedBlob = new Blob([userProfile?.unredactedReport?.data], { type: 'application/pdf' });
  const bloburl = window.URL.createObjectURL(unredactedBlob);

  const openPdf = () => swal({
    title: 'Employee Profile Report:',
    button: false,
    className: 'modal-1300',
    content: (
      <EmployeeProfileModal
        url={bloburl}
      />
    ),
  });

  return (
    <InformationDataPoint
      content={
        <div>
          {
            displayLinks && !unredactedBlob?.size && !redactedBlob?.size &&
            <Alert type="error" title="Error grabbing Profile PDF" messages={[{ body: 'Please try again.' }]} tinyAlert />
          }
          {
            displayLinks && !!unredactedBlob?.size &&
            <InteractiveElement
              onClick={openPdf}
              type="a"
              title="View Unredacted Employee Profile PDF"
            >
              Employee Profile
            </InteractiveElement>
          }
          {
            displayLinks && !!redactedBlob.size &&
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
