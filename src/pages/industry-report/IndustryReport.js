import { Grid } from "@mui/material";
import PieChartComp from "../../components/common/PieChartComp/PieChartComp";
import { FINANCIAL_YEARS } from "../../constants/common";
import { useState } from "react";
import SearchableDD from "../../components/common/SearchableDD/SearchableDD";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndustryPerfReport } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const IndustryReport = () => {
  const dispatch = useDispatch();
  const { industryPerfReportData } = useSelector((state) => state.api);
  const [financialYear, setFinancialYear] = useState(
    `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
  );
  const [productSellData, setProductSellData] = useState();
  const [productSellAmtData, setProductSellAmtData] = useState();

  useEffect(() => {
    dispatch(
      getIndustryPerfReport({
        method: "get",
        endpoint: API_ENDPOINTS.getIndustryPerfReportData,
        payload: { financialYear },
      })
    );
  }, [financialYear]);
  useEffect(() => {
    if (industryPerfReportData?.length) {
      const productsSell = [];
      const productSellAmt = [];
      let sumGrandTotal = 0;
      let sumSellAmt = 0;
      industryPerfReportData.forEach((data) => {
        productsSell.push({ name: data?.description, value: data?.weight });
        productSellAmt.push({ name: data?.description, value: data?.amount });
        sumGrandTotal = sumGrandTotal + data?.grandTotal;
        sumSellAmt = sumSellAmt + data?.amount;
      });
      setProductSellData(productsSell);
      setProductSellAmtData([
        ...productSellAmt,
        {
          name: "GST + Other Extra Charges",
          value: sumGrandTotal - sumSellAmt,
        },
      ]);
    } else {
      setProductSellData([]);
      setProductSellAmtData([]);
    }
  }, [industryPerfReportData]);
  return (
    <Grid container className="pt-2 pl-2 flex flex-col">
      <div className="flex justify-center items-center w-[18rem]">
        <strong className="min-w-max mr-1">Financial Year -</strong>
        <SearchableDD
          ddOptions={FINANCIAL_YEARS}
          onInputChangeDDSearch={(e, value) => {
            setFinancialYear(value);
          }}
          ddValue={financialYear}
        />
      </div>
      <Grid className="flex gap-3 justify-between items-center mobile:flex-col">
        <div className="h-[350px] w-[350px] flex flex-col items-center">
          <div className="m-2 p-2">Category Product Sell </div>
          <PieChartComp data={productSellData} />
        </div>
        <div className="h-[350px] w-[350px] flex flex-col items-center">
          <div className="m-2 p-2">Category Product Sell Amount </div>
          <PieChartComp data={productSellAmtData} />
        </div>
        <div className="h-[350px] w-[350px] flex flex-col items-center">
          <div className="m-2 p-2">Credit/Debit Amount </div>
          <PieChartComp data={data} />
        </div>
      </Grid>
    </Grid>
  );
};
export default IndustryReport;
