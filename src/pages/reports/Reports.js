import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { MONTH_FULL_NAMES, MONTH_NAMES, YEARS } from "../../constants/common";
import { convertDDOptions } from "../../utils/helperFunction";
import { getSellsReportsData } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import { Button } from "@mui/material";
import ReportPdf from "../../components/feature/gen-pdf/ReportPdf";

const monthsDDOptions = convertDDOptions(MONTH_NAMES);
const yearsDDOptions = convertDDOptions(YEARS);
const Reports = () => {
  const { sellsReportsData } = useSelector((state) => state.api);
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
  }, []);

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
  const handleExportReport = async () => {
    const fileName = `${reportTitle}.pdf`;
    const blob = await pdf(
      <ReportPdf data={sellsReportsData} title={reportTitle} />
    ).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <div className="flex flex-col justify-center  gap-4 m-4 min-w-[50rem] overflow-auto bg-[#fff]  p-4">
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
          disabled={!sellsReportsData?.length}
          onClick={handleExportReport}
        >
          Export Report
        </Button>
      </div>
      <div className="flex justify-center flex-col">
        <h2 className="p-2 text-center text-[20px] font-bold">
          {MONTH_FULL_NAMES[filter.month]} {filter.year}
        </h2>
        <table className="border-collapse bg-[#fff]">
          <tr>
            <th className="p-2 text-center border border-solid">
              Billing Date
            </th>
            <th className="p-2 text-center border border-solid">Bill No.</th>
            <th className="p-2 text-center border border-solid">GSTIN</th>
            <th className="p-2 text-center border border-solid">Name</th>
            <th className="p-2 text-center border border-solid">Weight (MT)</th>
            <th className="p-2 text-center border border-solid">
              Billing Amont
            </th>
            <th className="p-2 text-center border border-solid">
              Other GST Expenses
            </th>
            <th className="p-2 text-center border border-solid">SGST</th>
            <th className="p-2 text-center border border-solid">CGST</th>
            <th className="p-2 text-center border border-solid">IGST</th>
            <th className="p-2 text-center border border-solid">
              Total (Bill+Tax)
            </th>
          </tr>

          {sellsReportsData?.length > 0 &&
            sellsReportsData.map((sellReport) => {
              return (
                <tr>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.date}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.invoiceNo}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.gst}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.name}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.weight}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.amount}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.otherExpensesGST}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.sgst && sellReport?.gstAmount / 2}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.sgst && sellReport?.gstAmount / 2}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.igst && sellReport?.gstAmount}
                  </td>
                  <td className="p-2 text-center border border-solid">
                    {sellReport?.otherExpensesGST
                      ? sellReport?.amount +
                        sellReport?.gstAmount +
                        sellReport?.otherExpensesGST
                      : sellReport?.amount + sellReport?.gstAmount}
                  </td>
                </tr>
              );
            })}
        </table>
        {!sellsReportsData?.length && (
          <div className="p-2 text-center border border-solid">
            No Data Avaible
          </div>
        )}
      </div>
    </div>
  );
};
export default Reports;
