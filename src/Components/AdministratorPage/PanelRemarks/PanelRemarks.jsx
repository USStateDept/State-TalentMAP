import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AgGridReact } from 'ag-grid-react';
import Spinner from 'Components/Spinner';
import ExportButton from 'Components/ExportButton';
import PaginationWrapper from 'Components/PaginationWrapper';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import TotalResults from '../../TotalResults';


const panel_remarks_test_data = [
  {
    Category: 'Category 1',
    Description: 'Description 1',
    ShortDesc: 'Short Desc 1',
    Order: 'Order 1',
    Active: 'Active 1',
    Excl: 'Excl 1',
  },
  {
    Category: 'Category 2',
    Description: 'Description 2',
    ShortDesc: 'Short Desc 2',
    Order: 'Order 2',
    Active: 'Active 2',
    Excl: 'Excl 2',
  },
];


const PanelRemarksTable = () => {
  const [textSearch, setTextSearch] = useState('');
  const textSearchRef = useRef();

  const [headers] = useState([
    { field: 'Category', headerName: 'Category', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 1 },
    { field: 'ShortDesc', headerName: 'Short Desc', flex: 1 },
    { field: 'Order', headerName: 'Order', flex: 1 },
    { field: 'Active', headerName: 'Active?', flex: 1 },
    { field: 'Excl', headerName: 'Excl?', flex: 1 },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (panel_remarks_test_data.length > 0) {
      // const mappedRows = elPositions.map(mapObjectToRow);
      setRows(panel_remarks_test_data);
    }
  }, []);

  const prFiltersIsLoading = useSelector(state => state.panelRemarksFiltersFetchDataLoading);

  const isLoading = prFiltersIsLoading;
  // getOverlay() will be placed here

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
              <div className="filterby-clear" />
            </div>
            <div className="usa-width-one-whole position-search--filters--el results-dropdown">
              <div className="usa-grid-full" />
              <div className="usa-grid-full" />
              <div className="usa-grid-full" />
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
              <div className="export-button-container">
                <ExportButton />
              </div>
            </div>
          </div>
          <div className="usa-width-one-whole position-search--results">
            {
              getOverlay() ||
              <>
                <div className="usa-grid-full pr-table-container">
                  <div className="el-table ag-theme-alpine" style={{ width: '100%', flex: 1 }}>
                    <AgGridReact
                      domLayout="autoHeight"
                      columnDefs={headers}
                      rowData={rows}
                      singleClickEdit
                    />
                  </div>
                </div>
                <div className="usa-grid-full react-paginate">
                  <PaginationWrapper
                    pageSize={50}
                    forcePage={1}
                    totalResults={500}
                  />
                </div>
              </>
            }
          </div>
        </div>
      </>
  );
};

export default PanelRemarksTable;
