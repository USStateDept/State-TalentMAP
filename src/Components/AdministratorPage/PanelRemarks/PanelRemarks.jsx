import { useEffect, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Picky } from 'react-picky';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { fetchPanelRemarksCategoriesData, fetchPanelRemarksData, panelRemarksCreateSuccess, panelRemarksEditSuccess } from 'actions/panelRemarks';
import { renderSelectionList } from 'utilities';
import ToggleButton from 'Components/ToggleButton';
import { isEmpty } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import PanelRemarksForm from './PanelRemarksForm';
import PanelRemarksTable from './PanelRemarksTable';


const PanelRemarks = () => {
  const dispatch = useDispatch();
  const panelRemarksData = useSelector(state => state.panelRemarks.results);
  const tableRef = useRef();

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
  const [editRemarkData, setEditRemarkData] = useState({});
  const [showPanelRemarkForm, setShowPanelRemarkForm] = useState(false);
  const [printViewLoading, setPrintViewLoading] = useState(false);

  const getQuery = () => ({
    rmrkrccode: selectedCategories.map(cat => cat.rccode).join(','),
    rmrkactiveind: isActive,
    rmrkmutuallyexclusiveind: isExcl,
    freetext: textSearch,
  });

  const openForm = (type, data) => {
    setMode(type);
    setShowPanelRemarkForm(true);
    if (type === 'edit') {
      setEditRemarkData(data);
    }
  };

  useEffect(() => {
    dispatch(fetchPanelRemarksData(getQuery()));
    dispatch(fetchPanelRemarksCategoriesData());
  }, []);

  const fetchAndSet = () => {
    // Reset the success flags
    batch(() => {
      dispatch(panelRemarksEditSuccess(false));
      dispatch(panelRemarksCreateSuccess(false));
    });
    // If no filters are set, disable the clear filters button
    if (isEmpty(textSearch) && isEmpty(selectedCategories) && !isActive && !isExcl) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    // Fetch the data
    dispatch(fetchPanelRemarksData(getQuery()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedCategories,
    isActive,
    isExcl,
    textSearch,
  ]);

  // Close form and refresh data on save
  const closeForm = (fetchData = false) => {
    if (fetchData) {
      fetchAndSet();
    }
    setShowPanelRemarkForm(false);
    setEditRemarkData({});
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsActive(false);
    setIsExcl(false);
    setTextSearch('');
    textSearchRef.current.clearText();
    setClearFilters(false);
  };

  const exportPanelRemarksTable = () => {
    if (tableRef.current) {
      setPrintViewLoading(true);
      const grid = tableRef.current.getGridRef();
      const allColumns = grid.columnApi.getAllGridColumns();
      const columnsToExport = allColumns.filter(col => col.colId !== 'edit'); // Exclude the Edit column
      grid.api.exportDataAsCsv({
        columnKeys: columnsToExport.map(col => col.colId),
        fileName: 'Panel_Remarks.csv',
      });
      setPrintViewLoading(false);
    }
  };

  const newRemarkButton = () => (
    // hide buttons when looking at the form
    !showPanelRemarkForm ? (
      <div className="button-container">
        <InteractiveElement className="pr-button with-icon" onClick={() => openForm('create')} disabled={isLoading}>
          <FontAwesomeIcon icon={faInbox} />
          New Remark
        </InteractiveElement>
        <InteractiveElement className="pr-button with-icon" onClick={exportPanelRemarksTable} isLoading={printViewLoading} disabled={isLoading}>
          <FontAwesomeIcon icon={faPrint} />
          Export
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
                placeHolder="Search for a Remark by description or short description"
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
              </div>
            </div>
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
                      content: showPanelRemarkForm ? <PanelRemarksForm mode={mode} categories={categoryFilter} remarkData={editRemarkData} onClose={closeForm} /> :
                        <PanelRemarksTable ref={tableRef} panelRemarks={panelRemarksData} fetchData={fetchAndSet} openForm={openForm} />,
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
