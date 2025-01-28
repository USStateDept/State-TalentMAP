import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import TotalResults from '../../TotalResults';

// function to generate test data for the Panel Remarks table
// this will be deleted in the future and replaced with actual data from API calls.
// For now, this is used to test the table and showcase what it will look like with real data.
const generatePanelRemarksTestData = (count) => {
  const data = [];
  const categories = ['Bid List', 'Tandem', 'Training', 'SIP Remarks'];
  // eslint-disable-next-line no-loops/no-loops
  for (let i = 1; i <= count; i += 1) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    data.push({
      Category: randomCategory,
      Description: `Description ${i}`,
      ShortDesc: `Short Desc ${i}`,
      Order: `Order ${i}`,
      Active: i % 3 === 0 ? 'N' : 'Y',
      Excl: `Excl ${i}`,
    });
  }
  return data;
};

// Temporary test data for the Panel Remarks table.
// Will be replaced with actual data from the API calls later.
const panel_remarks_test_data = generatePanelRemarksTestData(55);


const PanelRemarksTable = () => {
  const [textSearch, setTextSearch] = useState('');
  const textSearchRef = useRef();

  const [headers] = useState([
    { field: 'Category', headerName: 'Category', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 1 },
    { field: 'ShortDesc', headerName: 'Short Desc.', flex: 1 },
    { field: 'Order', headerName: 'Order', flex: 1 },
    { field: 'Active', headerName: 'Active', flex: 1 },
    { field: 'Excl', headerName: 'Mutually Exclusive', flex: 1 },
  ]);

  const [panelRemarksRows, setPanelRemarksRows] = useState([]);

  // used temporarily to test the table and add dummy data defined above
  useEffect(() => {
    if (panel_remarks_test_data.length > 0) {
      setPanelRemarksRows(panel_remarks_test_data);
    }
  }, []);

  const prFiltersIsLoading = useSelector(state => state.panelRemarksFiltersFetchDataLoading);

  const isLoading = prFiltersIsLoading;
  const [setPrintView] = useState(false);

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
              {<button onClick={() => setPrintView(true)} disabled={isLoading}> Print </button>}
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

export default PanelRemarksTable;
