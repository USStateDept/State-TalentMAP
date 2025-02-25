import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const PanelRemarksTable = forwardRef(({ panelRemarks, openForm }, ref) => {
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getGridRef: () => gridRef.current,
  }));

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
        <button onClick={() => openForm('edit', params)} className="pr-row-edit-icon-button">
          <FontAwesomeIcon icon={faPen} />
        </button>
      ),
      flex: 0.5,
    },
  ]);

  const [panelRemarksRows, setPanelRemarksRows] = useState([]);

  const mapObjectToRow = (obj) => {
    const row = {
      rmrkseqnum: obj.rmrkseqnum,
      Category: obj.category,
      Description: obj.rmrktext,
      ShortDesc: obj.rmrkshortdesctext,
      Order: obj.rmrkordernum,
      Active: obj.rmrkactiveind,
      Excl: obj.rmrkmutuallyexclusiveind,
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
    // Logic for editing a cell
    console.log('Cell value changed: ', params);
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
