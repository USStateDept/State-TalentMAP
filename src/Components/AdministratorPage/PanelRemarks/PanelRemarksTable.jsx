import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonRenderer from 'Components/AgGrid/ButtonRederer';
import { editPanelRemark } from 'actions/panelRemarks';
import CheckboxRenderer from 'Components/AgGrid/CheckBoxRenderer';
import { validateInsertions } from '.';
import { toastWarning } from '../../../actions/toast';

const PanelRemarksTable = forwardRef(({ panelRemarks, fetchData, openForm }, ref) => {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const fetchRemarksLoading = useSelector((state) => state.panelRemarksFetchDataLoading);
  const editRemarkLoading = useSelector((state) => state.panelRemarksEditLoading);
  const editRemarkSuccess = useSelector((state) => state.panelRemarksEditSuccess);
  const isLoading = fetchRemarksLoading || editRemarkLoading;

  useImperativeHandle(ref, () => ({
    getGridRef: () => gridRef.current,
  }));

  const [headers] = useState([
    { field: 'category', headerName: 'Category', maxWidth: 200, flex: 1 },
    { field: 'rmrktext', headerName: 'Description', flex: 1, editable: true },
    { field: 'rmrkshortdesctext', headerName: 'Short Desc.', flex: 1, editable: true },
    { field: 'rmrkordernum', headerName: 'Order', cellStyle: { textAlign: 'center' }, width: 75, editable: true },
    { field: 'rmrkactiveind', headerName: 'Active', cellRenderer: CheckboxRenderer, cellRendererParams: { small: true }, cellStyle: { textAlign: 'center' }, width: 75 },
    { field: 'rmrkmutuallyexclusiveind', headerName: 'Mutually Exclusive', cellRenderer: CheckboxRenderer, cellRendererParams: { small: true }, cellStyle: { textAlign: 'center' }, width: 100 },
    {
      field: 'edit',
      headerName: 'Edit',
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        className: 'pr-button',
        onClick: (remarkData) => { openForm('edit', remarkData); },
        icon: faPen,
      },
      cellStyle: { textAlign: 'center' },
      width: 75,
    },
  ]);

  const [panelRemarksRows, setPanelRemarksRows] = useState([]);

  // Mapping the object to the row for when the data is fetched
  const mapObjectToRow = (obj) => {
    const row = {
      rmrkseqnum: obj.rmrkseqnum,
      category: obj.category,
      rmrktext: obj.rmrktext,
      rmrkshortdesctext: obj.rmrkshortdesctext,
      rmrkordernum: obj.rmrkordernum,
      rmrkactiveind: obj.rmrkactiveind === 'Y',
      rmrkmutuallyexclusiveind: obj.rmrkmutuallyexclusiveind === 'Y',
      rmrkrccode: obj.rmrkrccode,
      rmrkcreatedate: obj.rmrkcreatedate,
      rmrkcreateid: obj.rmrkcreateid,
      rmrkupdatedate: obj.rmrkupdatedate,
      rmrkupdateid: obj.rmrkupdateid,
      RemarkInserts: obj.RemarkInserts,
    };

    // Add unique IDs for checkbox cells
    const checkboxFields = ['rmrkactiveind', 'rmrkmutuallyexclusiveind'];
    headers.forEach(header => {
      if (checkboxFields.includes(header.field)) {
        row[`${header.field}_ID`] = `${obj.rmrkseqnum}_${header.field}`;
      }
    });

    return row;
  };

  useEffect(() => {
    // Load the data into the table when it is fetched
    if (panelRemarks && panelRemarks.length > 0) {
      const mappedRows = panelRemarks.map(mapObjectToRow);
      setPanelRemarksRows(mappedRows);
    } else {
      setPanelRemarksRows([]);
    }
  }, [panelRemarks]);

  // Validate the changes made to the table
  const validateChanges = (data) => {
    console.log(data);
    // Check if fields are empty
    if (!data.rmrktext || !data.rmrkshortdesctext) {
      const title = 'Cannot Submit Form';
      const message = 'Description and Short Description fields cannot be empty';
      dispatch(toastWarning(message, title));
      return false;
    }
    // Check if all insertions are valid
    const missingInsertions = validateInsertions(data.rmrktext, data.RemarkInserts);
    if (missingInsertions.length > 0) {
      const title = 'Cannot Submit Form';
      const message = `Missing insertions: ${missingInsertions.join(', ')}`;
      dispatch(toastWarning(message, title));
      // Reset the text to the original value
      fetchData();
      return false;
    }
    // Check if order num is between 0 and 99
    if (data.rmrkordernum < 0 || data.rmrkordernum > 99) {
      const title = 'Cannot Submit Form';
      const message = 'Order number must be between 0 and 99';
      dispatch(toastWarning(message, title));
      return false;
    }
    return true;
  };

  // Edit a remark within table
  const onCellValueChanged = (params) => {
    // Validate changes
    if (!validateChanges(params.data)) {
      return;
    }

    const data = {
      rmrkseqnum: params.data.rmrkseqnum,
      rmrkrccode: params.data.rmrkrccode,
      rmrkordernum: params.data.rmrkordernum,
      rmrkshortdesctext: params.data.rmrkshortdesctext,
      rmrkmutuallyexclusiveind: params.data.rmrkmutuallyexclusiveind,
      rmrktext: params.data.rmrktext,
      rmrkactiveind: params.data.rmrkactiveind,
      rmrkupdatedate: params.data.rmrkupdatedate,
    };
    dispatch(editPanelRemark(data));
  };

  useEffect(() => {
    // If the edit was successful, refresh the data
    if (editRemarkSuccess) {
      fetchData();
    }
  }
  , [editRemarkSuccess]);

  useEffect(() => {
    // Show or hide the loading overlay based on the loading state
    if (gridRef.current && gridRef.current.api) {
      if (isLoading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [isLoading]);

  return (
    <div className="pr-table ag-theme-quartz" style={{ width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        domLayout="autoHeight"
        columnDefs={headers}
        rowData={panelRemarksRows}
        onCellValueChanged={onCellValueChanged}
        singleClickEdit
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
      />
    </div>
  );
});

PanelRemarksTable.propTypes = {
  panelRemarks: PropTypes.arrayOf(PropTypes.shape({
    rmrkseqnum: PropTypes.number,
    category: PropTypes.string,
    rmrktext: PropTypes.string,
    rmrkshortdesctext: PropTypes.string,
    rmrkordernum: PropTypes.number,
    rmrkactiveind: PropTypes.string,
    rmrkmutuallyexclusiveind: PropTypes.string,
  })).isRequired,
  fetchData: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
};

export default PanelRemarksTable;
