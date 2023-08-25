import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { fetchJWT, getAssetPath } from 'utilities';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const EmployeeProfileModal = props => {
  const { url } = props;

  const cancel = (e) => {
    e.preventDefault();
    try {
      swal.close();
    } catch {
      return null;
    }
    return null;
  };

  return (
    <div>
      <InteractiveElement className="modal-close-icon" onClick={cancel}><FA name="times" /></InteractiveElement>
      <div className="checklist-modal talentmap-swal-modal">
        <div>
          <Worker workerUrl={getAssetPath('/static/js/pdf.worker.js')}>
            <Viewer
              fileUrl={url}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

EmployeeProfileModal.propTypes = {
  url: PropTypes.string,
};

EmployeeProfileModal.defaultProps = {
  url: '',
};

export default EmployeeProfileModal;
