import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./DataTable.scss";

const NoRowsOverlay = () => {
  return <span>No Data</span>;
};

const DataTable = ({
  data = [],
  cols = [],
  checkboxSelection = false,
  getSelectedRows = () => {},
  rowSelectionModel = [],
}) => {
  return (
    <DataGrid
      rows={data}
      columns={cols}
      columnVisibilityModel={{ id: false }}
      slots={{ noRowsOverlay: NoRowsOverlay }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection={checkboxSelection}
      onRowSelectionModelChange={getSelectedRows}
      rowSelectionModel={rowSelectionModel}
      className="data-table"
    />
  );
};
export default DataTable;
