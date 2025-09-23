import SearchableDD from "../../components/common/SearchableDD/SearchableDD";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getBuyerSellData,
  clearSomeStates,
  getAllBuyers,
  saveBuyerCreditAmount,
  getBuyerCreditDetails,
} from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import DataTable from "../../components/common/DataTable/DataTable";
import DatePickerComp from "../../components/common/DatePickerComp/DatePickerComp";
import { formatDate } from "../../utils/helperFunction";
import {
  customerCreditAcCols,
  customerDebitAcCols,
} from "./customerAccountCols";
import cx from "classnames";
import { FINANCIAL_YEARS } from "../../constants/common";

const CustomerAccount = () => {
  const dispatch = useDispatch();
  const {
    allBuyers,
    buyerSellData,
    buyerCreditDetails,
    isBuyerCreditAmtDetSave,
  } = useSelector((state) => state.api);
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [buyerDetails, setBuyerDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [financialYear, setFinancialYear] = useState(
    `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
  );
  const [date, setDate] = useState(formatDate(new Date()));

  useEffect(() => {
    document.title = "Madhuvan Minerals - Dashbaord";
    dispatch(clearSomeStates({ stateKeys: ["sellsReportsData"] }));
    dispatch(
      getAllBuyers({
        method: "get",
        endpoint: API_ENDPOINTS.getAllBuyers,
      })
    );
  }, []);

  useEffect(() => {
    if (allBuyers?.length) {
      const buyersNames = [];
      allBuyers.forEach((buyer) => {
        buyersNames.push(`${buyer?.name},${buyer?.gst}`);
      });
      setBuyersNameDDOptions(buyersNames);
    }
  }, [allBuyers]);

  useEffect(() => {
    if (buyerDetails && date) {
      dispatch(
        getBuyerSellData({
          method: "get",
          endpoint: API_ENDPOINTS.getBuyerSellData,
          payload: { buyerDetails, financialYear },
        })
      );
      dispatch(
        getBuyerCreditDetails({
          method: "get",
          endpoint: API_ENDPOINTS.buyerCreditAmount,
          payload: { buyerDetails, financialYear },
        })
      );
    }
  }, [buyerDetails, financialYear]);

  useEffect(() => {
    if (isBuyerCreditAmtDetSave) {
      dispatch(
        getBuyerCreditDetails({
          method: "get",
          endpoint: API_ENDPOINTS.buyerCreditAmount,
          payload: { buyerDetails, financialYear },
        })
      );
    }
  }, [isBuyerCreditAmtDetSave]);

  useEffect(() => {
    setDate(formatDate(new Date(`01-Apr-${financialYear?.split("-")[0]}`)));
  }, [financialYear]);

  const handleOnDateChange = (e) => {
    setDate(formatDate(new Date(e)));
  };

  const handleSaveBuyerCrAmt = () => {
    const [companyName, gst] = buyerDetails?.split(",");
    dispatch(
      saveBuyerCreditAmount({
        method: "post",
        endpoint: API_ENDPOINTS.buyerCreditAmount,
        payload: {
          name: companyName,
          gst,
          date,
          amount,
          description,
        },
      })
    );
  };

  return (
    <div className="h-[calc(100%_-_1rem)] flex flex-col gap-12 my-2 mx-6 mobile:h-[calc(100%_-_2.5rem)] mobile:mx-0">
      <Grid container className="flex justify-around">
        <Grid
          size={{ lg: 5, md: 5 }}
          className="m-2 flex flex-col gap-3 p-2 border-[1px] border-solid border-[grey] rounderd-[2px]"
        >
          <div className="flex justify-center items-center">
            <strong className="min-w-max mr-1">Select Buyer -</strong>
            <SearchableDD
              ddOptions={buyersNameDDOptions}
              onInputChangeDDSearch={(e, value) => {
                setBuyerDetails(value);
              }}
              ddValue={buyerDetails}
            />
          </div>

          <div className="flex justify-center items-center">
            <strong className="min-w-max mr-1">Financial Year -</strong>
            <SearchableDD
              ddOptions={FINANCIAL_YEARS}
              onInputChangeDDSearch={(e, value) => {
                setFinancialYear(value);
              }}
              ddValue={financialYear}
            />
          </div>
        </Grid>
        <Grid
          size={{ lg: 7, md: 7 }}
          className={cx(
            "m-2 border-inputLabel border-[1px] rounded-[4px] flex justify-center items-center gap-4 mobile:flex-col p-[8px] mobile:w-full",
            !buyerDetails &&
              "pointer-events-none cursor-not-allowed bg-[lightgrey]"
          )}
        >
          <div>
            <strong className="min-w-max flex justify-between items-center gap-3 my-1">
              <span className="mobile:text-[14px]">Select Date -</span>
              <span className="flex justify-center">
                <DatePickerComp
                  value={date}
                  onDateChange={handleOnDateChange}
                  props={{
                    minDate: dayjs(`${financialYear?.split("-")[0]}-04-01`),
                    maxDate: dayjs(`${financialYear?.split("-")[1]}-03-31`),
                  }}
                />
              </span>
            </strong>
            <strong className="flex justify-between items-center gap-3">
              <span className="mobile:text-[14px]">Amount -</span>
              <input
                type="number"
                className="outline-none w-36"
                placeholder="0000"
                value={amount}
                onChange={(e) => {
                  setAmount(e?.target?.value);
                }}
              />
            </strong>
            <strong className="flex justify-between items-center gap-3 my-1">
              <span className="mobile:text-[14px]">Description -</span>
              <textarea
                className="outline-none w-36"
                placeholder="Enter text ..."
                value={description}
                onChange={(e) => {
                  setDescription(e?.target?.value);
                }}
                rows={2}
              />
            </strong>
          </div>
          <Button
            variant="contained"
            className="w-[180px] h-[30px] mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primary"
            disabled={!amount}
            onClick={handleSaveBuyerCrAmt}
          >
            Add Pay Record
          </Button>
        </Grid>
      </Grid>
      <Grid container className="flex items-center justify-center gap-4">
        <strong>
          Total Credit -
          <span className="text-[green] ml-[2px]">
            {buyerCreditDetails?.totalFinanceYearCredAtm
              ? buyerCreditDetails?.totalFinanceYearCredAtm
              : 0}
          </span>
        </strong>
        <strong>
          Total Debit -
          <span className="text-[red] ml-[2px]">
            {buyerSellData?.totalFinanceYearDebitAtm
              ? buyerSellData?.totalFinanceYearDebitAtm
              : 0}
          </span>
        </strong>
        <strong>
          Total Due -
          <span
            className={
              buyerSellData?.totalFinanceYearDebitAtm -
                buyerCreditDetails?.totalFinanceYearCredAtm >=
              0
                ? "text-[red] ml-[2px]"
                : "text-[green] ml-[2px]"
            }
          >
            {buyerSellData?.totalFinanceYearDebitAtm ||
            buyerCreditDetails?.totalFinanceYearCredAtm
              ? buyerSellData?.totalFinanceYearDebitAtm -
                buyerCreditDetails?.totalFinanceYearCredAtm
              : 0}
          </span>
        </strong>
      </Grid>
      <Grid container className="flex gap-2 mobile:gap-6">
        <Grid className="h-[490px] w-[49%] mobile:w-[100%]">
          <strong className="block text-center">Credit</strong>
          <DataTable
            cols={customerCreditAcCols}
            data={buyerCreditDetails?.data}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
            }}
            className="mx-2"
          />
        </Grid>
        <Grid className="h-[490px] w-[49%] mobile:w-[100%] ">
          <strong className="block text-center">Debit</strong>
          <DataTable
            cols={customerDebitAcCols}
            data={buyerSellData?.data}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
              sorting: {
                sortModel: [{ field: "invoiceNo", sort: "desc" }],
              },
            }}
            className="mx-2"
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default CustomerAccount;
