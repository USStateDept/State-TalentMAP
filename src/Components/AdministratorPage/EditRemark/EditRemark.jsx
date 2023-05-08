import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import { get } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import CheckBox from 'Components/CheckBox';

const EditRemark = (props) => {
  const {
    rmrkCategories,
    dispatch,
    createRemark,
    createRemarkSuccess,
    createRemarkLoading,
    category,
    remark,
    isEdit,
  } = props;

  const [descriptionInput, setDescriptionInput] = useState(remark.text || '');

  const sortInserts = () => {
    // Because the insertion remove functionality is index based, have to sort incoming insertions
    // to match insertion order of the remark description. Incoming insertions are not
    // necessarily in the same order as the insertions in the actual incoming remark description.
    const re = new RegExp('{[^}]*}', 'g');
    const sortedInserts = descriptionInput.match(re) || '';
    const loadedInserts = remark.remark_inserts;
    const displayInsertionList = [];
    loadedInserts.map(x => (displayInsertionList.push(x.riinsertiontext)));
    displayInsertionList.sort((a, b) => sortedInserts.indexOf(a) - sortedInserts.indexOf(b));
    return displayInsertionList;
  };

  const [rmrkInsertionList, setRmrkInsertionList] = useState(isEdit ? sortInserts() : []);

  const [shortDescription, setShortDescription] = useState(remark.short_desc_text || '');
  const [insertionInput, setInsertionInput] = useState('');
  const [rmrkCategory, setRmrkCategory] = useState(isEdit ? category.code : '');

  const [showInsertionInput, setShowInsertionInput] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(remark.active_ind === 'Y');
  const [mutuallyExclusive, setMutuallyExclusive] = useState(remark.mutually_exclusive_ind === 'Y');

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

  const updateShortDescription = (e) => {
    const value = e.target.value;
    if (value) {
      setShortDescription(value);
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
        <select
          id="edit-remark-categories"
          defaultValue={rmrkCategory}
          onChange={(e) => setRmrkCategory(get(e, 'target.value'))}
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
          onChange={updateShortDescription}
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
  remark: PropTypes.shape({
    seq_num: PropTypes.number,
    rc_code: PropTypes.string,
    order_num: PropTypes.number,
    short_desc_text: PropTypes.string,
    mutually_exclusive_ind: PropTypes.string,
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
};

EditRemark.defaultProps = {
  rmrkCategories: [],
  remark: {},
  category: '',
};

export default EditRemark;
