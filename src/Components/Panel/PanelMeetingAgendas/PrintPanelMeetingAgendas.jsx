import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';

const PrintPanelMeetingAgendas = ({
  panelMeetingData,
  closeModal,
}) => {
  const cancel = (e) => {
    e.preventDefault();
    closeModal();
    swal.close();
  };


  return (
    <div className="pma-print-view">
      <InteractiveElement className="modal-close-icon" onClick={cancel}><FA name="times" /></InteractiveElement>
      <div className="tracker-container">
        <PanelMeetingTracker panelMeeting={panelMeetingData?.results?.[0]} printableTracker />
      </div>
    </div>
  );
};

PrintPanelMeetingAgendas.propTypes = {
  panelMeetingData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PrintPanelMeetingAgendas;
