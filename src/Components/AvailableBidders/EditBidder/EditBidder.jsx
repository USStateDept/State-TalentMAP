import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const EditBidder = (props) => {
  const { name, sections, submitAction } = props;
  const [status, setStatus] = useState(sections.Status);
  const [comment, setComment] = useState(sections.Comments);
  const [ocReason, setOCReason] = useState(sections.OC_Reason);
  const [ocBureau, setOCBureau] = useState(sections.OC_Reason);

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      oc_bureau: ocBureau,
      oc_reason: ocReason,
      status,
      comments: comment,
    };
    submitAction(userInputs);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Client Name:</label>
        <input type="text" name="name" disabled value={name} />
        <label htmlFor="status">Status:</label>
        <select id="status" defaultValue={status} onChange={(e) => setStatus(e.target.value)} >
          <option value="OC">OC: Overcompliment</option>
          <option value="UA">UA: Unassigned</option>
          <option value="IT">IT: In Transit</option>
          <option value="AWOL">AWOL: Absent without leave</option>
        </select>
        <label htmlFor="skill">Skill:</label>
        <input type="text" name="skill" disabled value={sections.Skill} />
        <label htmlFor="grade">Grade:</label>
        <input type="text" name="grade" disabled value={sections.Grade} />
        <label htmlFor="ted">TED:</label>
        <input type="text" name="ted" disabled value={sections.TED} />
        <label htmlFor="currentPost">Current Post:</label>
        <input type="text" name="currentPost" disabled value={sections.Current_Post} />
        <label htmlFor="ocBureau">OC Bureau:</label>
        <input type="text" name="ocBureau" defaultValue={ocBureau} onChange={(e) => setOCBureau(e.target.value)} />
        <label htmlFor="ocReason">OC Reason:</label>
        <input type="text" name="ocReason" defaultValue={ocReason} onChange={(e) => setOCReason(e.target.value)} />
        <label htmlFor="cdo">CDO:</label>
        <input type="text" name="cdo" disabled value={sections.CDO} />
        <label htmlFor="comment">Comment:</label>
        <input type="text" name="comment" defaultValue={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
};

EditBidder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sections: PropTypes.object,
  name: PropTypes.string,
  submitAction: PropTypes.func,
};

EditBidder.defaultProps = {
  sections: {},
  name: '',
  submitAction: EMPTY_FUNCTION,
};

export default EditBidder;
