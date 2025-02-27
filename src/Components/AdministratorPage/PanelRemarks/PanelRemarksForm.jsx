/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Picky } from 'react-picky';
import TextareaAutosize from 'react-textarea-autosize';
import { renderSelectionList } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import ToggleButton from 'Components/ToggleButton';
import { createPanelRemark } from 'actions/panelRemarks';


const PanelRemarksForm = ({ mode, categories, onClose }) => {
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [active, setActive] = useState(false);
  const [mutuallyExcl, setMutuallyExcl] = useState(false);
  const [roleRestriction, setRoleRestriction] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [insertions, setInsertions] = useState(['']);

  const dispatch = useDispatch();

  const handleNewInsertion = () => {
    setInsertions([...insertions, '']);
  };

  const handleInsertionChange = (index, value) => {
    const newInsertions = [...insertions];
    newInsertions[index] = value;
    setInsertions(newInsertions);
  };

  // adding a function to handle the form submission
  // gathering the following values from the form to create a JSON that needs to be logged
  // description, shortDescription, orderNum, active, mutuallyExcl, selectedCategories, insertions
  // console.log the JSON object
  // clear the form
  // creating the function:
  const handleSubmit = () => {
    const newRemark = {
      description,
      shortDescription,
      orderNum,
      active,
      mutuallyExcl,
      selectedCategories,
      insertions,
    };
    // console.log(newRemark);
    dispatch(createPanelRemark(newRemark));
    setDescription('');
    setShortDescription('');
    setOrderNum('');
    setActive(false);
    setMutuallyExcl(false);
    setRoleRestriction(false);
    setSelectedCategories([]);
    setInsertions(['']);
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
            maxRows={4}
            maxLength={500}
            placeholder="Enter remark description"
          />
          <div className="pr-word-count">
            {description.length} / 500
          </div>
        </div>
      </div>
      <div className="usa-grid pr-row">
        <div className="usa-width-one-third">
          <label htmlFor="remarkShortDescription pr-input">Short Description</label>
          <input id="remarkShortDescription" type="text" value={shortDescription} placeholder="Enter short description" onChange={(e) => setShortDescription(e.target.value)} />
        </div>
        <div className="usa-width-one-twelfth">
          <label htmlFor="remarkOrder">Order</label>
          <input id="remarkOrder" type="text" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} />
        </div>
        <div className="usa-grid-full pr-toggle-container">
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
          {...pickyProps}
          placeholder="Select Category"
          value={selectedCategories}
          options={categories}
          onChange={setSelectedCategories}
          valueKey="rccode"
          labelKey="rcdesctext"
        />
      </div>
      <div className="usa-grid">
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
      </div>
      <div className="usa-grid">
        <ToggleButton
          labelTextRight="Role Restriction"
          onChange={() => setRoleRestriction(!active)}
          checked={roleRestriction}
          onColor="#0071BC"
        />
      </div>
      <div className="usa-grid button-container" style={{ display: 'flex', justifyContent: 'end' }}>
        <button type="button" className="usa-button-secondary" onClick={onClose()} style={{ margin: '5px' }}>Cancel</button>
        <button type="button" className="usa-button-primary" onClick={handleSubmit} style={{ margin: '5px' }}>{mode === 'edit' ? 'Save' : 'Create'}</button>
      </div>
    </div>
  );
};

PanelRemarksForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  remarkData: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

PanelRemarksForm.defaultProps = {
  remarkData: {},
};

export default PanelRemarksForm;
