import { Grid } from "@mui/material";
import PieChartComp from "../../components/common/PieChartComp/PieChartComp";
import { FINANCIAL_YEARS } from "../../constants/common";
import { useState } from "react";
import SearchableDD from "../../components/common/SearchableDD/SearchableDD";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuyersCredit, getIndustryPerfReport } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";

const IndustryReport = () => {
  const dispatch = useDispatch();
  const { industryPerfReportData, allBuyersCredit } = useSelector(
    (state) => state.api
  );
  const [financialYear, setFinancialYear] = useState(
    `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
  );
  const [productSellData, setProductSellData] = useState();
  const [productSellAmtData, setProductSellAmtData] = useState();
  const [sumGrandTotal, setSumGrandTotal] = useState(0);
  const [totalBuyerCreditAmt, setTotalBuyerCreditAmt] = useState(0);

  useEffect(() => {
    dispatch(
      getIndustryPerfReport({
        method: "get",
        endpoint: API_ENDPOINTS.getIndustryPerfReportData,
        payload: { financialYear },
      })
    );
    dispatch(
      getAllBuyersCredit({
        method: "get",
        endpoint: API_ENDPOINTS.getAllBuyersCredit,
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
      setSumGrandTotal(sumGrandTotal);
    } else {
      setProductSellData([]);
      setProductSellAmtData([]);
    }
  }, [industryPerfReportData]);

  useEffect(() => {
    if (allBuyersCredit?.length) {
      const totalBuyersCreditAmt = allBuyersCredit.reduce((acc, currVal) => {
        return acc + currVal?.amount;
      }, 0);
      setTotalBuyerCreditAmt(totalBuyersCreditAmt);
    }
  }, [allBuyersCredit]);
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
      <Grid className="flex gap-3 justify-around items-center mobile:flex-col">
        <div className="h-[400px] w-[400px] flex flex-col items-center">
          <div className="m-2 p-2">Product Sell (M.T)</div>
          <PieChartComp data={productSellData} />
        </div>
        <div className="h-[400px] w-[400px] flex flex-col items-center">
          <div className="m-2 p-2">Product Sell Amount</div>
          <PieChartComp data={productSellAmtData} />
        </div>
        <div className="h-[400px] w-[400px] flex flex-col items-center">
          <div className="m-2 p-2">Credit/Debit Amount</div>
          <PieChartComp
            data={[
              { name: "Credit", value: totalBuyerCreditAmt },
              { name: "Debit", value: sumGrandTotal },
            ]}
          />
        </div>
      </Grid>
    </Grid>
  );
};
export default IndustryReport;
