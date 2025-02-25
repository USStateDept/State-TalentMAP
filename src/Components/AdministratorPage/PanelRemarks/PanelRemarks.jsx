import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Picky } from 'react-picky';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { fetchPanelRemarksCategoriesData, fetchPanelRemarksData } from 'actions/panelRemarks';
import { renderSelectionList } from 'utilities';
import ToggleButton from 'Components/ToggleButton';
import { isEmpty } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import PanelRemarksForm from './PanelRemarksForm';
import PanelRemarksTable from './PanelRemarksTable';


const PanelRemarks = () => {
  const dispatch = useDispatch();
  // getting data from panelRemarks reducer panelRemarks to get data:
  const panelRemarksData = useSelector(state => state.panelRemarks.results);

  const categoryFilterHasErrored = useSelector(state => state.panelRemarksCategoriesFetchDataErrored);
  const categoryFilterIsLoading = useSelector(state => state.panelRemarksCategoriesFetchDataLoading);
  const categoryFilter = useSelector(state => state.panelRemarksCategories);

  const [clearFilters, setClearFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isExcl, setIsExcl] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const textSearchRef = useRef();

  const isLoading = categoryFilterIsLoading;
  const [mode, setMode] = useState('create');
  const [showPanelRemarkForm, setShowPanelRemarkForm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showPrintView, setShowPrintView] = useState(false);

  const openForm = (type, data) => {
    setMode(type);
    setShowPanelRemarkForm(true);
    if (type === 'edit') {
      console.log(data);
    }
  };

  useEffect(() => {
    dispatch(fetchPanelRemarksData());
    dispatch(fetchPanelRemarksCategoriesData());
  }, []);

  const fetchAndSet = () => {
    if (isEmpty(textSearch) && isEmpty(selectedCategories) && !isActive && !isExcl) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(fetchPanelRemarksData());
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedCategories,
    isActive,
    isExcl,
    textSearch,
  ]);

  // Close form
  const closeForm = () => {
    fetchAndSet();
    setShowPanelRemarkForm(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsActive(false);
    setIsExcl(false);
    setTextSearch('');
    textSearchRef.current.clearText();
    setClearFilters(false);
  };

  const newRemarkButton = () => (
    // hide buttons when looking at the form
    !showPanelRemarkForm ? (
      <div className="button-container">
        <InteractiveElement className="pr-button with-icon" onClick={() => openForm('create')} disabled={isLoading}>
          <FontAwesomeIcon icon={faInbox} />
          New Remark
        </InteractiveElement>
        <InteractiveElement className="pr-button with-icon" onClick={() => setShowPrintView(true)} disabled={isLoading}>
          <FontAwesomeIcon icon={faPrint} />
          Print
        </InteractiveElement>
      </div>
    ) : null
  );

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const getOverlay = () => {
    let toReturn;
    if (toReturn) {
      return <div className="usa-width-one-whole empl-search-lower-section results-dropdown">{toReturn}</div>;
    }
    return false;
  };

  return (
    isLoading ? <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="panel-remarks-page position-search">
          <div className="usa-grid-full position-search--header">
            <ProfileSectionTitle title="Panel Remarks Search" icon="keyboard-o" />
            <div className="search-bar-container">
              <PositionManagerSearch
                ref={textSearchRef}
                placeHolder="Search for a particular Remark by description, search term, or category"
                textSearch={textSearch}
                submitSearch={(input) => setTextSearch(input)}
              />
            </div>
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <div className="filterby-clear">
                {clearFilters &&
                <button className="unstyled-button" onClick={resetFilters}>
                  <FontAwesomeIcon icon={faTimes} />
                  Clear Filters
                </button>
                }
              </div>            </div>
            <div className="usa-width-one-whole position-search--filters--el results-dropdown">
              <div className="filter-div">
                <div className="label">Category:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Category(s)"
                  value={selectedCategories}
                  options={categoryFilter}
                  onChange={setSelectedCategories}
                  valueKey="rccode"
                  labelKey="rcdesctext"
                  disabled={categoryFilterIsLoading || categoryFilterHasErrored}
                />
              </div>
              <div className="pr-toggle-filter">
                <div className="filter-div">
                  <ToggleButton
                    labelTextRight="Active"
                    onChange={() => setIsActive(!isActive)}
                    checked={isActive}
                    onColor="#0071BC"
                  />
                </div>
                <div className="filter-div">
                  <ToggleButton
                    labelTextRight="Mutually Exclusive"
                    onChange={() => setIsExcl(!isExcl)}
                    checked={isExcl}
                    onColor="#0071BC"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="usa-width-one-whole position-search--results">
            {
              getOverlay() ||
              <>
                <div className="usa-grid-full pr-content-container">
                  <TabbedCard
                    tabs={[{
                      text: 'Panel Remarks',
                      value: 'REMARKS',
                      content: showPanelRemarkForm ? <PanelRemarksForm mode={mode} onClose={() => closeForm} /> :
                        <PanelRemarksTable panelRemarks={panelRemarksData} openForm={openForm} />,
                    }]}
                    customComponent={newRemarkButton()}
                  />
                </div>
              </>
            }
          </div>
        </div>
      </>
  );
};

export default PanelRemarks;
