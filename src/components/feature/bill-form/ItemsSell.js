import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import {
  calculateGstAmount,
  convertFixedDecimal,
  numberToWords,
} from "../../../utils/helperFunction";
import { Checkbox } from "@mui/material";

const initVal = {
  rowFields: [
    {
      sNo: 1,
      // bagsCount: "",
      // bagWeight: "",

      description: "",
      hsnCode: "",
      quantity: "",
      unit: "",
      ratePMT: "",
      amount: "",
    },
  ],
  totalProductAmount: "",
  otherExpensesGSTText: "",
  otherExpensesGST: "",
  otherExpensesText: "",
  otherExpenses: "",
  gstType: {
    type: "",
    value: "",
    gstAmount: 0,
  },
  grandTotal: 0,
  roundOff: { added: false, amountInPaise: 0 },
};

const ItemsSell = ({
  getUpdatedItemsSellValue = () => {},
  productsSellDetails,
  formValues,
}) => {
  const { invoiceDetails, isInvoiceSave } = useSelector((state) => state.api);
  console.log("invoice det", invoiceDetails);
  const options = [
    {
      value: "igst",
      label: "IGST % -",
      inputValue: Number(invoiceDetails?.igst),
    },
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
  const [units, setUnitsDDOptions] = useState([]);
  const [hsnCodeDDOptions, setHsnCodeDDOptions] = useState([]);
  const [gstDDOptions, setGstDDOptions] = useState([]);
  const [itemsSellForm, setItemsSellForm] = useState(initVal);

  const handleAddField = () => {
    setItemsSellForm((preVal) => {
      return {
        ...preVal,
        rowFields: [
          ...preVal?.rowFields,
          {
            sNo: preVal?.rowFields?.length + 1,
            // bagsCount: "",
            // bagWeight: "",

            description: "",
            hsnCode:
              invoiceDetails?.hsnCodes[invoiceDetails?.hsnCodes?.length - 1],
            quantity: "",
            unit: "",
            ratePMT: "",
            amount: "",
          },
        ],
      };
    });
  };
  const handleRemoveLastRowField = () => {
    setItemsSellForm((preVal) => {
      const lastRow = preVal.rowFields[preVal?.rowFields?.length - 1];
      const values = { ...preVal };
      values.totalProductAmount = values.totalProductAmount - lastRow.amount;
      const [gstType, grandTotal, roundOff] = updateGstType(
        values,
        values.gstType,
      );
      values.gstType = gstType;
      values.grandTotal = grandTotal;
      values.roundOff = roundOff;
      return {
        ...values,
        rowFields: [...preVal.rowFields.slice(0, preVal.rowFields.length - 1)],
      };
    });
  };

  useEffect(() => {
    if (invoiceDetails?.nextInvoiceNo) {
      const buyerGst = formValues?.buyerDetails?.gst;
      setHsnCodeDDOptions(invoiceDetails?.hsnCodes);
      setProductsDDOptions(invoiceDetails?.products);
      setUnitsDDOptions(invoiceDetails?.units);
      setGstDDOptions(invoiceDetails?.gsts);
      const values = { ...itemsSellForm };
      if (!values.rowFields[0]["hsnCode"]) {
        values.rowFields[0]["hsnCode"] =
          invoiceDetails?.hsnCodes?.[invoiceDetails?.hsnCodes?.length - 1];
      }
      if (!values.rowFields[0]["description"]) {
        values.rowFields[0]["description"] = "";
      }
      if (!values.rowFields[0]["amount"]) {
        values.rowFields[0]["amount"] = "";
      }
      if (!values.rowFields[0]["quantity"]) {
        values.rowFields[0]["quantity"] = "";
      }
      if (!values.rowFields[0]["ratePMT"]) {
        values.rowFields[0]["ratePMT"] = "";
      }
      values.gstType = {
        type:
          buyerGst && buyerGst?.startsWith("23")
            ? options[1].value
            : options[0].value,
        value:
          buyerGst && buyerGst?.startsWith("23")
            ? Number(invoiceDetails?.sgst) + Number(invoiceDetails?.cgst)
            : Number(invoiceDetails?.igst),
        gstAmount: values.gstType.gstAmount ? values.gstType.gstAmount : 0,
      };
      setItemsSellForm(values);
    }
  }, [invoiceDetails, formValues]);
  useEffect(() => {
    getUpdatedItemsSellValue(itemsSellForm);
  }, [itemsSellForm]);

  useEffect(() => {
    if (isInvoiceSave) {
      setItemsSellForm(initVal);
    }
  }, [isInvoiceSave]);

  useEffect(() => {
    if (productsSellDetails?.productsSell?.length) {
      const rowFieldsVal = productsSellDetails?.productsSell.map(
        (productSellDet) => {
          return {
            sNo: productSellDet?.sNo,
            // bagsCount: productSellDet?.bagsCount,
            // bagWeight: productSellDet?.bagWeight,

            description: productSellDet?.description,
            hsnCode: productSellDet?.hsnCode,
            quantity: productSellDet?.quantity,
            unit: productSellDet?.unit,
            ratePMT: productSellDet?.ratePMT,
            amount: productSellDet?.amount,
          };
        },
      );
      setItemsSellForm({
        rowFields: [...rowFieldsVal],
        totalProductAmount: productsSellDetails?.totalProductAmount,
        otherExpensesGSTText: productsSellDetails?.otherExpensesGSTText,
        otherExpensesGST: productsSellDetails?.otherExpensesGST,
        otherExpensesText: productsSellDetails?.otherExpensesText,
        otherExpenses: productsSellDetails?.otherExpenses,
        gstType: {
          type: productsSellDetails?.igst ? options[0].value : options[1].value,
          value: productsSellDetails?.igst
            ? productsSellDetails?.igst
            : productsSellDetails?.sgst,
          gstAmount: productsSellDetails?.gstAmount,
        },
        grandTotal: productsSellDetails?.grandTotal,
        roundOff: { ...productsSellDetails?.roundOff },
      });
    }
  }, [productsSellDetails]);

  const handleChange = (e, value, type, index) => {
    const values = { ...itemsSellForm };
    console.log("201", itemsSellForm, type, value);
    if (index || index === 0) {
      values.rowFields[index][type] =
        typeof e?.target?.value === "string"
          ? e?.target?.value?.toUpperCase()
          : e?.target?.value || value?.toUpperCase();
      if (["quantity", "ratePMT"].includes(type)) {
        const oldAmt = values.rowFields[index].amount;
        values.rowFields[index].amount = Number(
          values.rowFields[index].quantity * values.rowFields[index].ratePMT,
        ).toFixed(2);
        values.totalProductAmount =
          Number(values.totalProductAmount) +
          Number(
            Number(
              values.rowFields[index].quantity *
                values.rowFields[index].ratePMT,
            ).toFixed(2),
          ) -
          Number(oldAmt);
        const [gstType, grandTotal, roundOff] = updateGstType(
          values,
          values?.gstType,
        );
        values.gstType = gstType;
        values.grandTotal = grandTotal;
        values.roundOff = roundOff;
      }
    } else {
      if (type === "radioGST") {
        const gstVal = options.find((gstType) => gstType.value === value);
        const [gstType, grandTotal, roundOff] = updateGstType(values, {
          type: gstVal.value,
          value: values.gstType.value || gstVal.inputValue,
          gstAmount: 0,
        });
        values.gstType = gstType;
        values.grandTotal = grandTotal;
        values.roundOff = roundOff;
      }
      if (["igst", "sgst"].includes(type)) {
        const gstVal = options.find((gstType) => gstType.value === type);
        const [gstType, grandTotal, roundOff] = updateGstType(values, {
          type: gstVal.value,
          value: value,
          gstAmount: 0,
        });
        values.gstType = gstType;
        values.grandTotal = grandTotal;
        values.roundOff = roundOff;
      } else {
        values[type] = value?.toUpperCase();
        if (type === "otherExpenses" || type === "otherExpensesGST") {
          const [gstType, grandTotal, roundOff] = updateGstType(
            values,
            values.gstType,
          );
          values.gstType = gstType;
          values.grandTotal = grandTotal;
          values.roundOff = roundOff;
        }
      }
    }
    setItemsSellForm(values);
  };

  const updateGstType = (values, gstVal) => {
    const totalAmount = Number(
      Number(values.totalProductAmount) + Number(values.otherExpensesGST),
    ).toFixed(2);
    const grandTotalInDec = convertFixedDecimal(
      calculateGstAmount(gstVal.value, totalAmount) +
        Number(totalAmount) +
        Number(values.otherExpenses) || 0,
    );

    const roundOff = { added: false, amountInPaise: 0 };
    let [grandTotalBeforeDec, afterDec] = String(grandTotalInDec).includes(".")
      ? String(grandTotalInDec)?.split(".")
      : grandTotalInDec;
    if (afterDec?.length) {
      if (Number(afterDec) >= 50) {
        grandTotalBeforeDec = Number(grandTotalBeforeDec) + 1;
        roundOff.added = true;
        roundOff.amountInPaise = (100 - afterDec) / 100;
      } else {
        roundOff.amountInPaise = afterDec / 100;
      }
    }
    return [
      {
        type: gstVal.type,
        value: gstVal.value,
        gstAmount: calculateGstAmount(gstVal.value, totalAmount),
      },
      Number(grandTotalBeforeDec),
      roundOff,
    ];
  };

  return (
    <>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          S. No.
        </strong>
      </Grid>
      {/* <Grid xs={2} className="left-border">
        <strong className="bottom-border pb-1 text-center max-w-full block text-ellipsis whitespace-nowrap overflow-hidden">
          Bag Count & Weight (K.G)
          Bag Count & Unit
        </strong>
      </Grid> */}
      <Grid xs={3} className="left-border right-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Description of Goods
        </strong>
      </Grid>
      <Grid xs={1}>
        <strong className="flex bottom-border pb-1 justify-center w-full">
          HSN Code
        </strong>
      </Grid>
      <Grid xs={2} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Quantity
          {/* (MT) */}
        </strong>
      </Grid>
      <Grid xs={2} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          UNIT
        </strong>
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Rate
          {/* PMT */}
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

            <Grid xs={3} className="left-border right-border font-bold">
              <SearchableDD
                ddValue={itemsSellForm.rowFields[index]["description"]}
                onInputChangeDDSearch={(event, value) => {
                  handleChange(event, value, "description", index);
                }}
                ddOptions={productsDDOptions}
              />
            </Grid>
            <Grid xs={1}>
              <div className="pl-1">
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
                  className="outline-none block w-[100%] font-bold text-center"
                  type="number"
                  min={1}
                  value={itemsSellForm.rowFields[index]["quantity"]}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "quantity", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={2} className="left-border">
              <div className="flex gap-2 pl-1">
                {/* <input
                  placeholder="count"
                  className="outline-none block w-[100%] font-bold text-center"
                  type="number"
                  min={1}
                  value={itemsSellForm.rowFields[index]["bagsCount"]}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "bagsCount", index);
                  }}
                /> */}
                {/* <span>&</span> */}
                <SearchableDD
                  ddValue={itemsSellForm.rowFields[index]["unit"]}
                  onInputChangeDDSearch={(event, value) => {
                    handleChange(event, value, "unit", index);
                  }}
                  ddOptions={units}
                />
                {/* <input
                  placeholder="weight"
                  className="outline-none block w-[100%] font-bold text-center"
                  type="number"
                  min={1}
                  value={itemsSellForm.rowFields[index]["bagWeight"]}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "bagWeight", index);
                  }}
                /> */}
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block w-[100%] text-center"
                  type="number"
                  min={1}
                  value={itemsSellForm.rowFields[index]["ratePMT"]}
                  onChange={(e) => {
                    handleChange(e, e?.target?.value, "ratePMT", index);
                  }}
                />
              </div>
            </Grid>
            <Grid xs={2} className="left-border right-border">
              <div className="pr-1 text-center">
                <strong>{itemsSellForm.rowFields[index].amount}</strong>
              </div>
            </Grid>
          </>
        );
      })}
      <Grid
        xs={7}
        className="pl-1 pt-[2rem] form-border no-bottom-border no-right-border flex justify-between items-start gap-2"
      >
        <div>
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
        </div>
        <div className="mt-[16px] mr-[16px]">
          <span className="relative float-right">Special Case for GST</span>
          <Checkbox
            checked={formValues?.isShiptoBDSame}
            sx={{
              padding: "0",
              color: "#5a298b",
              "&.Mui-checked": {
                color: "#5a298b",
              },
            }}
            onChange={(e) => {
              // handleChange(e, !formValues?.isShiptoBDSame, "isShiptoBDSame");
            }}
          />
        </div>
      </Grid>
      <Grid
        xs={5}
        className="pl-1 h-[18rem] form-border no-bottom-border flex flex-col"
      >
        <div>
          <div className="flex justify-between pr-1">
            <div className="flex gap-3">
              <input
                type="text"
                className="outline-none max-w-42 font-bold"
                placeholder="Other Expenses (GST)..."
                onChange={(e) => {
                  handleChange(
                    e,
                    e?.target?.value,
                    "otherExpensesGSTText",
                    null,
                  );
                }}
                value={itemsSellForm.otherExpensesGSTText}
              />
              -
              <input
                type="number"
                className="outline-none w-28"
                placeholder="0000"
                value={itemsSellForm.otherExpensesGST}
                onChange={(e) => {
                  handleChange(e, e?.target?.value, "otherExpensesGST", null);
                }}
              />
            </div>
            <i>{itemsSellForm.otherExpensesGST}</i>
          </div>
          <div className="flex justify-between pr-1">
            <strong>Total Taxable Amount</strong>
            <strong>
              <i>
                {(
                  Number(itemsSellForm.totalProductAmount) +
                  Number(itemsSellForm.otherExpensesGST)
                ).toFixed(2)}
              </i>
            </strong>
          </div>

          {options.map((option) => (
            <div
              key={option.value}
              className={cx(
                "flex justify-between pr-1",
                itemsSellForm?.gstType.type !== option.value &&
                  "cursor-not-allowed opacity-50",
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
                  className="accent-primary"
                />
                <label htmlFor={option.value}>{option.label}</label>
                {/* <input
                  type="number"
                  value={itemsSellForm?.gstType.value || option.inputValue}
                  className="outline-none w-12"
                  onChange={(e, value) => {
                    handleChange(e, e?.target?.value, option.value, null);
                  }}
                /> */}
                <div>
                  <SearchableDD
                    ddValue={itemsSellForm?.gstType.value || option.inputValue}
                    onInputChangeDDSearch={(event, value) => {
                      handleChange(event, value, option.value, null);
                    }}
                    ddOptions={gstDDOptions}
                  />
                </div>
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
                value={itemsSellForm.otherExpenses}
                onChange={(e) => {
                  handleChange(e, e?.target?.value, "otherExpenses", null);
                }}
              />
            </div>
            <i>{itemsSellForm.otherExpenses}</i>
          </div>
        </div>
        <div className="flex justify-between pr-1">
          <strong>Round Off</strong>
          <span>
            {itemsSellForm.roundOff.added ? "+" : "-"}
            <i>{itemsSellForm.roundOff.amountInPaise}</i>
          </span>
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
          <strong>
            INDIAN RUPEE: {numberToWords(itemsSellForm.grandTotal)}
          </strong>
        </div>
        <span className="pr-1 pb-1">E. & O.E</span>
      </Grid>
    </>
  );
};
export default ItemsSell;
