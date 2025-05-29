import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import noDataAvailableImg from "../../../assets/images/no-data-available.png";
import "./DataTable.scss";

const NoRowsOverlay = () => {
  return (
    <div className="h-full top-[64px] relative flex justify-center items-center">
      <img
        src={noDataAvailableImg}
        alt="No Data Available"
        className="w-[60%]"
      />
    </div>
  );
};

const DataTable = ({
  data = [],
  cols = [],
  tableProps = {},
  initialState = {},
  onCellClick = () => {},
}) => {
  return (
    <DataGrid
      rows={data}
      columns={cols}
      columnVisibilityModel={{ id: false }}
      slots={{ noRowsOverlay: NoRowsOverlay }}
      initialState={initialState}
      pageSizeOptions={[5, 10]}
      onCellClick={onCellClick}
      className="data-table min-h-[8rem] mobile:text-[12px] mx-[4rem] mobile:mx-1 bg-[#fff]"
      {...tableProps}
    />
  );
};
export default DataTable;
