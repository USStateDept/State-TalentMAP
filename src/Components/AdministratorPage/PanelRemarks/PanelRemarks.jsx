import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { Tab, Tabs, TabPanel } from 'react-tabs';
// eslint-disable-next-line import/no-unresolved
// import { Tabs } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import { AgGridReact } from 'ag-grid-react';
import Spinner from 'Components/Spinner';
// import ExportButton from 'Components/ExportButton';
// import PaginationWrapper from 'Components/PaginationWrapper';
import TabbedCard from 'Components/TabbedCard';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import TotalResults from '../../TotalResults';
// import { set } from 'lodash';


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
  {
    Category: 'Category 3',
    Description: 'Description 3',
    ShortDesc: 'Short Desc 3',
    Order: 'Order 3',
    Active: 'Active 3',
    Excl: 'Excl 3',
  },
  {
    Category: 'Category 4',
    Description: 'Description 4',
    ShortDesc: 'Short Desc 4',
    Order: 'Order 4',
    Active: 'Active 4',
    Excl: 'Excl 4',
  },
  {
    Category: 'Category 5',
    Description: 'Description 5',
    ShortDesc: 'Short Desc 5',
    Order: 'Order 5',
    Active: 'Active 5',
    Excl: 'Excl 5',
  },
  {
    Category: 'Category 6',
    Description: 'Description 6',
    ShortDesc: 'Short Desc 6',
    Order: 'Order 6',
    Active: 'Active 6',
    Excl: 'Excl 6',
  },
  {
    Category: 'Category 7',
    Description: 'Description 7',
    ShortDesc: 'Short Desc 7',
    Order: 'Order 7',
    Active: 'Active 7',
    Excl: 'Excl 7',
  },
  {
    Category: 'Category 8',
    Description: 'Description 8',
    ShortDesc: 'Short Desc 8',
    Order: 'Order 8',
    Active: 'Active 8',
    Excl: 'Excl 8',
  },
  {
    Category: 'Category 9',
    Description: 'Description 9',
    ShortDesc: 'Short Desc 9',
    Order: 'Order 9',
    Active: 'Active 9',
    Excl: 'Excl 9',
  },
  {
    Category: 'Category 10',
    Description: 'Description 10',
    ShortDesc: 'Short Desc 10',
    Order: 'Order 10',
    Active: 'Active 10',
    Excl: 'Excl 10',
  },
  // adding 10 more rows to test the pagination
  {
    Category: 'Category 11',
    Description: 'Description 11',
    ShortDesc: 'Short Desc 11',
    Order: 'Order 11',
    Active: 'Active 11',
    Excl: 'Excl 11',
  },
  {
    Category: 'Category 12',
    Description: 'Description 12',
    ShortDesc: 'Short Desc 12',
    Order: 'Order 12',
    Active: 'Active 12',
    Excl: 'Excl 12',
  },
  {
    Category: 'Category 13',
    Description: 'Description 13',
    ShortDesc: 'Short Desc 13',
    Order: 'Order 13',
    Active: 'Active 13',
    Excl: 'Excl 13',
  },
  {
    Category: 'Category 14',
    Description: 'Description 14',
    ShortDesc: 'Short Desc 14',
    Order: 'Order 14',
    Active: 'Active 14',
    Excl: 'Excl 14',
  },
  {
    Category: 'Category 15',
    Description: 'Description 15',
    ShortDesc: 'Short Desc 15',
    Order: 'Order 15',
    Active: 'Active 15',
    Excl: 'Excl 15',
  },
  {
    Category: 'Category 16',
    Description: 'Description 16',
    ShortDesc: 'Short Desc 16',
    Order: 'Order 16',
    Active: 'Active 16',
    Excl: 'Excl 16',
  },
  {
    Category: 'Category 17',
    Description: 'Description 17',
    ShortDesc: 'Short Desc 17',
    Order: 'Order 17',
    Active: 'Active 17',
    Excl: 'Excl 17',
  },
  {
    Category: 'Category 18',
    Description: 'Description 18',
    ShortDesc: 'Short Desc 18',
    Order: 'Order 18',
    Active: 'Active 18',
    Excl: 'Excl 18',
  },
  {
    Category: 'Category 19',
    Description: 'Description 19',
    ShortDesc: 'Short Desc 19',
    Order: 'Order 19',
    Active: 'Active 19',
    Excl: 'Excl 19',
  },
  {
    Category: 'Category 20',
    Description: 'Description 20',
    ShortDesc: 'Short Desc 20',
    Order: 'Order 20',
    Active: 'Active 20',
    Excl: 'Excl 20',
  },
  {
    Category: 'Category 21',
    Description: 'Description 21',
    ShortDesc: 'Short Desc 21',
    Order: 'Order 21',
    Active: 'Active 21',
    Excl: 'Excl 21',
  },
  {
    Category: 'Category 22',
    Description: 'Description 22',
    ShortDesc: 'Short Desc 22',
    Order: 'Order 22',
    Active: 'Active 22',
    Excl: 'Excl 22',
  },
  {
    Category: 'Category 23',
    Description: 'Description 23',
    ShortDesc: 'Short Desc 23',
    Order: 'Order 23',
    Active: 'Active 23',
    Excl: 'Excl 23',
  },
  {
    Category: 'Category 24',
    Description: 'Description 24',
    ShortDesc: 'Short Desc 24',
    Order: 'Order 24',
    Active: 'Active 24',
    Excl: 'Excl 24',
  },
  {
    Category: 'Category 25',
    Description: 'Description 25',
    ShortDesc: 'Short Desc 25',
    Order: 'Order 25',
    Active: 'Active 25',
    Excl: 'Excl 25',
  },
];

