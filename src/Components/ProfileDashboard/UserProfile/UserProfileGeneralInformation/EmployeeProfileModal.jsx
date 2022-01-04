import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { fetchJWT, getAssetPath } from 'utilities';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

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

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="checklist-modal">
      <div>
        <Worker workerUrl={getAssetPath('/static/js/pdf.worker.js')}>
          {/* <Viewer fileUrl={this.state.data} />; */}
          <Viewer
            fileUrl={url}
            httpHeaders={{ JWTAuthorization: fetchJWT() }}
            withCredentials
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
        <div className="checklist-modal-buttons-container">
          <button type="button" onClick={cancel}>Close</button>
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
