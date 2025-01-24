import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import Spinner from 'Components/Spinner';
import ExportButton from 'Components/ExportButton';
import PaginationWrapper from 'Components/PaginationWrapper';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import Alert from 'Components/Alert';
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
  // const [, setPage] = useState(userSelections?.page || 1);

  const [headers] = useState([
    { field: 'Category', headerName: 'Category', width: 200 },
    { field: 'Description', headerName: 'Description', width: 200 },
    { field: 'ShortDesc', headerName: 'Short Desc', width: 200 },
    { field: 'Order', headerName: 'Order', width: 100 },
    { field: 'Active', headerName: 'Active?', width: 100 },
    { field: 'Excl', headerName: 'Excl?', width: 100 },
  ]);

  // const columns = [
  //   { field: 'Category', headerName: 'Category', width: 150 },
  //   { field: 'Description', headerName: 'Description', width: 200 },
  //   { field: 'ShortDesc', headerName: 'Short Desc', width: 200 },
  //   { field: 'Order', headerName: 'Order', width: 100 },
  //   { field: 'Active', headerName: 'Active?', width: 100 },
  //   { field: 'Excl', headerName: 'Excl?', width: 100 },
  // ];

  // const mapObjectToRow = (obj) => {
  //   const row = {
  //     Category: obj.CATEGORY,
  //     Description: obj.DESCRIPTION,
  //     ShortDesc: obj.SHORT_DESC,
  //     Order: obj.ORDER,
  //     Active: obj.ACTIVE,
  //     Excl: obj.EXCL,
  //   };

  //   return row;
  // };

  // const [rows, setRows] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (panel_remarks_test_data.length > 0) {
      // const mappedRows = elPositions.map(mapObjectToRow);
      setRows(panel_remarks_test_data);
    }
  }, []);

  // const defaultColDef = {
  //   sortable: false,
  // };

  // const columnTypes = {
  //   customDate: {
  //     extendsDataType: 'date',
  //     baseDataType: 'date',
  //     valueFormatter: params =>
  //       // convert to `mm/dd/yyyy`
  //       params.value == null
  //         ? ''
  //         : `${params.value.getMonth() + 1}/${params.value.getDate()}/${params.value.getFullYear()}`

  //     ,
  //   },
  // };

  const prFiltersIsLoading = useSelector(state => state.panelRemarksFiltersFetchDataLoading);

  const isLoading = prFiltersIsLoading;
  // const getOverlay = () => {
  //   let toReturn;
  //   if (prFiltersIsLoading) {
  //     toReturn = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
  //   } else if (panelRemarksHasErrored || prFiltersHasErrored) {
  //     toReturn = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
  //   } else if (count === 0) {
  //     toReturn = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
  //   }
  //   if (toReturn) {
  //     return <div className="usa-width-one-whole empl-search-lower-section results-dropdown">{toReturn}</div>;
  //   }
  //   return false;
  // };

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
                total={100} // count
                pageNumber={5} // page
                pageSize={5} // limit
                suffix="Results"
              // isHidden={elPositionsIsLoading}
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
                  <div className="el-table ag-theme-alpine" style={{ width: '100%' }}>
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
                    pageSize={100} // limit
                    // onPageChange={p => setPage(p.page)}
                    forcePage={1} // page
                    totalResults={500} // count
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
