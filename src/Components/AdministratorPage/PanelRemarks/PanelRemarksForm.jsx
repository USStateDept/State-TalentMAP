import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picky } from 'react-picky';
import TextareaAutosize from 'react-textarea-autosize';
import ToggleButton from 'Components/ToggleButton';
import InteractiveElement from 'Components/InteractiveElement';
import { createPanelRemark, editPanelRemark } from 'actions/panelRemarks';
import { toastWarning } from 'actions/toast';
import { renderSelectionList } from 'utilities';
import FontAwesome from 'react-fontawesome';

const PanelRemarksForm = ({ mode, categories, remarkData, onClose }) => {
  const dispatch = useDispatch();

  const createRemarkSuccess = useSelector((state) => state.panelRemarksCreateSuccess);
  const editRemarkSuccess = useSelector((state) => state.panelRemarksEditSuccess);

  const [validForm, setValidForm] = useState(true);
  const [description, setDescription] = useState(remarkData.rmrktext || '');
  const [shortDescription, setShortDescription] = useState(remarkData.rmrkshortdesctext || '');
  const [orderNum, setOrderNum] = useState(remarkData.rmrkordernum || 0);
  const [active, setActive] = useState(remarkData.rmrkactiveind || false);
  const [mutuallyExcl, setMutuallyExcl] = useState(remarkData.rmrkmutuallyexclusiveind || false);
  const [selectedCategories, setSelectedCategories] = useState(remarkData.rmrkrccode || '');
  const [insertions, setInsertions] = useState([{ id: 0, value: '' }]);
  // const [roleRestriction, setRoleRestriction] = useState(false);

  const handleNewInsertion = () => {
    setInsertions([...insertions, { id: insertions.length, value: '' }]);
  };

  const handleInsertionChange = (index, value) => {
    setInsertions(insertions.map((insertion) =>
      insertion.id === index ? { ...insertion, value } : insertion,
    ));
  };

  const handleRemoveInsertion = (index) => {
    const updatedInsertions = insertions.filter((insertion) => insertion.id !== index);
    if (updatedInsertions.length === 0) {
    // Ensure at least one clear input is always present
      setInsertions([{ id: 0, value: '' }]);
    } else {
      setInsertions(updatedInsertions);
    }
  };

  useEffect(() => {
    // if the create or edit was successful, close the form
    if (createRemarkSuccess || editRemarkSuccess) {
      onClose(true);
    }
  }, [createRemarkSuccess, editRemarkSuccess]);

  const validateForm = () => {
    // check if all required fields are filled out
    if (!selectedCategories || !description || !shortDescription) {
      const title = 'Cannot Submit Form';
      const message = 'Missing fields are highlighted red';
      dispatch(toastWarning(message, title));
      setValidForm(false);
      return false;
    }
    setValidForm(true);
    return true;
  };

  const handleSubmit = async () => {
    // validate form before submitting, if invalid warning toast appears
    if (!validateForm()) {
      return;
    }

    const newRemark = {
      rmrkrccode: selectedCategories, // selectedCategory code (the rccode required by the WS endpoint)
      rmrkordernum: orderNum, // orderNum
      rmrkshortdesctext: shortDescription, // shortDescription
      rmrkmutuallyexclusiveind: mutuallyExcl, // mutuallyExcl
      rmrktext: description, // description
      rmrkactiveind: active, // active
      insertions, // remark inserts
      ...(mode === 'edit' && {
        rmrkseqnum: remarkData.rmrkseqnum,
        rmrkupdatedate: remarkData.rmrkupdatedate,
      }), // if in edit mode, include the remark sequence number and update date
    };

    if (mode === 'create') {
      await dispatch(createPanelRemark(newRemark));
    } else if (mode === 'edit') {
      await dispatch(editPanelRemark(newRemark));
    }
  };

  const pickyProps = {
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
  };

  return (
    <div className="pr-form">
      <div className="usa-grid">
        <div className="usa-width-one-third">
          <label htmlFor="remarkDescription">Remark Description</label>
          <TextareaAutosize
            id="remarkDescription"
            className={!validForm && !description ? 'input-error' : ''}
            placeholder="Enter remark description"
            value={description}
            onChange={(e) => {
              const value = e.target.value.slice(0, 100);
              setDescription(value);
            }}
            minRows={4}
            maxRows={4}
            maxLength={100}
          />
          <div className="pr-word-count">
            {description.length} / 100
          </div>
        </div>
      </div>
      <div className="usa-grid pr-row">
        <div>
          <label htmlFor="remarkShortDescription pr-input">Short Description</label>
          <input
            id="remarkShortDescription"
            className={!validForm && !shortDescription ? 'input-error' : ''}
            type="text"
            placeholder="Enter short description"
            value={shortDescription}
            onChange={(e) => {
              const value = e.target.value.slice(0, 20);
              setShortDescription(value);
            }}
            style={{ maxWidth: '200px' }}
          />
          <div className="pr-word-count">
            {shortDescription.length} / 20
          </div>
        </div>
        <div>
          <label htmlFor="remarkOrder">Order</label>
          <input
            id="remarkOrder"
            type="number"
            value={orderNum}
            onChange={(e) => {
              // converts current value to an integer, or 0 if it's not a number
              // ensures the value is between 0 and 99, any number entered above 99 will be set to 99
              setOrderNum(Math.min(parseInt(e.target.value, 10) || 0, 99));
            }}
            max={99}
            style={{ maxWidth: '70px' }}
          />
        </div>
        <div className="pr-toggle-container">
          <ToggleButton
            labelTextRight="Active"
            onChange={() => setActive(!active)}
            checked={active}
            onColor="#0071BC"
          />
          <ToggleButton
            labelTextRight="Mutually Exclusive"
            onChange={() => setMutuallyExcl(!mutuallyExcl)}
            checked={mutuallyExcl}
            onColor="#0071BC"
          />
        </div>
      </div>
      <div className="usa-grid">
        <label htmlFor="remarkCategory">Remark Category</label>
        <Picky
          id="remarkCategory"
          className={!validForm && !selectedCategories ? 'input-error' : ''}
          {...pickyProps}
          placeholder="Select Category"
          value={categories.find((category) => category.rccode === selectedCategories)}
          options={categories}
          onChange={(selected) => {
            if (selected && selected.rccode) {
              setSelectedCategories(selected.rccode);
            } else {
              setSelectedCategories('');
            }
          }}
          valueKey="rcdesctext"
          labelKey="rcdesctext"
          multiple={false}
        />
      </div>
      <div className="usa-grid">
        <div className="usa-width-one-half">
          <div className="pr-insertion-container">
            <label htmlFor="remarkDescription" className="">Remark Insertion</label>
            <InteractiveElement
              onClick={handleNewInsertion}
              type="span"
              role="button"
              className="standard-add-button"
              title="Add insertion"
              id="add-insertion"
            >
              <FontAwesome className="icon" name="plus" />
              <span>New Insertion</span>
            </InteractiveElement>
          </div>
          {insertions.map((insertion) => (
            <div key={`remark-insertion-${insertion.id}`} className="remark-insertion input-wrapper">
              <input
                id={`insertion-${insertion.id}`}
                className="text-input"
                type="text"
                placeholder="{insertion}"
                value={insertion.value}
                onChange={(e) => handleInsertionChange(insertion.id, e.target.value)}
                style={{ maxWidth: '200px' }}
              />
              <FontAwesome name="times" title="Delete insertion" onClick={() => handleRemoveInsertion(insertion.id)} style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="usa-grid">
        <ToggleButton
          labelTextRight="Role Restriction"
          onChange={() => setRoleRestriction(!roleRestriction)}
          checked={roleRestriction}
          onColor="#0071BC"
        />
      </div> */}
      <div className="usa-grid button-container" style={{ display: 'flex', justifyContent: 'end' }}>
        <button type="button" className="usa-button-secondary" onClick={() => onClose()} style={{ margin: '5px' }}>Cancel</button>
        <button type="button" className="usa-button-primary" onClick={handleSubmit} style={{ margin: '5px' }}>{mode === 'edit' ? 'Save' : 'Create'}</button>
      </div>
    </div>
  );
};

PanelRemarksForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  remarkData: PropTypes.shape({
    rmrkseqnum: PropTypes.number,
    rmrktext: PropTypes.string,
    rmrkshortdesctext: PropTypes.string,
    rmrkordernum: PropTypes.number,
    rmrkactiveind: PropTypes.bool,
    rmrkmutuallyexclusiveind: PropTypes.bool,
    rmrkrccode: PropTypes.string,
    rmrkcreatedate: PropTypes.string,
    rmrkupdatedate: PropTypes.string,
    remarkInserts: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
};

PanelRemarksForm.defaultProps = {
  remarkData: {},
};

export default PanelRemarksForm;
