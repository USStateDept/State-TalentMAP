/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import { uniqBy, forEach } from 'lodash';
import swal from '@sweetalert/with-react';

const EditBidder = (props) => {
  const { name, sections, submitAction, bureaus, details } = props;
  const [status, setStatus] = useState(details.status);
  const [comment, setComment] = useState(sections.comments);
  const [ocReason, setOCReason] = useState(details.ocReason);
  const [ocBureau, setOCBureau] = useState(details.ocBureau);
  const [shared, setShared] = useState(details.shared);
  const { languages } = details;

  const bureauOptions = uniqBy(bureaus.data, 'code');

  // To Do: Move these to the DB/Django backend after more user feedback
  const reasons = [
    'Appealing/Grieving Selection Out',
    'CAT-4 (MED)',
    'CAT-4 (SEC)',
    'Compassionate Curtailment',
    'DS Investigation',
    'Involuntary Curtailment',
    'No-Fault Curtailment AIP',
    'Other - see additional comments',
    'Previous Assignment Ended',
    'Unresolved Medical',
  ];

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      oc_bureau: ocBureau,
      oc_reason: ocReason,
      status,
      comments: comment,
      is_shared: shared,
    };

    // Remap unmodified local defaults from None Listed to empty string for patch
    forEach(userInputs, (v, k) => {
      if (v === 'None listed') userInputs[k] = '';
    });

    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  return (
    <div>
      <form className="available-bidder-form">
        <div className="detail">
          <span>* Internal CDO field only, not shared with Bureaus</span>
        </div>
        <div>
          <dt>Client Name:</dt>
          <dd>{name}</dd>
        </div>
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
        <div>
          <dt>Skill:</dt>
          <dd>{sections.skill}</dd>
        </div>
        <div>
          <dt>Grade:</dt>
          <dd>{sections.grade}</dd>
        </div>
        <div>
          <dt>Languages:</dt>
          <dd>{languages.map((l, i) => (
            ` ${l.custom_description}${i + 1 === languages.length ? '' : ','}`
          ))}</dd>
        </div>
        <div>
          <dt>TED:</dt>
          <dd>{sections.ted}</dd>
        </div>
        <div>
          <dt>Current Post:</dt>
          <dd>{sections.current_post}</dd>
        </div>
        <div>
          <dt>CDO:</dt>
          <dd>{sections.cdo}</dd>
        </div>
        <div>
          <label htmlFor="comment">*Comment:</label>
          <input
            type="text"
            name="comment"
            placeholder="None listed"
            defaultValue={comment === 'None listed' ? '' : comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button onClick={submit} type="submit">Submit</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditBidder.propTypes = {
  sections: PropTypes.shape({}),
  // Build out sections after connection with real data
  name: PropTypes.string,
  submitAction: PropTypes.func,
  bureaus: FILTER,
  details: PropTypes.shape({}),
};

EditBidder.defaultProps = {
  sections: {},
  name: '',
  submitAction: EMPTY_FUNCTION,
  bureaus: [],
  details: {},
};

export default EditBidder;
