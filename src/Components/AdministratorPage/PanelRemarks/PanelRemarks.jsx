/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Picky } from 'react-picky';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { fetchPanelRemarksCategoriesData, fetchPanelRemarksData } from 'actions/panelRemarks';
import { renderSelectionList } from 'utilities';
import ToggleButton from 'Components/ToggleButton';
import TotalResults from 'Components/TotalResults';
import { isEmpty } from 'lodash';


const PanelRemarks = () => {
  const dispatch = useDispatch();
  // getting data from panelRemarks reducer panelRemarks to get data:
  const panelRemarksData = useSelector(state => state.panelRemarks.results);
  console.log('panelRemarksData in PanelRemarks.jsx:', panelRemarksData);

  const categoryFilterHasErrored = useSelector(state => state.panelRemarksCategoriesFetchDataErrored);
  const categoryFilterIsLoading = useSelector(state => state.panelRemarksCategoriesFetchDataLoading);
  const categoryFilter = useSelector(state => state.panelRemarksCategories);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isExcl, setIsExcl] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const textSearchRef = useRef();

  const isLoading = categoryFilterIsLoading;
  const [clearFilters, setClearFilters] = useState(false);
  const [setPrintView] = useState(false);

  const onEditRow = (params) => {
    // Logic to edit the row
    console.log('Editing row:', params.data);
  };

  const [headers] = useState([
    { field: 'Category', headerName: 'Category', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 1, editable: true },
    { field: 'ShortDesc', headerName: 'Short Desc.', flex: 1, editable: true },
    { field: 'Order', headerName: 'Order', flex: 1, editable: true },
    { field: 'Active', headerName: 'Active', flex: 1, editable: true },
    { field: 'Excl', headerName: 'Mutually Exclusive', flex: 1, editable: true },
    {
      headerName: 'Edit',
      field: 'edit',
      cellRenderer: (params) => (
        <button onClick={() => onEditRow(params)} className="pr-row-edit-icon-button">
          <FontAwesomeIcon icon={faPen} />
        </button>
      ),
      flex: 0.5,
    },
  ]);

  const [panelRemarksRows, setPanelRemarksRows] = useState([]);

  const mapObjectToRow = (obj) => {
    const row = {
      POS_SEQ_NUM: obj.POS_SEQ_NUM,
      Category: obj.Category,
      Description: obj.Description,
      ShortDesc: obj.ShortDesc,
      Order: obj.Order,
      Active: obj.Active,
      Excl: obj.Excl,
    };

    return row;
  };

  useEffect(() => {
    dispatch(fetchPanelRemarksData());
    dispatch(fetchPanelRemarksCategoriesData());
  }, []);

  useEffect(() => {
    if (panelRemarksData.length > 0) {
      const mappedRows = panelRemarksData.map(mapObjectToRow);
      setPanelRemarksRows(mappedRows);
    }
  }, [panelRemarksData]);

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

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsActive(false);
    setIsExcl(false);
    setTextSearch('');
    textSearchRef.current.clearText();
    setClearFilters(false);
  };

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
              <div className="usa-grid-full">
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
              </div>
              <div className="usa-grid-full">
                <div className="filter-div">
                  <ToggleButton
                    labelTextRight="Active"
                    onChange={() => setIsActive(!isActive)}
                    checked={isActive}
                    onColor="#0071BC"
                  />
                </div>
              </div>
              <div className="usa-grid-full">
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
          <div className="controls-container results-dropdown">
            <div>
              <TotalResults
                total={100}
                pageNumber={5}
                pageSize={5}
                suffix="Results"
              />
            </div>
            <div className="position-search-controls--right">
              <div className="position-search-controls--results" />
              <button className="pr-print-button" onClick={() => setPrintView(true)} disabled={isLoading}>
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
            </div>
          </div>
          <div className="usa-width-one-whole position-search--results">
            {
              getOverlay() ||
              <>
                <div className="usa-grid-full pr-table-container">
                  <div className="pr-table ag-theme-alpine" style={{ width: '100%' }}>
                    <TabbedCard
                      tabHeaders={['Panel Remarks', 'Remarks Categories']}
                      tabs={[{
                        text: 'Panel Remarks',
                        value: 'REMARKS',
                        content: <AgGridReact
                          domLayout="autoHeight"
                          columnDefs={headers}
                          rowData={panelRemarksRows}
                          pagination
                          paginationPageSize={10}
                          singleClickEdit
                        />,
                      },
                      ]}
                    />
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </>
  );
};

export default PanelRemarks;
