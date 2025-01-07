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
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { DATED_OPTIONS, FORM_REDUCER } from "../../../constants/common";
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
  const { allBuyers, allVehicles, allProducts } = useSelector(
    (state) => state.api
  );
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [vehiclesDDOptions, setVehiclesDDOptions] = useState([]);
  const [productsDDOptions, setProductsDDOptions] = useState([]);

  useEffect(() => {
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
        <Grid xs={6} className="form-border no-top-border flex flex-col">
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
          <div className="bottom-border">
            <p>Invoice No.</p>
            <strong>67</strong>
          </div>
          <div className="bottom-border">Buyer's Order No.</div>
          <div>Dispatched through</div>
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="bottom-border">
            <p>Dated</p>
            <strong>19-Dec-24</strong>
          </div>
          <div className="bottom-border flex">
            <span className="min-w-[3.4rem]">Dated -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.dated}
              ddOptions={DATED_OPTIONS}
            />
          </div>
          <div className="flex">
            <span className="min-w-[5.9rem]">Destination -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
            />
          </div>
        </Grid>
        <Grid xs={6} className="form-border no-top-border">
          <div className="flex">
            <span className="min-w-[3.4rem]">Buyer's Name -</span>
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
            <h6>GST -</h6>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.buyerGst}
              ddOptions={buyersNameDDOptions}
            />
          </div>
          <div className="flex">
            <strong>State -</strong>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddValue={formValues?.buyerState}
            />
          </div>
        </Grid>
        <Grid xs={3} className="bottom-border">
          <div> Bill of Loading / LR No.</div>
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="flex">
            <span className="min-w-[5.5rem]">Vechile No -</span>
            <SearchableDD
              onChangeDDOption={handleOnChangeDatedDD}
              onInputChangeDDSearch={handleOnChangeDatedDDInput}
              ddOptions={vehiclesDDOptions}
            />
          </div>
        </Grid>

        <Grid xs={1} className="left-border">
          <strong>S. No.</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            value={formValues.items["1"].sNo}
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            value={formValues.items["2"].sNo}
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            value={formValues.items["3"].sNo}
          />
        </Grid>
        <Grid xs={1} className="left-border">
          <strong>Date</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </Grid>
        <Grid xs={3} className="left-border">
          <strong>Description of Goods</strong>
          <SearchableDD
            onChangeDDOption={handleOnChangeDatedDD}
            onInputChangeDDSearch={handleOnChangeDatedDDInput}
            ddOptions={productsDDOptions}
          />
          <SearchableDD
            onChangeDDOption={handleOnChangeDatedDD}
            onInputChangeDDSearch={handleOnChangeDatedDDInput}
            ddOptions={productsDDOptions}
          />
          <SearchableDD
            onChangeDDOption={handleOnChangeDatedDD}
            onInputChangeDDSearch={handleOnChangeDatedDDInput}
            ddOptions={productsDDOptions}
          />
        </Grid>
        {/* <Grid xs={1}>
          <strong>Truck No.</strong>
          <input placeholder="Enter " className="outline-none block" />
          <input placeholder="Enter " className="outline-none block" />
          <input placeholder="Enter " className="outline-none block" />
        </Grid> */}
        <Grid xs={2} className="left-border">
          <strong>HSN Code</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </Grid>
        <Grid xs={1} className="left-border">
          <strong>Quantity</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
        </Grid>
        <Grid xs={1} className="left-border">
          <strong>Rate PMT</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
        </Grid>
        <Grid xs={1} className="left-border">
          <strong>IGST R/o</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </Grid>
        <Grid xs={2} className="left-border right-border">
          <strong>Amount RS</strong>
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </Grid>

        <Grid xs={7} className="form-border">
          <strong>Grand Total</strong>
        </Grid>
        <Grid xs={5} className="form-border no-left-border">
          <strong>678687687</strong>
        </Grid>

        <Grid
          xs={12}
          className="form-border no-top-border flex justify-between"
        >
          <div className="flex flex-col">
            <span>Amount chargable </span>
            <strong>Indian Rupess eight lakh</strong>
          </div>
          <span>E. & O.E</span>
        </Grid>

        <Grid
          xs={5}
          className="form-border no-top-border flex flex-col justify-end"
        >
          <span>
            <u>Declaration</u>
          </span>
          <p>
            We declare that this invoice shi iuigghjg hj gjhjh jhghj gjhgjh jhg
            hjgjg hj g hj
          </p>
          <sapn>
            Company's PAN: <strong>SFDSF5675</strong>
          </sapn>
        </Grid>
        <Grid xs={7} className="form-border no-left-border no-top-border">
          <div className="flex flex-col">
            <span>Company's Bank Det</span>
            <strong>A/c Holder nmae : Madhuvan minerals & industries</strong>
            <strong>Bank Name: Central Bank of India</strong>
            <strong>A/c No.: 44354343335</strong>
            <strong>Brnach & IFSC Code: SHAHgarhs ,sagar sgsfgf d</strong>
          </div>
          <div className="flex flex-col text-right top-border">
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
