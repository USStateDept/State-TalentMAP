import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, throttle } from 'lodash';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import { editPositionDetailsFetchData, saveEditPositionDetailsSelections } from 'actions/editPositionDetails';
import FA from 'react-fontawesome';
import ScrollUpButton from '../ScrollUpButton';

const EditPositionDetails = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.editPositionDetailsSelections);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || EDIT_POSITION_DETAILS_SORT.defaultSort);

  // add filters here

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const resetFilters = () => {
    setClearFilters(false);
  };

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    textInput,
    textSearch,
  });

  // need to update
  const fetchAndSet = () => {
    dispatch(editPositionDetailsFetchData(getQuery()));
    dispatch(saveEditPositionDetailsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    textSearch,
  ]);

  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  return (
    <div className="edit-position-details-page">
      <div className="usa-grid-full edit-position-details-upper-section results-search-bar-container">
        <ProfileSectionTitle title="Position Details" icon="keyboard-o" />
        <PositionManagerSearch
          submitSearch={submitSearch}
          onChange={setTextInputThrottled}
          ref={childRef}
          textSearch={textSearch}
          label="Search for a Position"
          placeHolder="Search using Position Number or Position Title"
        />
        <div className="filterby-container">
          <div className="filterby-label">Filter by:</div>
          <div className="filterby-clear">
            {clearFilters &&
              <button className="unstyled-button" onClick={resetFilters}>
                <FA name="times" />
                  Clear Filters
              </button>
            }
          </div>
        </div>
        <div className="usa-width-one-whole edit-position-details-filters" />
      </div>
      {
        <div className="edit-position-details-results-controls">
          <SelectForm
            className="edit-position-details-results-select"
            id="edit-position-details-results-sort"
            options={sorts.options}
            label="Sort by:"
            defaultSort={ordering}
            onSelectOption={value => setOrdering(value.target.value)}
          />
          <SelectForm
            className="edit-position-details-results-select"
            id="edit-position-details-num-results"
            options={pageSizes.options}
            label="Results:"
            defaultSort={limit}
            onSelectOption={value => setLimit(value.target.value)}
          />
          <ScrollUpButton />
        </div>
      }
    </div>
  );
};

export default EditPositionDetails;
