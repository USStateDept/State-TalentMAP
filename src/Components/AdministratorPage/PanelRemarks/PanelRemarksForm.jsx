import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picky } from 'react-picky';
import TextareaAutosize from 'react-textarea-autosize';
import ToggleButton from 'Components/ToggleButton';
import { createPanelRemark, editPanelRemark } from 'actions/panelRemarks';
import { toastWarning } from 'actions/toast';
import { renderSelectionList } from 'utilities';

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
  // const [roleRestriction, setRoleRestriction] = useState(false);
  // const [insertions, setInsertions] = useState(['']);

  // all remark insertion and role restriction functionality is commented out for the time being
  // const handleNewInsertion = () => {
  //   setInsertions([...insertions, '']);
  // };

  // const handleInsertionChange = (index, value) => {
  //   const newInsertions = [...insertions];
  //   newInsertions[index] = value;
  //   setInsertions(newInsertions);
  // };


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
      // insertions, // remark inserts. Commented out for now as this is not being used in the API call yet
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
        <div className="usa-width-one-half">
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
      {/* Commented out for now as this is not being used in the API call yet*}
      {/* <div className="usa-grid">
        <div className="usa-width-one-half">
          <div className="pr-label-container">
            <label htmlFor="remarkDescription" className="">Remark Insertion</label>
            <InteractiveElement type="label" className="pr-insertion-button" onClick={handleNewInsertion}>
              New Insertion
            </InteractiveElement>
          </div>
          {insertions.map((insertion, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`remark-insertion-${index}`} className="remark-insertion">
              <TextareaAutosize
                id={`remarkInsertion-${index}`}
                value={insertion}
                onChange={(e) => handleInsertionChange(index, e.target.value)}
                minRows={4}
                maxRows={4}
                maxLength={500}
                placeholder="Enter remark insertion"
              />
              <div className="pr-word-count">
                {insertion.length} / 500
              </div>
            </div>
          ))}
        </div>
      </div> */}
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
