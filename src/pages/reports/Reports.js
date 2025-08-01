import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { reportsCols } from "./ReportsCols";
import { pdf } from "@react-pdf/renderer";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { MONTH_FULL_NAMES, MONTH_NAMES, YEARS } from "../../constants/common";
import { convertDDOptions } from "../../utils/helperFunction";
import { getSellsReportsData } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import { Button } from "@mui/material";
import ReportPdf from "../../components/feature/gen-pdf/ReportPdf";
import DataTable from "../../components/common/DataTable/DataTable";
import { mkConfig, generateCsv, download } from "export-to-csv";

const monthsDDOptions = convertDDOptions(MONTH_NAMES);
const yearsDDOptions = convertDDOptions(YEARS);
const Reports = () => {
  const { sellsReportsData } = useSelector((state) => state.api);
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    month: monthsDDOptions[0].value,
    year: yearsDDOptions[2].value,
  });
  const reportTitle = `${MONTH_FULL_NAMES[filter.month]} ${filter.year}`;

  useEffect(() => {
    if (!sellsReportsData) {
      getReports(filter);
    }
    if (sellsReportsData?.length) {
      const updatedReports = sellsReportsData?.map((data) => {
        return {
          ...data,
          sgst: data?.sgst ? data?.gstAmount / 2 : null,
          cgst: data?.sgst ? data?.gstAmount / 2 : null,
          igst: data?.igst ? data?.gstAmount : null,
          totalAmount: data?.otherExpensesGST
            ? data?.amount + data?.gstAmount + data?.otherExpensesGST
            : data?.amount + data?.gstAmount,
        };
      });
      setReportsData(updatedReports);
    }
  }, [sellsReportsData]);

  const getReports = (value) => {
    dispatch(
      getSellsReportsData({
        method: "get",
        endpoint: API_ENDPOINTS.getSellsReportsData,
        payload: value,
      })
    );
  };

  const handleOnChangeMonth = (e) => {
    const value = { ...filter, month: e?.target?.value };
    getReports(value);
    setFilter(value);
  };
  const handleOnChangeYear = (e) => {
    const value = { ...filter, year: e?.target?.value };
    getReports(value);
    setFilter(value);
  };
  const handleExportCSVReport = async () => {
    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: reportTitle,
      decimalSeparator: ".",
    });
    const updatedReportData = reportsData.map((data) => {
      const modifiedData = {};
      reportsCols.forEach((col) => {
        modifiedData[col.headerName] = data[col.field];
      });
      return modifiedData;
    });
    const csv = generateCsv(csvConfig)(updatedReportData);
    download(csvConfig)(csv);
  };

  const handleExportPDFReport = async () => {
    const fileName = `${reportTitle}.pdf`;
    const blob = await pdf(
      <ReportPdf data={sellsReportsData} title={reportTitle} />
    ).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <div className="flex flex-col justify-center gap-4 m-4 min-w-[50rem] overflow-auto bg-[#fff]  p-4">
      <div className="flex gap-4 items-center">
        <Dropdown
          options={monthsDDOptions}
          onChangeDDOption={handleOnChangeMonth}
          selectedValue={filter.month}
        />
        <Dropdown
          options={yearsDDOptions}
          onChangeDDOption={handleOnChangeYear}
          selectedValue={filter.year}
        />
        <Button
          variant="contained"
          className="bg-primary hover:bg-primary mobile:text-[12px] mobile:h-[30px]"
          disabled={!reportsData?.length}
          onClick={handleExportCSVReport}
        >
          Export CSV Report
        </Button>
        <Button
          variant="contained"
          className="bg-primary hover:bg-primary mobile:text-[12px] mobile:h-[30px]"
          disabled={!reportsData?.length}
          onClick={handleExportPDFReport}
        >
          Export PDF Report
        </Button>
      </div>
      <div className="flex justify-center flex-col">
        <h2 className="p-2 text-center text-[20px] font-bold">
          {MONTH_FULL_NAMES[filter.month]} {filter.year}
        </h2>
        <div className="h-[490px] overflow-auto">
          <DataTable
            cols={reportsCols}
            data={reportsData?.length ? reportsData : []}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
              sorting: {
                sortModel: [{ field: "invoiceNo", sort: "desc" }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Reports;
