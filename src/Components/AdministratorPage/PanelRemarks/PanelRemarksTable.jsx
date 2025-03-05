import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from 'ag-grid-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonRenderer from 'Components/AgGrid/ButtonRederer';
import { updatePanelRemarksData } from 'actions/panelRemarks';

const PanelRemarksTable = forwardRef(({ panelRemarks, openForm }, ref) => {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getGridRef: () => gridRef.current,
  }));

  const [headers] = useState([
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'rmrktext', headerName: 'Description', flex: 1, editable: true },
    { field: 'rmrkshortdesctext', headerName: 'Short Desc.', flex: 1, editable: true },
    { field: 'rmrkordernum', headerName: 'Order', flex: 1, editable: true },
    { field: 'rmrkactiveind', headerName: 'Active', flex: 1, editable: true },
    { field: 'rmrkmutuallyexclusiveind', headerName: 'Mutually Exclusive', flex: 1, editable: true },
    {
      field: 'edit',
      headerName: 'Edit',
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        className: 'pr-button',
        onClick: (remarkData) => { openForm('edit', remarkData); },
        icon: faPen,
      },
      flex: 0.5,
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
      rmrkactiveind: obj.rmrkactiveind,
      rmrkmutuallyexclusiveind: obj.rmrkmutuallyexclusiveind,
      rmrkrccode: obj.rmrkrccode,
      rmrkcreatedate: obj.rmrkcreatedate,
      rmrkcreateid: obj.rmrkcreateid,
      rmrkupdatedate: obj.rmrkupdatedate,
      rmrkupdateid: obj.rmrkupdateid,
      RemarkInserts: obj.RemarkInserts,
    };

    return row;
  };

  useEffect(() => {
    if (panelRemarks && panelRemarks.length > 0) {
      const mappedRows = panelRemarks.map(mapObjectToRow);
      setPanelRemarksRows(mappedRows);
    }
  }, [panelRemarks]);

  // Edit a remark within table
  const onCellValueChanged = (params) => {
    // Grab data from the editable columns and update date
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
    dispatch(updatePanelRemarksData(data));
  };

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
  openForm: PropTypes.func.isRequired,
};

export default PanelRemarksTable;
