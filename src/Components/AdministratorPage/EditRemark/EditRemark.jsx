import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import CheckBox from 'Components/CheckBox';

const EditRemark = (props) => {
  const { rmrkCategories } = props;

  const closeRemarkModal = (e) => {
    e.preventDefault();
    swal.close();
  };

  return (
    <div className="edit-remark-modal">
      <div className="help-text">
        <span>* indicates a required field</span>
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-description">*Remark Description:</label>
        <input
          id="edit-remark-description"
          placeholder="Enter Remark Description"
        />
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-short-description">Remark Short Description:</label>
        <input
          id="edit-remark-short-description"
          placeholder="Enter Remark Short Description"
        />
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-insertion">Remark Insertion Text:</label>
        <input
          id="edit-remark-insertion"
          placeholder="Enter Remark Insertion Text"
        />
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-categories">*Remark Category:</label>
        <select id="edit-remark-categories">
          {
            rmrkCategories.map(x => (
              <option value={x.code}>
                {x.desc_text}
              </option>
            ))
          }
        </select>
      </div>
      <div className="edit-remark-checkboxes-controls">
        <div className="edit-remark-checkboxes">
          <CheckBox label="Active Indicator" />
          <CheckBox label="Mutually Exclusive Indicator" />
        </div>
        <div className="modal-controls">
          <button>Submit</button>
          <button className="usa-button-secondary" onClick={closeRemarkModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

EditRemark.propTypes = {
  rmrkCategories: PropTypes.arrayOf(PropTypes.shape({})),
};

EditRemark.defaultProps = {
  rmrkCategories: [],
};

export default EditRemark;