const remarks_category_data = [
  {
    categoryCode: 'A',
    categoryText: 'Category A',
    categoryDesc: 'Category A Description',
  },
  {
    categoryCode: 'B',
    categoryText: 'Category B',
    categoryDesc: 'Category B Description',
  },
  {
    categoryCode: 'C',
    categoryText: 'Category C',
    categoryDesc: 'Category C Description',
  },
  {
    categoryCode: 'D',
    categoryText: 'Category D',
    categoryDesc: 'Category D Description',
  },
  {
    categoryCode: 'E',
    categoryText: 'Category E',
    categoryDesc: 'Category E Description',
  },
  {
    categoryCode: 'F',
    categoryText: 'Category F',
    categoryDesc: 'Category F Description',
  },
  {
    categoryCode: 'G',
    categoryText: 'Category G',
    categoryDesc: 'Category G Description',
  },
  {
    categoryCode: 'H',
    categoryText: 'Category H',
    categoryDesc: 'Category H Description',
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

  // creating headers for the Remark Category table:
  const [categoryHeaders] = useState([
    { field: 'categoryCode', headerName: 'Category Code', flex: 1 },
    { field: 'categoryText', headerName: 'Category Text', flex: 1 },
    { field: 'categoryDesc', headerName: 'Category Description', flex: 1 },
  ]);

  const [panelRemarksRows, setPanelRemarksRows] = useState([]);
  const [remarkCategoriesRows, setRemarkCategoriesRows] = useState([]);

  // used temporarily to test the table and add dummy data defined above
  useEffect(() => {
    if (panel_remarks_test_data.length > 0) {
      setPanelRemarksRows(panel_remarks_test_data);
    }
  }, []);

  // used temporarily to test the table and add dummy data in Remarks Ctegory defined above
  useEffect(() => {
    if (remarks_category_data.length > 0) {
      setRemarkCategoriesRows(remarks_category_data);
    }
  }, []);

  const prFiltersIsLoading = useSelector(state => state.panelRemarksFiltersFetchDataLoading);

  const isLoading = prFiltersIsLoading;
  const [setPrintView] = useState(false);
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
              <div className="print-view-total-results">
                {/* This will be replaced with a function call to get total no of remarks later */}
                {100} remarks
              </div>
              {<button onClick={() => setPrintView(true)} disabled={isLoading}> Print </button>}
            </div>
          </div>
          <div className="usa-width-one-whole position-search--results">
            {
              getOverlay() ||
              <>
                <div className="usa-grid-full pr-table-container">
                  <div className="pr-table ag-theme-alpine" style={{ width: '100%' }}>
                    {/* adding TabbedCard components here. One tab called "Panel Remarks" and another called "Panel Remarks History" */}
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
                      {
                        text: 'Remarks Categories',
                        value: 'CATEGORIES',
                        content: <AgGridReact
                          domLayout="autoHeight"
                          columnDefs={categoryHeaders}
                          rowData={remarkCategoriesRows}
                          singleClickEdit
                        />,
                      },
                      ]}
                    />
                  </div>
                </div>
                {/* <div className="usa-grid-full react-paginate">
                  <PaginationWrapper
                    pageSize={50}
                    forcePage={1}
                    totalResults={500}
                  />
                </div> */}
              </>
            }
          </div>
        </div>
      </>
  );
};

export default PanelRemarksTable;
