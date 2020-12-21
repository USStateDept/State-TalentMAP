import React, { useState } from 'react';
import swal from '@sweetalert/with-react';


const EditBidder = (props) => {
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [ocreason, setReason] = useState('');
  const { showModal } = props;


  return swal({
    title: 'Available Bidder Record Editor',
    buttons: ['Cancel', 'Save'],
    show: showModal,
    content: (
      <div>
        <form>
          <label htmlFor="comment">Comment:</label>
          <input type="text" name="comment" />
          <label htmlFor="status">Status:</label>
          <select id="comment">
            <option value="OC">OC: Overcompliment</option>
            <option value="UA">UA: Unassigned</option>
            <option value="IT">IT: In Transit</option>
            <option value="AWOL">AWOL: Absent without leave</option>
          </select>
        </form>
      </div>
    ),
  });
};

export default EditBidder;

// const sections = {
//   Name: (<Link to={`/profile/public/${bidder.emp_id}/bureau`}>{get(bidder, 'name')}</Link>),
//   Status: 'OC',
//   Skill: get(bidder, 'skills[0].description'),
//   Grade: get(bidder, 'grade', NO_GRADE),
//   Division: 'ML',
//   TED: formattedTed,
//   Begin_Date: '01/01/21',
//   Current_Post: get(bidder, 'current_assignment.position.post.location.country'),
//   CDO: get(bidder, 'cdo.name'),

// };


// swal({
//   title: 'Available Bidder Record Editor',
//   buttons: ['Cancel', 'Save'],
//   content: (
//     <div>
//       <form>
//         <label htmlFor="comment">Comment:</label>
//         <input type="text" name="comment" id="comment" />
//         <label htmlFor="status">Status:</label>
//         <select id="comment">
//           <option value="OC">OC: Overcompliment</option>
//           <option value="UA">UA: Unassigned</option>
//           <option value="IT">IT: In Transit</option>
//           <option value="AWOL">AWOL: Absent without leave</option>
//         </select>
//       </form>
//     </div>
//   ),
// });
