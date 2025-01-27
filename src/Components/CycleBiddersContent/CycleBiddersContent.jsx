import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { bureauBidsFetchData } from 'actions/bureauPositionBids';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import CheckboxRenderer from 'Components/AgGrid/CheckBoxRenderer';

const CycleBiddersContent = ({ position }) => {
  const dispatch = useDispatch();
  const bidders = useSelector(state => state.bureauPositionBids);
  const biddersIsLoading = useSelector(state => state.bureauPositionBidsIsLoading);
  const biddersHasErrored = useSelector(state => state.bureauPositionBidsHasErrored);
  const [count, setCount] = useState(bidders.length);

  const sections = {
    subheading: [
      { Cycle: position.bid_cycle },
      { 'Position Number': position.position_number },
      { 'Position Title': position.title },
      { Skill: `${position.skill_desc} (${position.skill_code})` },
    ],
    bodyPrimary: [
      { 'Cycle Position Status': position.status },
      { 'Location/Org': `${position.org_desc} (${position.org_code})` },
      { Grade: position.grade },
      { Language: position.languages },
      { 'Critical Need': position.crit_need_flag },
      { Posted: position.posted_date_formatted },
      { Incumbent: position.incumbent_name },
      { 'Incumbent Status': 'Status' },
      { 'Incumbent TED': 'MM/DD/YYYY' },
    ],
  };

  const [headers] = useState([
    { field: 'name', headerName: 'Bidder(s)', flex: 1 },
    { field: 'status', headerName: 'Bidder Status', flex: 1 },
    { field: 'grade', headerName: 'Grade', flex: 1 },
    { field: 'skill', headerName: 'Skill', flex: 1 },
    { field: 'locationOrg', headerName: 'Location/Org', flex: 1 },
    { field: 'language', headerName: 'Language', flex: 1 },
    { field: 'classification', headerName: 'Classification', flex: 1 },
    { field: 'ted', headerName: 'TED', flex: 1 },
    { field: 'bidSubmitDate', headerName: 'Bid Date', flex: 1 },
    { field: 'panel', headerName: 'Panel', cellRenderer: CheckboxRenderer, cellRendererParams: { disabled: true }, flex: 1 },
  ]);

  const mapObjectToRow = (obj) => {
    const row = {
      name: obj.name,
      status: obj.status,
      grade: obj.grade,
      skill: obj.skill,
      locationOrg: obj.location,
      language: obj.language,
      classification: obj.classifications,
      ted: obj.ted,
      bidSubmitDate: obj.submitted_date,
      panel: false,
    };
    return row;
  };

  const [rows, setRows] = useState(null); // has to be set to null for loading overlay to work

  useEffect(() => {
    // fetch bid data
    console.log(position);
    const id = '1756'; // position.id;
    const query = {};
    dispatch(bureauBidsFetchData(id, query));
  }, []);

  useEffect(() => {
    // update count
    setCount(bidders.length);
  }, [bidders]);

  useEffect(() => {
    // update table rows
    if (count !== 0 && !biddersIsLoading && !biddersHasErrored) {
      const mappedRows = bidders.map(mapObjectToRow);
      setRows(mappedRows);
    }
  }, [biddersIsLoading]);

  const defaultColDef = {
    sortable: false,
  };

  return (
    <div>
      <PositionExpandableContent sections={sections} tempHideEdit />
      <>
        <div className="cm-bidder-table ag-theme-quartz" style={{ width: '100%' }}>
          <AgGridReact
            domLayout="autoHeight"
            defaultColDef={defaultColDef}
            columnDefs={headers}
            rowData={rows}
            loading={count === 0 && biddersIsLoading}
          />
        </div>
      </>
    </div>
  );
};
CycleBiddersContent.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default CycleBiddersContent;
