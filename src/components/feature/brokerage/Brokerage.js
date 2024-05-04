import { Button } from "@mui/material";
import DataTable from "../../common/DataTable/DataTable";
import { useState } from "react";
import { borkerageCols } from "./brokerageCols";
import { AMOUNT_PAID } from "../../../constants/common";

const Brokerage = ({ data = [], handlePayoutEvent = () => {} }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleGetSelectedRows = (rowsIds) => {
    setSelectedRows(rowsIds);
  };
  return (
    <div className="bg-[#fff] w-1/2 rounded-md overflow-auto p-4 mobile:w-full">
      <strong
        className="text-primary text-[24px] underline decoration-2 mobile:text-[18px]"
        style={{ textUnderlineOffset: "10px" }}
      >
        Brokerage
      </strong>
      <div style={{ height: "75%", width: "100%", marginTop: "32px" }}>
        <DataTable
          cols={borkerageCols}
          data={data}
          checkboxSelection={true}
          getSelectedRows={handleGetSelectedRows}
          rowSelectionModel={selectedRows}
          tableProps={{
            isRowSelectable: (params) =>
              params.row.status !== AMOUNT_PAID.PENDING,
          }}
        />
      </div>
      <div className="flex gap-2 mt-6">
        <Button
          variant="outlined"
          className="border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[12px] mobile:h-[30px]"
          disabled={!selectedRows?.length}
          onClick={() => {
            setSelectedRows([]);
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          className="bg-primary hover:bg-primary mobile:text-[12px] mobile:h-[30px]"
          disabled={!selectedRows?.length}
          onClick={() => handlePayoutEvent(selectedRows)}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};
export default Brokerage;
