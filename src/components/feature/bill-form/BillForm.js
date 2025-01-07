import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button, Typography } from "@mui/material";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import {
  getAllBuyers,
  getAllProducts,
  getAllVehicles,
  getBillNumber,
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { DATED_OPTIONS, FORM_REDUCER } from "../../../constants/common";
import { formatDate } from "../../../utils/helperFunction";
import ItemsSell from "./ItemsSell";
const formInitValues = {
  buyerName: "",
  buyerAddress: "",
  buyerGst: "",
  buyerState: "",
  dated: DATED_OPTIONS[1],
  items: {
    1: {
      sNo: 1,
    },
    2: {
      sNo: 2,
    },
    3: { sNo: 3 },
  },
};
const formReducer = (state, action) => {
  if (action.type === FORM_REDUCER.UPDATE_FORM_VALUES) {
    console.log("13", action);
    const { value, allBuyers } = action?.data;
    const buyerDetails = allBuyers.find((buyer) => buyer?.name === value);
    return {
      buyerName: buyerDetails?.name,
      buyerAddress: buyerDetails?.address,
      buyerGst: buyerDetails?.gst,
      buyerState: buyerDetails?.state,
      dated: state?.dated,
      items: state?.items,
    };
  }
};
const BillForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [formValues, formDispatch] = useReducer(formReducer, formInitValues);
  const { billNumber, allBuyers, allVehicles, allProducts } = useSelector(
    (state) => state.api
  );
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [vehiclesDDOptions, setVehiclesDDOptions] = useState([]);
  const [productsDDOptions, setProductsDDOptions] = useState([]);

  useEffect(() => {
    if (!billNumber) {
      dispatch(
        getBillNumber({
          method: "get",
          endpoint: API_ENDPOINTS.getBillNumber,
        })
      );
    }
    if (!allBuyers?.length) {
      dispatch(
        getAllBuyers({
          method: "get",
          endpoint: API_ENDPOINTS.getAllBuyers,
        })
      );
    }
    if (!allVehicles?.length) {
      dispatch(
        getAllVehicles({
          method: "get",
          endpoint: API_ENDPOINTS.getAllVehicles,
        })
      );
    }
    if (!allProducts?.length) {
      dispatch(
        getAllProducts({
          method: "get",
          endpoint: API_ENDPOINTS.getAllProducts,
        })
      );
    }

    if (allBuyers?.length) {
      const buyersNames = [];
      //   const
      allBuyers.forEach((buyer) => {
        buyersNames.push(buyer?.name);
      });
      console.log("38", buyersNames);
      setBuyersNameDDOptions(buyersNames);
    }
  }, [allBuyers]);

  useEffect(() => {
    if (allVehicles?.length) {
      const vehicles = [];
      //   const
      allVehicles.forEach((vehicle) => {
        vehicles.push(vehicle?.vehicleNumber);
      });
      console.log("38", vehicles);
      setVehiclesDDOptions(vehicles);
    }
  }, [allVehicles]);

  useEffect(() => {
    if (allProducts?.length) {
      const products = [];
      allProducts.forEach((product) => {
        products.push(product?.name);
      });
      console.log("38", products);
      setProductsDDOptions(products);
    }
  }, [allProducts]);
  const handleOnChangeDatedDD = (e, value) => {
    console.log("7 dd", e?.target?.value, value);
  };
  const handleOnChangeDatedDDInput = (e, value) => {
    console.log("input value", e?.target?.value, value);
  };

  const onChangeBuyerNameDD = (e, value) => {
    console.log("7 dd", e?.target?.value, value);
    formDispatch({
      type: FORM_REDUCER.UPDATE_FORM_VALUES,
      data: { value, allBuyers },
    });
  };
  const onChangeBuyerNameDDInput = (e, value) => {
    console.log("input value", e?.target?.value, value);
  };
  return (
    <div
      className={cx(
        "w-full flex gap-8 min-w-[80rem] overflow-auto mobile:pr-4",
        className
      )}
    >
      <Grid container className="bg-[#fff]">
        <Grid xs={12}>
          <h2 className="form-border text-center">
            <u className="pt-[2px]">TAX INVOICE</u>
          </h2>
        </Grid>
        <Grid
          xs={6}
          className="pl-1 pb-1 form-border no-top-border flex flex-col"
        >
          <strong>MADHUVAN MINERALS & INDUSTRIES</strong>
          {/* <input placeholder="Enter " className="outline-none block" />
          <input placeholder="Enter " className="outline-none block" />
          <input placeholder="Enter " className="outline-none block" /> */}
          <span>WARD 31, NADI KE PASS, MAIN ROAD,</span>
          <span>SHAHGARH, SAGAR - 470339, MP, INDIA</span>
          <strong>GSTIN/UIN: 23ABAFM01191ZF</strong>
          {/* <span>
            <strong>State</strong> ; grf rtrt rtr
          </span> */}
          <span>Contact: 7000042043, 9685520593</span>
        </Grid>
        <Grid xs={3} className="bottom-border">
          <div className="pl-1 pb-1  bottom-border">
            <p>Invoice No.</p>
            <strong>{billNumber}</strong>
          </div>
          <div className="pl-1 pb-1 bottom-border">Buyer's Order No.</div>
          <div className="pl-1 pb-1">Dispatched through</div>
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="pb-1 bottom-border">
            <p className="pl-1">Dated</p>
            <strong className="pl-1">{formatDate(new Date())}</strong>
          </div>
          <div className="pb-1 bottom-border flex">
            <span className="pl-1 min-w-[3.7rem]">Dated -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.dated}
              ddOptions={DATED_OPTIONS}
            />
          </div>
          <div className="pb-1 flex pl-1">
            <span className="min-w-[5.9rem]">Destination -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
            />
          </div>
        </Grid>
        <Grid xs={6} className="pl-1 pb-1 form-border no-top-border">
          <div className="flex">
            <span className="min-w-[7.3rem]">Buyer's Name -</span>
            <SearchableDD
              onChangeDDOption={onChangeBuyerNameDD}
              onInputChangeDDSearch={onChangeBuyerNameDDInput}
              ddValue={formValues?.buyerName}
              ddOptions={buyersNameDDOptions}
            />
          </div>
          {/* <input placeholder="Enter " className="outline-none block" /> */}
          <SearchableDD
            onChangeDDOption={handleOnChangeDatedDD}
            onInputChangeDDSearch={handleOnChangeDatedDDInput}
            ddValue={formValues?.buyerAddress}
          />
          <div className="flex">
            <h6 className="w-[3rem]">GST -</h6>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.buyerGst}
              ddOptions={buyersNameDDOptions}
            />
          </div>
          <div className="flex">
            <strong className="w-[4rem]">State -</strong>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.buyerState}
            />
          </div>
        </Grid>
        <Grid xs={3} className="bottom-border">
          <div className="pl-1 pb-1 "> Bill of Loading / LR No.</div>
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="flex pl-1 pb-1 ">
            <span className="min-w-[5.5rem]">Vechile No -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddOptions={vehiclesDDOptions}
            />
          </div>
        </Grid>
        <ItemsSell />
        <Grid xs={6} className="pr-1 pb-1 form-border flex justify-end">
          <strong>Grand Total</strong>
        </Grid>
        <Grid
          xs={6}
          className="pr-1 pb-1 form-border no-left-border flex justify-end"
        >
          <strong>678687687</strong>
        </Grid>

        <Grid
          xs={12}
          className="form-border no-top-border flex justify-between"
        >
          <div className="pl-1 pb-1 flex flex-col">
            <span>Amount chargable </span>
            <strong>Indian Rupess eight lakh</strong>
          </div>
          <span className="pr-1 pb-1">E. & O.E</span>
        </Grid>

        <Grid
          xs={5}
          className="pl-1 pb-1 form-border no-top-border flex flex-col justify-end"
        >
          <span>
            <u>Declaration</u>
          </span>
          <p>
            We declare that this invoices shows the actaul price of the goods
            described and that all particulars are true and correct.
          </p>
          <sapn>
            Company's PAN: <strong>ABAFM0119P</strong>
          </sapn>
        </Grid>
        <Grid xs={7} className="form-border no-left-border no-top-border">
          <div className="pl-1 pb-1 flex flex-col">
            <span>Company's Bank Details</span>
            <strong>A/c Holder's Name: MADHUVAN MINERALS & INDUSTRIES</strong>
            <strong>Bank Name: Central Bank of India</strong>
            <strong>A/c No.: 3734793516</strong>
            <strong>
              Branch & IFSC Code: SHAHGARH, SAGAR (M.P.) & CBIN0282030
            </strong>
          </div>
          <div className="pr-1 pb-1 flex flex-col text-right top-border">
            <strong>for MADHUVAN MINERALS & INDUSTRIES</strong>
            <span>Authorised Signatory</span>
          </div>
        </Grid>
      </Grid>
      <div className="mt-2">
        <Button
          variant="contained"
          className={cx(
            "w-[220px] mobile:text-[12px] mobile:h-[30px]",
            //   componentLoader && "bg-none",
            "bg-primary hover:bg-primary"
          )}
          // disabled={!validator.isEmail(email) || componentLoader}
          // onClick={handleRequestOTP}
        >
          Generate Invoice
        </Button>
      </div>
    </div>
  );
};
export default BillForm;
