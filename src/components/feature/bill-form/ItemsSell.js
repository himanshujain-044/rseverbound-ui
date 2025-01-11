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
  convertFixedDecimal,
  numberToWords,
} from "../../../utils/helperFunction";

const ItemsSell = ({ getUpdatedItemsSellValue = () => {} }) => {
  const dispatch = useDispatch();
  const { allProducts, invoiceDetails } = useSelector((state) => state.api);
  console.log(
    "invoiced detals",
    typeof invoiceDetails?.sgst,
    invoiceDetails?.sgst,
    typeof invoiceDetails?.cgst,
    invoiceDetails?.cgst,
    Number(invoiceDetails?.sgst) + Number(invoiceDetails?.cgst)
  );
  const options = [
    { value: "igst", label: "IGST % -", inputValue: invoiceDetails?.igst },
    {
      value: "sgst",
      label: (
        <span className="flex flex-col">
          <span>SGST % - </span>
          <span>CGST %</span>
        </span>
      ),
      inputValue: Number(invoiceDetails?.sgst) + Number(invoiceDetails?.cgst),
    },
  ];
  const [productsDDOptions, setProductsDDOptions] = useState([]);
  const [hsnCodeDDOptions, setHsnCodeDDOptions] = useState([]);
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
    otherExpensesText: "",
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
            description:
              invoiceDetails?.products[invoiceDetails?.products?.length - 1],
            hsnCode:
              invoiceDetails?.hsnCodes[invoiceDetails?.hsnCodes?.length - 1],
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
  // useEffect(() => {
  //   if (!allProducts?.length) {
  //     dispatch(
  //       getAllProducts({
  //         method: "get",
  //         endpoint: API_ENDPOINTS.getAllProducts,
  //       })
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   if (allProducts?.length) {
  //     const products = [];
  //     allProducts.forEach((product) => {
  //       products.push(product?.name);
  //     });
  //     const values = { ...itemsSellForm };
  //     values.rowFields[0]["description"] = products[0];
  //     setItemsSellForm(values);
  //     setProductsDDOptions(products);
  //   }
  // }, [allProducts]);
  useEffect(() => {
    setHsnCodeDDOptions(invoiceDetails?.hsnCodes);
    setProductsDDOptions(invoiceDetails?.products);
    const values = { ...itemsSellForm };
    values.rowFields[0]["hsnCode"] =
      invoiceDetails?.hsnCodes?.[invoiceDetails?.hsnCodes?.length - 1];
    values.rowFields[0]["description"] =
      invoiceDetails?.products?.[invoiceDetails?.products?.length - 1];
    setItemsSellForm(values);
  }, [invoiceDetails]);
  useEffect(() => {
    getUpdatedItemsSellValue(itemsSellForm);
  }, [itemsSellForm]);

  const handleChange = (e, value, type, index) => {
    console.log("124", e, value, type, index);
    const values = { ...itemsSellForm };
    if (index || index === 0) {
      values.rowFields[index][type] =
        typeof e?.target?.value === "string"
          ? e?.target?.value?.toUpperCase()
          : e?.target?.value || value?.toUpperCase();
      if (["quantity", "ratePMT"].includes(type)) {
        values.rowFields[index].amount =
          values.rowFields[index].quantity * values.rowFields[index].ratePMT;
        const [gstType, grandTotal] = updateGstType(values, values?.gstType);
        values.gstType = gstType;
        values.grandTotal = grandTotal;
      }
    } else {
      if (type === "radioGST") {
        const gstVal = options.find((gstType) => gstType.value === value);
        const [gstType, grandTotal] = updateGstType(values, {
          type: gstVal.value,
          value: values.gstType.value || gstVal.inputValue,
          gstAmount: 0,
        });
        values.gstType = gstType;
        values.grandTotal = grandTotal;
      }
      if (["igst", "sgst"].includes(type)) {
        const gstVal = options.find((gstType) => gstType.value === type);
        const [gstType, grandTotal] = updateGstType(values, {
          type: gstVal.value,
          value: value,
          gstAmount: 0,
        });
        values.gstType = gstType;
        values.grandTotal = grandTotal;
      } else {
        values[type] = value?.toUpperCase();
        if (type === "otherExpenses") {
          const [gstType, grandTotal] = updateGstType(values, values.gstType);
          values.gstType = gstType;
          values.grandTotal = grandTotal;
        }
      }
    }
    setItemsSellForm(values);
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
      convertFixedDecimal(
        calculateGstAmount(gstVal.value, totalAmount) +
          totalAmount +
          Number(values.otherExpenses) || 0
      ),
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
      <Grid xs={2} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Quantity (MT)
        </strong>
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Rate PMT
        </strong>
      </Grid>
      <Grid xs={2} className="left-border right-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Amount Rs
        </strong>
      </Grid>
      {itemsSellForm.rowFields.map((row, index) => {
        return (
          <>
            <Grid xs={1} className="left-border flex justify-center">
              <div className="pl-1">{row.sNo}</div>
            </Grid>
            <Grid xs={4} className="left-border">
              <SearchableDD
                // onChangeDDOption={handleOnChangeDatedDD}
                ddValue={itemsSellForm.rowFields[index]["description"]}
                onInputChangeDDSearch={(event, value) => {
                  handleChange(event, value, "description", index);
                }}
                ddOptions={productsDDOptions}
              />
            </Grid>
            <Grid xs={2} className="left-border">
              <div className="pl-1">
                {/* <input
                  className="outline-none block max-w-[100%]"
                  value={itemsSellForm.rowFields[index]["hsnCode"]}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "hsnCode", index);
                  }}
                /> */}

                <SearchableDD
                  ddValue={itemsSellForm.rowFields[index]["hsnCode"]}
                  onInputChangeDDSearch={(event, value) => {
                    handleChange(event, value, "hsnCode", index);
                  }}
                  ddOptions={hsnCodeDDOptions}
                />
              </div>
            </Grid>
            <Grid xs={2} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block w-[100%]"
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
                  className="outline-none block w-[100%]"
                  type="number"
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "ratePMT", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={2} className="left-border right-border">
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
                value={itemsSellForm?.gstType.value || option.inputValue}
                className="outline-none w-12"
                onChange={(e, value) => {
                  handleChange(e, e?.target?.value, option.value, null);
                }}
              />
            </div>
            {itemsSellForm?.gstType.type === option.value &&
              itemsSellForm?.gstType.type === "igst" && (
                <i>{itemsSellForm?.gstType.gstAmount}</i>
              )}
            {itemsSellForm?.gstType.type === option.value &&
              itemsSellForm?.gstType.type === "sgst" && (
                <div className="flex flex-col">
                  <i>{itemsSellForm?.gstType.gstAmount / 2}</i>{" "}
                  <i>{itemsSellForm?.gstType.gstAmount / 2}</i>
                </div>
              )}
          </div>
        ))}
        <div className="flex justify-between pr-1">
          <div className="flex gap-3">
            <input
              type="text"
              className="outline-none max-w-42 font-bold"
              placeholder="Other Expenses ..."
              onChange={(e) => {
                handleChange(e, e?.target?.value, "otherExpensesText", null);
              }}
              value={itemsSellForm.otherExpensesText}
            />
            -
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
          <span>Amount in words</span>
          <strong>{numberToWords(itemsSellForm.grandTotal)}</strong>
        </div>
        <span className="pr-1 pb-1">E. & O.E</span>
      </Grid>
    </>
  );
};
export default ItemsSell;
