import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import InteractiveElement from 'Components/InteractiveElement';
import CheckBox from 'Components/CheckBox';

const EditRemark = (props) => {
  const {
    rmrkCategories,
    dispatch,
    createRemark,
    createRemarkSuccess,
    createRemarkLoading,
  } = props;

  const [rmrkInsertionList, setRmrkInsertionList] = useState([]);

  const [descriptionInput, setDescriptionInput] = useState('');
  const [insertionInput, setInsertionInput] = useState('');

  const [showInsertionInput, setShowInsertionInput] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(false);
  const [mutuallyExclusive, setMutuallyExclusive] = useState(false);

  const closeRemarkModal = (e) => {
    e.preventDefault();
    swal.close();
  };

  const submitRemark = () => {
    dispatch(createRemark({
      rmrkInsertionList,
      descriptionInput,
      activeIndicator,
      mutuallyExclusive,
    }));
    if (createRemarkSuccess && !createRemarkLoading) {
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
    const result = descriptionInput.replace(regex, (match) => (x++ === i ? '' : match));
    setDescriptionInput(result);
  };

  const submitInsertion = () => {
    setShowInsertionInput(false);
    setRmrkInsertionList([...rmrkInsertionList, `{${insertionInput}}`]);
    setDescriptionInput(`${descriptionInput}{${insertionInput}}`);
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

  const updateInsertionInput = (e) => {
    const value = e.target.value;
    if (value) {
      setInsertionInput(value);
    }
  };

  const updateDescriptionInput = (e) => {
    const value = e.target.value;
    if (value) {
      setDescriptionInput(value);
    }
  };

  const checkActiveIndicator = (e) => {
    setActiveIndicator(e);
  };

  const checkMutuallyExclusive = (e) => {
    setMutuallyExclusive(e);
  };

  return (
    <div className="edit-remark-modal">
      <div className="help-text">
        <span>* indicates a required field</span>
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
      <div className="edit-remark-input">
        <label htmlFor="edit-remark-description">*Remark Description:</label>
        <input
          id="edit-remark-description"
          placeholder="Enter Remark Description"
          onChange={updateDescriptionInput}
          value={descriptionInput}
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
                onChange={updateInsertionInput}
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
      <div className="edit-remark-checkboxes-controls">
        <div className="edit-remark-checkboxes">
          <CheckBox
            label="Active Indicator"
            id="active-indicator-checkbox"
            onCheckBoxClick={checkActiveIndicator}
            value={activeIndicator}
          />
          <CheckBox
            label="Mutually Exclusive Indicator"
            id="mutually-exclusive-checkbox"
            onCheckBoxClick={checkMutuallyExclusive}
            value={mutuallyExclusive}
          />
        </div>
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
  createRemark: PropTypes.func.isRequired,
};

EditRemark.defaultProps = {
  rmrkCategories: [],
};

export default EditRemark;
