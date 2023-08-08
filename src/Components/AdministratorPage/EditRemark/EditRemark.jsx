import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import InteractiveElement from 'Components/InteractiveElement';
// import CheckBox from 'Components/CheckBox';
import { saveRemark } from 'actions/editRemark';

const EditRemark = (props) => {
  const {
    rmrkCategories,
    dispatch,
    saveAdminRemarkIsLoading,
    saveAdminRemarkSuccess,
    category,
    remark,
    isEdit,
  } = props;

  const [longDescription, setLongDescription] = useState(remark.text || '');

  const loadInserts = () => {
    const re = new RegExp('{[^}]*}', 'g');
    const sortedInserts = longDescription.match(re) || [];
    return sortedInserts;
  };

  const [rmrkInsertionList, setRmrkInsertionList] = useState(isEdit ? loadInserts() : []);

  const [shortDescription, setShortDescription] = useState(remark.short_desc_text || '');
  const [insertionInput, setInsertionInput] = useState('');
  const [rmrkCategory, setRmrkCategory] = useState(isEdit ? category.code :
    rmrkCategories[0]?.code);

  const [showInsertionInput, setShowInsertionInput] = useState(false);
  // const [activeIndicator, setActiveIndicator] = useState(remark.active_ind === 'Y');

  const closeRemarkModal = (e) => {
    e.preventDefault();
    swal.close();
  };

  const submitRemark = () => {
    dispatch(saveRemark({
      rmrkInsertionList,
      rmrkCategory,
      longDescription,
      shortDescription,
      // activeIndicator,
    }));
    if (saveAdminRemarkSuccess.length && !saveAdminRemarkIsLoading) {
      swal.close();
    }
  };

  const onRemoveInsertionClick = (i) => {
    const returnArray = [...rmrkInsertionList];
    returnArray.splice(i, 1);
    setRmrkInsertionList(returnArray);

    const regex = new RegExp('{[^}]*}', 'g');
    let x = 0;
    // eslint-disable-next-line no-plusplus
    const result = longDescription.replace(regex, (match) => (x++ === i ? '' : match));
    setLongDescription(result);
  };

  const submitInsertion = () => {
    setShowInsertionInput(false);
    setRmrkInsertionList([...rmrkInsertionList, `{${insertionInput}}`]);
    setLongDescription(`${longDescription}{${insertionInput}}`);
    setInsertionInput('');
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitInsertion();
    } else if (e.key === 'Escape') {
      setShowInsertionInput(false);
      setInsertionInput('');
    }
  };

  return (
    <div className="edit-remark-modal">
      <div className="help-text">
        <span>* indicates a required field</span>
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-categories">*Remark Category:</label>
        <select
          id="edit-remark-categories"
          defaultValue={rmrkCategory}
          onChange={(e) => setRmrkCategory(e?.target.value)}
        >
          {
            rmrkCategories.map(x => (
              <option value={x.code}>
                {x.desc_text}
              </option>
            ))
          }
        </select>
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-description">*Remark Description:</label>
        <input
          id="edit-remark-description"
          placeholder="Enter Remark Description"
          onChange={e => setLongDescription(e.target.value)}
          value={longDescription}
        />
      </div>
      <div className="edit-remark-input">
        <label htmlFor="add-insertion-container" />
        <div className="add-insertion-container">
          <button
            id="add-insertion-button"
            onClick={() => setShowInsertionInput(true)}
            className="add-insertion-button"
          >
            Add Remark Insertion
          </button>
          {showInsertionInput &&
            <div className="add-insertion-input-container">
              <input
                placeholder="Enter Remark Insertion"
                onKeyDown={onInputKeyDown}
                onChange={e => setInsertionInput(e.target.value)}
              />
              <InteractiveElement
                onClick={submitInsertion}
                className="insertion-icon"
                type="span"
                role="button"
                title="Add Insertion"
                id="add-insertion"
              >
                <FA name="plus" />
              </InteractiveElement>
            </div>
          }
        </div>
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-short-description">Remark Short Description:</label>
        <input
          id="edit-remark-short-description"
          placeholder="Enter Remark Short Description"
          onChange={e => setShortDescription(e.target.value)}
          value={shortDescription}
        />
      </div>
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-insertion">Remark Insertions:</label>
        <div id="edit-remark-insertion" className="remark-insertion-list">
          {rmrkInsertionList?.map((insertion, i) => (
            <div className="remark-insertion">
              {insertion}
              <InteractiveElement
                className="insertion-icon"
                type="span"
                role="button"
                title="Remove Insertion"
                onClick={() => onRemoveInsertionClick(i)}
              >
                <FA name="minus" />
              </InteractiveElement>
            </div>
          ))}
        </div>
      </div>
      <div className="edit-remark-checkboxes-controls pt-20">
        {/*   Commented out for Release 11.0
          <CheckBox
          label="Active Indicator"
          id="active-indicator-checkbox"
          onCheckBoxClick={e => setActiveIndicator(e)}
          value={activeIndicator}
        /> */}
        <div className="modal-controls">
          <button onClick={submitRemark}>Submit</button>
          <button className="usa-button-secondary" onClick={closeRemarkModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

EditRemark.propTypes = {
  rmrkCategories: PropTypes.arrayOf(PropTypes.shape({})),
  dispatch: PropTypes.func.isRequired,
  remark: PropTypes.shape({
    seq_num: PropTypes.number,
    rc_code: PropTypes.string,
    order_num: PropTypes.number,
    short_desc_text: PropTypes.string,
    text: PropTypes.string,
    active_ind: PropTypes.string,
    remark_inserts: PropTypes.arrayOf(
      PropTypes.shape({
        rirmrkseqnum: PropTypes.number,
        riseqnum: PropTypes.number,
        riinsertiontext: PropTypes.string,
      }),
    ),
  }),
  category: PropTypes.string,
  isEdit: PropTypes.bool.isRequired,
  saveAdminRemarkSuccess: PropTypes.bool,
  saveAdminRemarkIsLoading: PropTypes.bool,
};

EditRemark.defaultProps = {
  rmrkCategories: [],
  remark: {},
  category: '',
  saveAdminRemarkIsLoading: false,
  saveAdminRemarkSuccess: false,
};

export default EditRemark;
