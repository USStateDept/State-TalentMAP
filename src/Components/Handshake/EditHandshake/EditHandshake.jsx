/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';

const EditHandshake = props => {
  const { submitAction, personID, positionID } = props;
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      expirationDate,
      perdet: personID,
      cp_id: positionID,
    };
    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  return (
    <div>
      <form className="available-bidder-form">
        <div>
          <label htmlFor="status">*Status:</label>
          <select
            id="status"
            defaultValue={status}
            onChange={(e) => {
              setStatus(e.target.value);
              if (e.target.value !== 'OC') {
                setOCReason('');
                setOCBureau('');
                if (e.target.value !== 'UA') {
                  setShared(false);
                }
              }
            }}
          >
            <option value="">None listed</option>
            <option value="OC">OC: Overcomplement</option>
            <option value="UA">UA: Unassigned</option>
            <option value="IT">IT: In Transit</option>
            <option value="AWOL">AWOL: Absent without leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="ocReason">*OC Reason:</label>
          <select id="ocReason" defaultValue={ocReason} onChange={(e) => setOCReason(e.target.value)} disabled={status !== 'OC'} >
            <option value="">None listed</option>
            {
              (status === 'OC') &&
              reasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="ocBureau">*OC Bureau:</label>
          <select id="ocBureau" defaultValue={ocBureau} onChange={(e) => setOCBureau(e.target.value)} disabled={status !== 'OC'} >
            <option value="">None listed</option>
            {
              (status === 'OC') &&
                bureauOptions.map(o => (
                  <option key={o.id} value={o.short_description}>{o.custom_description}</option>
                ))
            }
          </select>
        </div>
        
       
        
        <button onClick={submit} type="submit">Submit</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditHandshake.propTypes = {
  sections: PropTypes.shape({}),
  // Build out sections after connection with real data
  name: PropTypes.string,
  submitAction: PropTypes.func,
  bureaus: FILTER,
  details: PropTypes.shape({}),
};

EditHandshake.defaultProps = {
  sections: {},
  name: '',
  submitAction: EMPTY_FUNCTION,
  bureaus: [],
  details: {},
};

export default EditHandshake;
