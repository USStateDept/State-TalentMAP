/* eslint-disable */
import swal from '@sweetalert/with-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { downloadPdfStream } from 'utilities';
// eslint-disable-next-line no-unused-vars
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import { useDataLoader } from 'hooks';
import Alert from '../../../Alert';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';
import api from '../../../../api';

const EmployeeProfileLink = ({ userProfile, showEmployeeProfileLinks }) => {

  const downloadEmployeeProfile = () => {
    downloadPdfStream(userProfile.redactedReport.data);
  };

  /* eslint-disable no-console */
  console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳');
  console.log('🥳 current: userProfile.redactedReport:', userProfile.redactedReport);
  console.log('🥳 current: userProfile.unredactedReport:', userProfile.unredactedReport);
  console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳');


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
            showEmployeeProfileLinks && !unredactedBlob?.size && !redactedBlob?.size &&
            <Alert type="error" title="Error grabbing Employee Profile" messages={[{ body: 'Please try again.' }]} tinyAlert />
          }
          {
            showEmployeeProfileLinks && !!unredactedBlob?.size &&
            <InteractiveElement
              onClick={openPdf}
              type="a"
              title="View Unredacted Employee Profile PDF"
            >
              Employee Profile
            </InteractiveElement>
          }
          {
            showEmployeeProfileLinks && !!redactedBlob.size &&
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
