import PropTypes from 'prop-types';
import InteractiveElement from 'Components/InteractiveElement';
import TabbedCard from 'Components/TabbedCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns-v2';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { Picky } from 'react-picky';
import TMDatePicker from '../../TMDatePicker';

// eslint-disable-next-line no-unused-vars
const PanelMeetingMaintenance = ({ mode, pm, onClose }) => {
  const backButton = () => (
    <div className="button-container">
      <InteractiveElement className={'back-button'} onClick={() => onClose()}>
        <FontAwesomeIcon icon={faArrowCircleLeft} />
        Back
      </InteractiveElement>
    </div>
  );

  const pmContent = () => {
    if (pm) {
      const panelMeetingDate = pm.panelMeetingDates.find(pmd => pmd.mdt_code === 'MEET') || DEFAULT_TEXT;
      return (
        <div className="pm-content-container">
          <div className="pm-header">
            <div className="label">Meeting: </div>
            <div>{panelMeetingDate !== DEFAULT_TEXT ? format(new Date(panelMeetingDate.pmd_dttm), 'MM/dd/yyyy') : ''} ({pm.pmt_code})</div>
          </div>
          <div className="pm-buttons">
            <button className="usa-button-primary button" onClick={null}>
                Delete
            </button>
            <button className="usa-button-primary button" onClick={null}>
                Run Official Preliminary
            </button>
            <button className="usa-button-primary button" onClick={null}>
                Run Addendum
            </button>
            <button className="usa-button-primary button" onClick={null}>
                Post Panel Processing
            </button>
          </div>
          <div className="pm-info">
            <div className="pm-info-row">
              <div>
                <label className="label" htmlFor="meeting-type">
                  Meeting Type
                </label>
                <Picky
                  id="meeting-type"
                  placeholder="Select Meeting Type"
                  value={pm.pmt_desc_text}
                  options={[{ pmt_code: 'A', pmt_desc_text: 'TEST A' }]} // @TODO: Add options for meeting types
                  onChange={null} // @TODO: Add onChange handler
                  valueKey="pmt_code"
                  labelKey="pmt_desc_text"
                />
              </div>
              <div>
                <label className="label" htmlFor="meeting-status">
                  Meeting Status
                </label>
                <Picky
                  id="meeting-status"
                  placeholder="Select Meeting Status"
                  value={pm.pms_desc_text}
                  options={[]} // @TODO: Add options for meeting statuses
                  onChange={null} // @TODO: Add onChange handler
                  valueKey="pms_code"
                  labelKey="pms_desc_text"
                />
              </div>
              <div>
                <label className="label" htmlFor="panel-meeting-date">
                  Panel Meeting Date
                </label>
                <div className="date-picker-wrapper">
                  <FontAwesomeIcon icon={faCalendar} />
                  <TMDatePicker
                    id="panel-meeting-date"
                    value={[new Date(panelMeetingDate.pmd_dttm), null]}
                    onChange={null} // @TODO: Add onChange handler
                    type="form"
                    selected={new Date(panelMeetingDate.pmd_dttm)}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Select Date"
                    isClearable
                  />
                </div>
              </div>
            </div>
            <div className="pm-info-row">
              <div>
                <label className="label" htmlFor="preliminary-cutoff">
                  Official Preliminary Cutoff
                </label>
                <div className="date-picker-wrapper">
                  <FontAwesomeIcon icon={faCalendar} />
                  <TMDatePicker
                    id="preliminary-cutoff"
                    value={[new Date(panelMeetingDate.pmd_dttm), null]}
                    onChange={null} // @TODO: Add onChange handler
                    type="form"
                    selected={null}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Select Date"
                    isClearable
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="addendum-cutoff">
                  Official Addendum Cutoff
                </label>
                <div className="date-picker-wrapper">
                  <FontAwesomeIcon icon={faCalendar} />
                  <TMDatePicker
                    id="addendum-cutoff"
                    value={[new Date(panelMeetingDate.pmd_dttm), null]}
                    onChange={null} // @TODO: Add onChange handler
                    type="form"
                    selected={null}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Select Date"
                    isClearable
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="preliminary-runtime">
                  Official Preliminary Runtime
                </label>
                <div className="date-picker-wrapper">
                  <FontAwesomeIcon icon={faCalendar} />
                  <TMDatePicker
                    id="preliminary-runtime"
                    value={[new Date(panelMeetingDate.pmd_dttm), null]}
                    onChange={null} // @TODO: Add onChange handler
                    type="form"
                    selected={null}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Select Date"
                    isClearable
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="addendum-runtime">
                  Official Addendum Runtime
                </label>
                <div className="date-picker-wrapper">
                  <FontAwesomeIcon icon={faCalendar} />
                  <TMDatePicker
                    id="addendum-runtime"
                    value={[new Date(panelMeetingDate.pmd_dttm), null]}
                    onChange={null} // @TODO: Add onChange handler
                    type="form"
                    selected={null}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="Select Date"
                    isClearable
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <>
        Error loading panel meeting data, refresh page.
        </>
      </div>
    );
  };

  return (
    <div className="pm-maintenance-page">
      <TabbedCard
        tabs={[
          {
            text: 'Panel Meeting Maintenance',
            value: 'PANEL_MEETING_MAINTENANCE',
            content: pmContent(),
          },
        ]}
        customComponent={backButton()}
      />
    </div>
  );
};

PanelMeetingMaintenance.propTypes = {
  mode: PropTypes.string.isRequired,
  pm: PropTypes.PANEL_MEETING,
  onClose: PropTypes.func.isRequired,
};

PanelMeetingMaintenance.defaultProps = {
  pm: {},
};

export default PanelMeetingMaintenance;
