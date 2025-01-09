import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button, Typography } from "@mui/material";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import { getAllProducts } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import {
  calculateGstAmount,
  numberToWords,
} from "../../../utils/helperFunction";

const ItemsSell = ({ getUpdatedItemsSellValue = () => {} }) => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.api);
  const options = [
    { value: "igst", label: "IGST % -", inputValue: 5 },
    {
      value: "sgst",
      label: (
        <span className="flex flex-col">
          <span>SGST - 2.5%</span>
          <span>CGST - 2.5%</span>
        </span>
      ),
      inputValue: 5,
    },
  ];
  const [productsDDOptions, setProductsDDOptions] = useState([]);
  const [itemsSellForm, setItemsSellForm] = useState({
    rowFields: [
      {
        sNo: 1,
        description: "",
        hsnCode: "",
        quantity: "",
        ratePMT: "",
        amount: "",
      },
    ],
    otherExpenses: "",
    gstType: {
      type: options[0].value,
      value: options[0].inputValue,
      gstAmount: 0,
    },
    grandTotal: 0,
  });

  const handleAddField = () => {
    setItemsSellForm((preVal) => {
      return {
        ...preVal,
        rowFields: [
          ...preVal?.rowFields,
          {
            sNo: preVal?.rowFields?.length + 1,
            description: "",
            hsnCode: "",
            quantity: "",
            ratePMT: "",
            amount: "",
          },
        ],
      };
    });
  };
  const handleRemoveLastRowField = () => {
    // const updatedRows = rowFields.slice(0, rowFields.length - 1);
    setItemsSellForm((preVal) => {
      return {
        ...preVal,
        rowFields: [...preVal.rowFields.slice(0, preVal.rowFields.length - 1)],
      };
    });
    // setRowFields(updatedRows);
  };
  useEffect(() => {
    if (!allProducts?.length) {
      dispatch(
        getAllProducts({
          method: "get",
          endpoint: API_ENDPOINTS.getAllProducts,
        })
      );
    }
  }, []);

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

  const handleChange = (e, value, type, index) => {
    console.log("input value", e?.target?.value, value, type, index);
    const values = { ...itemsSellForm };
    if (index || index === 0) {
      values.rowFields[index][type] = e.target.value;
      if (["quantity", "ratePMT"].includes(type)) {
        values.rowFields[index].amount =
          values.rowFields[index].quantity * values.rowFields[index].ratePMT;
        console.log(values);
        const [gstType, grandTotal] = updateGstType(values, values?.gstType);
        values.gstType = gstType;
        values.grandTotal = grandTotal;
      }
    } else {
      if (type === "radioGST") {
        console.log(values);
        const gstVal = options.find((gstType) => gstType.value === value);
        const [gstType, grandTotal] = updateGstType(values, {
          type: gstVal.value,
          value: gstVal.inputValue,
          gstAmount: 0,
        });
        values.gstType = gstType;
        values.grandTotal = grandTotal;
      } else {
        values[type] = Number(value);
      }
    }
    setItemsSellForm(values);
    getUpdatedItemsSellValue(values);
  };
  const updateGstType = (values, gstVal) => {
    const totalAmount =
      values.rowFields.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      ) || 0;
    return [
      {
        type: gstVal.type,
        value: gstVal.value,
        gstAmount: calculateGstAmount(gstVal.value, totalAmount),
      },
      calculateGstAmount(gstVal.value, totalAmount) +
        totalAmount +
        values.otherExpenses || 0,
    ];
  };
  return (
    <>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          S. No.
        </strong>
      </Grid>
      <Grid xs={4} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Description of Goods
        </strong>
      </Grid>
      <Grid xs={2} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          HSN Code
        </strong>
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Quantity
        </strong>
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Rate PMT
        </strong>
      </Grid>
      <Grid xs={3} className="left-border right-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Amount RS
        </strong>
      </Grid>
      {itemsSellForm.rowFields.map((row, index) => {
        return (
          <>
            <Grid xs={1} className="left-border">
              <div className="pl-1">{row.sNo}</div>
            </Grid>
            <Grid xs={4} className="left-border">
              <SearchableDD
                // onChangeDDOption={handleOnChangeDatedDD}
                onInputChangeDDSearch={(event, value) => {
                  handleChange(event, value, "description", index);
                }}
                ddOptions={productsDDOptions}
              />
            </Grid>
            <Grid xs={2} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  //   value={}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "hsnCode", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  type="number"
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "quantity", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  type="number"
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "ratePMT", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={3} className="left-border right-border">
              <div className="pr-1 text-right">
                {/* <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                /> */}
                <strong>{itemsSellForm.rowFields[index].amount}</strong>
              </div>
            </Grid>
          </>
        );
      })}
      <Grid
        xs={7}
        className="pl-1 form-border no-bottom-border no-right-border flex items-center gap-2"
      >
        <button onClick={handleAddField}>
          <AddCircleOutlinedIcon className="fill-primary" />
        </button>
        <button
          onClick={handleRemoveLastRowField}
          disabled={itemsSellForm.rowFields?.length <= 1}
        >
          <RemoveCircleOutlinedIcon
            className={
              itemsSellForm.rowFields?.length <= 1
                ? "fill-[lightgrey] cursor-not-allowed"
                : "fill-primary"
            }
          />
        </button>
      </Grid>
      <Grid
        xs={5}
        className="pl-1 pb-1 form-border no-bottom-border flex flex-col"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={cx(
              "flex justify-between pr-1",
              itemsSellForm?.gstType.type !== option.value &&
                "cursor-not-allowed opacity-50"
            )}
          >
            <div className="flex gap-3 items-baseline">
              <input
                type="radio"
                id={option.value}
                name="radioGroup"
                value={option.value}
                checked={itemsSellForm?.gstType.type === option.value}
                onChange={(e) => {
                  handleChange(e, e?.target?.value, "radioGST", null);
                }}
              />
              <label htmlFor={option.value}>{option.label}</label>
              <input
                type="number"
                value={option.inputValue}
                className="outline-none w-12"
              />
            </div>
            {itemsSellForm?.gstType.type === option.value && (
              <i>{itemsSellForm?.gstType.gstAmount}</i>
            )}
          </div>
        ))}
        <div className="flex justify-between pr-1">
          <div className="flex gap-3">
            <strong>Other Expenses - </strong>
            <input
              type="number"
              className="outline-none w-28"
              placeholder="0000"
              onChange={(e) => {
                handleChange(e, e?.target?.value, "otherExpenses", null);
              }}
            />
          </div>
          <i>{itemsSellForm.otherExpenses}</i>
        </div>
      </Grid>
      <Grid xs={6} className="pr-1 pb-1 form-border flex justify-end">
        <strong>Grand Total</strong>
      </Grid>
      <Grid
        xs={6}
        className="pr-1 pb-1 form-border no-left-border flex justify-end"
      >
        <strong>{itemsSellForm.grandTotal}</strong>
      </Grid>
      <Grid xs={12} className="form-border no-top-border flex justify-between">
        <div className="pl-1 pb-1 flex flex-col">
          <span>Amount Chargeable </span>
          <strong>
            INDIAN RUPEES: {numberToWords(itemsSellForm.grandTotal)}
          </strong>
        </div>
        <span className="pr-1 pb-1">E. & O.E</span>
      </Grid>
    </>
  );
};
export default ItemsSell;
