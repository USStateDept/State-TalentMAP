import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { entryLevelEdit } from 'actions/entryLevel';
import { format } from 'date-fns-v2';
import CheckboxRenderer from '../../AgGrid/CheckBoxRenderer';

const MaintainELPositionsTable = forwardRef(({ elPositions }, ref) => {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getGridRef: () => gridRef.current,
  }));

  const [headers] = useState([
    { field: 'EL', headerName: 'EL Managed', headerTooltip: 'This indicates EL Position', cellRenderer: CheckboxRenderer, width: 100 },
    { field: 'LNA', headerName: 'LNA', cellRenderer: CheckboxRenderer, width: 75 },
    { field: 'FICA', headerName: 'FICA', cellRenderer: CheckboxRenderer, width: 75 },
    { field: 'ELTOML', headerName: 'EL to ML OTO', cellRenderer: CheckboxRenderer, width: 100 },
    { field: 'MC', headerName: 'ML to EL OTO', cellRenderer: CheckboxRenderer, width: 100 },
    { field: 'MC_END_DATE', headerName: 'Cede End Date', type: 'customDate', cellEditor: 'agDateCellEditor', editable: params => params.data.MC === true, width: 125 },
    { field: 'BUREAU_SHORT_DESC', headerName: 'Bureau', width: 75 },
    { field: 'POS_OVERSEAS_DESC', headerName: 'Overseas / Domestic', width: 100 },
    { field: 'ORG_SHORT_DESC', headerName: 'Location / Org', width: 125 },
    { field: 'POS_NUM_TEXT', headerName: 'Position Number', width: 100 },
    { field: 'POS_SKILL_CODE', headerName: 'Skill', width: 75 },
    { field: 'POS_JOB_CATEGORY', headerName: 'Job Category', width: 100 },
    { field: 'POS_TITLE_DESC', headerName: 'Title', width: 200 },
    { field: 'POS_GRADE_CODE', headerName: 'Grade', width: 75 },
    { field: 'POS_POSITION_LANG_PROF_CODE', headerName: 'Languages', width: 175 },
    { field: 'INCUMBENT', headerName: 'Incumbent', width: 150 },
    { field: 'INCUMBENT_TED', headerName: 'Incumbent TED', type: 'customDate', width: 125 },
    { field: 'ASSIGNEE', headerName: 'Assignee', width: 150 },
    { field: 'ASSIGNEE_TED', headerName: 'Assignee TED', type: 'customDate', width: 125 },
  ]);

  const mapObjectToRow = (obj) => {
    const row = {
      POS_SEQ_NUM: obj.POS_SEQ_NUM,
      EL: obj.EL === 'true',
      LNA: obj.LNA === 'true',
      FICA: obj.FICA === 'true',
      ELTOML: obj.ELTOML === 'true',
      MC: obj.MC === 'true',
      MC_END_DATE: obj.mcEndDate ? new Date(obj.mcEndDate) : null,
      BUREAU_SHORT_DESC: obj.bureau,
      POS_OVERSEAS_DESC: obj.OD,
      ORG_SHORT_DESC: obj.org,
      POS_NUM_TEXT: obj.positionNumber,
      POS_SKILL_CODE: obj.skill,
      POS_JOB_CATEGORY: obj.jobCategory,
      POS_TITLE_DESC: obj.positionTitle,
      POS_GRADE_CODE: obj.grade,
      POS_POSITION_LANG_PROF_CODE: obj.languages,
      INCUMBENT: obj.incumbent,
      INCUMBENT_TED: obj.incumbentTED ? new Date(obj.incumbentTED) : null,
      ASSIGNEE: obj.assignee,
      ASSIGNEE_TED: obj.assigneeTED ? new Date(obj.assigneeTED) : null,
    };

    // Add unique IDs for checkbox cells only
    const checkboxFields = ['EL', 'LNA', 'FICA', 'ELTOML', 'MC'];
    headers.forEach(header => {
      if (checkboxFields.includes(header.field)) {
        row[`${header.field}_ID`] = `${obj.POS_SEQ_NUM}_${header.field}`;
      }
    });


    return row;
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (elPositions.length > 0) {
      const mappedRows = elPositions.map(mapObjectToRow);
      setRows(mappedRows);
    }
  }, [elPositions]);

  const defaultColDef = {
    sortable: false,
  };

  const columnTypes = {
    customDate: {
      extendsDataType: 'date',
      baseDataType: 'date',
      valueFormatter: params =>
        // convert to `mm/dd/yyyy`
        params.value == null
          ? ''
          : `${params.value.getMonth() + 1}/${params.value.getDate()}/${params.value.getFullYear()}`

      ,
    },
  };

  const onCellValueChanged = (params) => {
    // Grab the editable columns only
    const editedData = Object.fromEntries(Object.entries(params.data).slice(1, 7));
    // Convert MC_END_DATE to string
    if (editedData.MC_END_DATE) {
      editedData.MC_END_DATE = format(editedData.MC_END_DATE, 'MM/dd/yyyy');
    }
    // Convert checkboxes to strings
    Object.keys(editedData).forEach((key) => {
      if (typeof editedData[key] === 'boolean') {
        editedData[key] = editedData[key].toString();
      }
    });
    // Add seqnum to the edited data, wrap in array for API
    const data = [{
      POS_SEQ_NUM: params.data.POS_SEQ_NUM,
      ...editedData,
    }];
    dispatch(entryLevelEdit(data));
  };

  const csvExportParams = {
    fileName: 'Entry_Level_Positions_Export.csv',
  };

  return (
    <div className="el-table ag-theme-quartz" style={{ height: 475, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={headers}
        rowData={rows}
        onCellValueChanged={onCellValueChanged}
        columnTypes={columnTypes}
        defaultColDef={defaultColDef}
        defaultCsvExportParams={csvExportParams}
        singleClickEdit
      />
    </div>
  );
});

MaintainELPositionsTable.propTypes = {
  elPositions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MaintainELPositionsTable;
