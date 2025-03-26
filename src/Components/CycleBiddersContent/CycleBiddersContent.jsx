import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDidMountEffect } from 'hooks';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import CheckboxRenderer from 'Components/AgGrid/CheckBoxRenderer';
import PropTypes from 'prop-types';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { formatDate, formatLanguages } from 'utilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassifications } from 'actions/classifications';

const CycleBiddersContent = ({ bidders, biddersIsLoading, biddersHasErrored, position }) => {
  const dispatch = useDispatch();
  const classificationsRef = useSelector(state => state.classifications);
  console.log('classificationsRef', classificationsRef);
  const [count, setCount] = useState(0);

  // Maps user classifications to classification reference
  const getClassificationText = (userClassifications, classificationRef) => {
    console.log(`userClass: ${userClassifications}`);
    // Filter the classificationRef to find matches based on userClassifications
    const matchedClassifications = classificationRef.filter(ref =>
      ref.seasons.some(season => userClassifications.some(user => user.id === season.id)),
    );
    console.log(matchedClassifications);

    // If no matches are found, return 'None Listed'
    if (matchedClassifications.length === 0) {
      return DEFAULT_TEXT;
    }

    // Extract the text keys from the matched classifications and join them into a single string
    return matchedClassifications.map(ref => ref.text).join(', ');
  };

  const sections = {
    subheading: [
      { Cycle: position.bid_cycle },
      { 'Position Number': position.position_number || '' },
      { 'Position Title': position.title || '' },
      { Skill: `${position.skill_desc} (${position.skill_code})` || DEFAULT_TEXT },
    ],
    bodyPrimary: [
      { 'Cycle Position Status': position.status || DEFAULT_TEXT },
      { 'Location/Org': `${position.org_desc || DEFAULT_TEXT} ${position.org_code ? `(${position.org_code})` : ''}` },
      { 'PP/Grade': `${position.pay_plan || DEFAULT_TEXT}/${position.grade || DEFAULT_TEXT}` },
      { Language: position.languages || DEFAULT_TEXT },
      { 'Critical Need': position.crit_need_flag || DEFAULT_TEXT },
      { Posted: position.posted_date_formatted || DEFAULT_TEXT },
      { Incumbent: position.incumbent_name || DEFAULT_TEXT },
      { 'Incumbent Status': position.asm_status || DEFAULT_TEXT },
      { 'Incumbent TED': position.ted || DEFAULT_TEXT },
    ],
  };

  const [headers] = useState([
    { field: 'name', headerName: 'Bidder(s)', flex: 1 },
    { field: 'status', headerName: 'Bidder Status', flex: 1 },
    { field: 'pp_grade', headerName: 'PP/Grade', flex: 1 },
    { field: 'skill', headerName: 'Skill', flex: 1 },
    { field: 'locationOrg', headerName: 'Location/Org', flex: 1 },
    { field: 'language', headerName: 'Language(s)', flex: 1 },
    { field: 'classification', headerName: 'Classification', flex: 1 },
    { field: 'ted', headerName: 'TED', flex: 1 },
    { field: 'bidSubmitDate', headerName: 'Bid Date', flex: 1 },
    { field: 'panel', headerName: 'Panel', cellRenderer: CheckboxRenderer, cellRendererParams: { disabled: true }, flex: 1 },
  ]);

  const mapObjectToRow = (obj) => {
    console.log(obj);
    const row = {
      name: obj.name,
      status: obj.status || DEFAULT_TEXT,
      pp_grade: `${obj.per_pay_plan_code || DEFAULT_TEXT}/${obj.grade || DEFAULT_TEXT}`,
      skill: obj.skill || DEFAULT_TEXT,
      locationOrg: `${obj.org || DEFAULT_TEXT} ${obj.org_code ? `(${obj.org_code})` : ''}`,
      language: formatLanguages(obj.languages, 'lang_code') || DEFAULT_TEXT,
      classification: getClassificationText(obj.classifications, classificationsRef),
      ted: formatDate(obj.ted) || DEFAULT_TEXT,
      bidSubmitDate: formatDate(obj.submitted_date) || DEFAULT_TEXT,
      panel: false,
    };

    // Add unique IDs for checkbox cells only
    const checkboxFields = ['panel'];
    headers.forEach(header => {
      if (checkboxFields.includes(header.field)) {
        row[`${header.field}_ID`] = `${header.field}_${obj.perdet_seq_num}`;
      }
    });

    return row;
  };

  const [rows, setRows] = useState(null); // has to be set to null for loading overlay to work

  useEffect(() => {
    dispatch(fetchClassifications());
  }, []);

  useEffect(() => {
    // update count
    setCount(bidders.length);
  }, [bidders]);

  useDidMountEffect(() => {
    // update table rows
    if (count.current !== 0 && !biddersIsLoading && !biddersHasErrored) {
      const mappedRows = bidders.map(mapObjectToRow);
      setRows(mappedRows);
    } else if (count.current === 0 && !biddersIsLoading) {
      // if no bidders, set rows to empty array
      setRows([]);
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
            loading={biddersIsLoading}
          />
        </div>
      </>
    </div>
  );
};
CycleBiddersContent.propTypes = {
  bidders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  biddersIsLoading: PropTypes.bool.isRequired,
  biddersHasErrored: PropTypes.bool.isRequired,
  position: POSITION_DETAILS.isRequired,
};

export default CycleBiddersContent;
