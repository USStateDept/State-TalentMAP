import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import SelectForm from 'Components/SelectForm';
import { useEffect, useRef, useState } from 'react';
import { get, throttle } from 'lodash';
import { PANEL_MEETINGS_PAGE_SIZES, PANEL_MEETINGS_SORT } from 'Constants/Sort';
import { panelMeetingsFetchData, savePanelMeetingsSelections } from 'actions/panelMeetings';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import ScrollUpButton from '../../ScrollUpButton';
import BackButton from '../../BackButton';

const PanelMeetingAgenda = () => {
  const dispatch = useDispatch();
  const childRef = useRef();

  const userSelections = useSelector(state => state.panelMeetingsSelections);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PANEL_MEETINGS_SORT.defaultSort);

  const [selectedMeetingType] = useState(get(userSelections, 'selectedMeetingType') || []);
  const [selectedMeetingDate] = useState(get(userSelections, 'selectedMeetingDate') || null);
  const [selectedMeetingStatus] = useState(get(userSelections, 'selectedMeetingStatus') || []);
  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const resetFilters = () => {
    setClearFilters(false);
  };

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;
  const sorts = PANEL_MEETINGS_SORT;

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
    selectedMeetingType,
    selectedMeetingStatus,
    selectedMeetingDate,
    textInput,
    textSearch,
  });

  const fetchAndSet = () => {
    dispatch(panelMeetingsFetchData(getQuery()));
    dispatch(savePanelMeetingsSelections(getCurrentInputs()));
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
    <div className="panel-meeting-search-page">
      <div className="usa-grid-full panel-meeting-search-upper-section results-search-bar-container">
        <ProfileSectionTitle title="Panel Meeting Agenda" icon="comment" />
        <BackButton />
        <PositionManagerSearch
          submitSearch={submitSearch}
          onChange={setTextInputThrottled}
          ref={childRef}
          textSearch={textSearch}
          label="Search for a Panel Meeting"
          placeHolder="Search using Panel ID"
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
        <div className="usa-width-one-whole panel-meeting-search-filters" />
      </div>
      {
        <div className="panel-results-controls">
          <SelectForm
            className="panel-results-select"
            id="panel-search-results-sort"
            options={sorts.options}
            label="Sort by:"
            defaultSort={ordering}
            onSelectOption={value => setOrdering(value.target.value)}
          />
          <SelectForm
            className="panel-results-select"
            id="panel-search-num-results"
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

export default PanelMeetingAgenda;
