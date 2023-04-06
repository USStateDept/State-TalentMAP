import CheckBox from 'Components/CheckBox';

const EditRemark = () => {
  console.log('test');
  return (
    <div className="edit-remark-modal">
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-description">Remark Description:</label>
        <input
          id="edit-remark-description"
          placeholder="Enter Remark Description"
        />
      </div>
      <div>
        <CheckBox label="Active Indicator" />
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
    </div>
  );
};

export default EditRemark;
