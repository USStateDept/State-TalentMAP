import ToggleButton from 'Components/ToggleButton';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Picky } from 'react-picky';
import TextareaAutosize from 'react-textarea-autosize';
import { renderSelectionList } from 'utilities';


const PanelRemarksForm = ({ mode, onClose }) => {
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [active, setActive] = useState(false);
  const [mutuallyExcl, setMutuallyExcl] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [insertion, setInsertion] = useState('');

  // temporary data for category filter
  const categoryFilter = [
    { rccode: '1', rcdesctext: 'Category 1' },
    { rccode: '2', rcdesctext: 'Category 2' },
    { rccode: '3', rcdesctext: 'Category 3' },
    { rccode: '4', rcdesctext: 'Category 4' },
  ];

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  return (
    <div className="pr-form-container">
      <div className="usa-grid">
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
        <div className="word-count">
          {description.length} / 500
        </div>
      </div>
      <div className="usa-grid">
        <div className="usa-width-one-third">
          <label htmlFor="remarkShortDescription">Short Description</label>
          <input id="remarkShortDescription" type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
        </div>
        <div className="usa-width-one-sixth">
          <label htmlFor="remarkOrder">Order</label>
          <input id="remarkOrder" type="text" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} />
        </div>
        <div className="usa-grid-full">
          <div className="">
            <ToggleButton
              labelTextRight="Active"
              onChange={() => setActive(!active)}
              checked={active}
              onColor="#0071BC"
            />        </div>
          <div className="">
            <ToggleButton
              labelTextRight="Mutually Exclusive"
              onChange={() => setMutuallyExcl(!mutuallyExcl)}
              checked={mutuallyExcl}
              onColor="#0071BC"
            />
          </div>
        </div>
      </div>
      <div className="usa-grid">
        <label htmlFor="remarkCategory">Remark Category</label>
        <Picky
          id="remarkCategory"
          {...pickyProps}
          placeholder="Select Category"
          value={selectedCategories}
          options={categoryFilter}
          onChange={setSelectedCategories}
          valueKey="rccode"
          labelKey="rcdesctext"
        //   disabled={categoryFilterIsLoading || categoryFilterHasErrored}
        />
      </div>
      <div className="usa-grid">
        <label htmlFor="remarkDescription">Remark Insertion</label>
        <TextareaAutosize
          id="remarkInsertion"
          value={insertion}
          onChange={(e) => setInsertion(e.target.value)}
          minRows={4}
          maxRows={4}
          maxLength={500}
          placeholder="Enter remark insertion"
        />
        <div className="word-count">
          {insertion.length} / 500
        </div>
      </div>
      <div className="usa-grid button-container" style={{ display: 'flex', justifyContent: 'end' }}>
        <button type="button" className="usa-button-secondary" onClick={onClose()} style={{ margin: '5px' }}>Cancel</button>
        <button type="button" className="usa-button-primary" style={{ margin: '5px' }}>{mode === 'edit' ? 'Save' : 'Create'}</button>
      </div>
    </div>
  );
};

PanelRemarksForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  remarkData: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

PanelRemarksForm.defaultProps = {
  remarkData: {},
};

export default PanelRemarksForm;
