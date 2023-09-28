import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Picky from 'react-picky';
import { getGenericFilterOptions, renderSelectionList } from 'utilities';
import { useDataLoader } from 'hooks';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import api from '../../../api';

const BidAuditModal = ({ data }) => {
  const genericData$ = data?.filters || [];
  const assignmentCycleOptions = getGenericFilterOptions(genericData$, 'bidCycle', 'name');
  const { data: orgs } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const auditDescriptionOptions = orgs?.data;

  const [assignmentCycles, setAssignmentCycles] = useState('');
  const [auditNumber, setAuditNumber] = useState('');
  const [auditDescription, setAuditDescription] = useState('');
  const [postByDate, setPostByDate] = useState('');

  const datePickerRef = useRef(null);

  const cancel = () => swal.close();
  const submit = () => swal.close();

  const pickyProps = {
    numberDisplayed: 1,
    multiple: false,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: false,
  };

  return (
    <div className="pt-20 bid-audit-modal-wrapper">
      <div className="usa-width-one-whole position-search--filters--ba results-dropdown">

        <div className="bid-audit-modal-input">
          <div className="label">Assignment Cycle:</div>
          <Picky
            {...pickyProps}
            placeholder="Select Assignment Cycle(s)"
            value={assignmentCycles}
            options={assignmentCycleOptions}
            onChange={setAssignmentCycles}
            valueKey="id"
            labelKey="name"
          />
        </div>
        <div className="bid-audit-modal-input">
          <div className="label">Audit Number:</div>
          <Picky
            {...pickyProps}
            placeholder="Enter Audit Number"
            value={auditNumber}
            options={auditDescriptionOptions}
            onChange={setAuditNumber}
            valueKey="code"
            labelKey="name"
          />
        </div>
        <div className="bid-audit-modal-input">
          <div className="label">Posted By Date:</div>
          <span className="date-picker-validation-container larger-date-picker">
            <DatePicker
              selected={postByDate}
              onChange={(date) => setPostByDate(date)}
              dateFormat="MM/dd/yyyy"
              ref={datePickerRef}
            />
          </span>
        </div>
        <div className="bid-audit-modal-input">
          <div className="label">Audit Description:</div>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="255"
            name="description"
            defaultValue={auditDescription}
            onChange={(e) => setAuditDescription(e.target.value)}
          />
        </div>

        <div className="bid-audit-modal-buttons">
          <button onClick={submit} type="submit">Submit</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

BidAuditModal.propTypes = {
  data: PropTypes.shape({
    filters: PropTypes.shape({}),
  }).isRequired,
};

export default BidAuditModal;
