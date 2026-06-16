import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button, Checkbox } from "@mui/material";
import logo from "../../../assets/logo/logo.png";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import {
  getAllBuyers,
  getInvoiceDetails,
  saveInvoiceDetails,
  updateInvoice,
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { DATED_OPTIONS } from "../../../constants/common";
import {
  formatDate,
  getStateNameByGstCode,
} from "../../../utils/helperFunction";
import ItemsSell from "./ItemsSell";
import signature from "../../../assets/images/signature.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import BillPdf from "../gen-pdf/BillPdf";
import { ROUTES_LIST } from "../../../constants/routes";
import DatePickerComp from "../../common/DatePickerComp/DatePickerComp";
let payload = {};
const formInitValues = {
  buyerDetails: {
    name: "",
    address: "",
    gst: "",
    state: "",
    placeOfSupply: "",
  },
  dated: DATED_OPTIONS[1],
  invoiceDate: formatDate(new Date()),
  date: formatDate(new Date()),
  etpNo: "",
  ewayBillNo: "",
  shipToDetails: { name: "", address: "", gst: "", state: "" },
  isShiptoBDSame: true,
  vehicleNo: "",
  destination: "",
  dispatchThrough: "",
  buyerOrderNoText: "Buyer Order No.",
  buyerOrderNoValue: "",
  transportCompany: "",
};
const BillForm = ({ data = null, className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(formInitValues);
  const [itemsSell, setItemsSell] = useState();
  const [billType, setBillType] = useState(
    data?.deliveryChNo ? "deliveryChallan" : "invoice",
  );
  const { invoiceDetails, allBuyers, isInvoiceSave, isInvoiceUpdated } =
    useSelector((state) => state.api);
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [vehiclesDDOptions, setVehiclesDDOptions] = useState([]);
  const [destinationsDDOptions, setDestinationsDDOptions] = useState([]);
  const [transportCompaniesDDOptions, setTransportCompaniesDDOptions] =
    useState([]);

  useEffect(() => {
    if (data?.invoiceNo || data?.deliveryChNo) {
      setFormValues({
        buyerDetails: {
          name: data?.buyerDetails?.name,
          address: data?.buyerDetails?.address,
          gst: data?.buyerDetails?.gst,
          state: data?.buyerDetails?.state,
          placeOfSupply: data?.buyerDetails?.placeOfSupply,
        },
        dated: data?.dated,
        invoiceDate: data?.invoiceDate,
        date: data?.date,
        etpNo: data?.etpNo,
        ewayBillNo: data?.ewayBillNo,
        shipToDetails: {
          name: data?.shipToDetails?.name,
          address: data?.shipToDetails?.address,
          gst: data?.shipToDetails?.gst,
          state: data?.shipToDetails?.state,
        },
        isShiptoBDSame: data?.isShiptoBDSame,
        vehicleNo: data?.vehicleNo,
        dispatchThrough: data?.dispatchThrough,
        destination: data?.destination,
        buyerOrderNoText: "Buyer Order No.",
        buyerOrderNoValue: data?.buyerOrderNoValue,
        transportCompany: data?.transportCompany,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!allBuyers?.length || isInvoiceSave) {
      dispatch(
        getAllBuyers({
          method: "get",
          endpoint: API_ENDPOINTS.getAllBuyers,
        }),
      );
    }
  }, [isInvoiceSave]);
  useEffect(() => {
    if (!invoiceDetails) {
      dispatch(
        getInvoiceDetails({
          method: "get",
          endpoint: API_ENDPOINTS.getBillNumber,
        }),
      );
    }

    if (allBuyers?.length) {
      const buyersNames = [];
      allBuyers.forEach((buyer) => {
        buyersNames.push(buyer?.name);
      });
      setBuyersNameDDOptions(buyersNames);
    }
  }, [allBuyers]);
  useEffect(() => {
    setVehiclesDDOptions(invoiceDetails?.vehicles);
    setDestinationsDDOptions(invoiceDetails?.destinations);
    setTransportCompaniesDDOptions(invoiceDetails?.transportCompanies);
  }, [invoiceDetails]);

  useEffect(() => {
    if (isInvoiceSave || isInvoiceUpdated) {
      setFormValues(formInitValues);
    }
  }, [isInvoiceSave, isInvoiceUpdated]);

  const handleChange = (e, value, type, isBillTo = true) => {
    const values = { ...formValues };
    if (["name", "address", "gst", "state"].includes(type)) {
      if (type === "name" && value) {
        const customerDetails = allBuyers.find((buyer) => buyer.name === value);
        if (customerDetails) {
          if (isBillTo) {
            values.buyerDetails = customerDetails;
          } else {
            values.shipToDetails = customerDetails;
          }
        } else {
          if (isBillTo) {
            values.buyerDetails = {
              name: value?.toUpperCase(),
              address: "",
              gst: "",
              state: "",
              placeOfSupply: "",
            };
          } else {
            values.shipToDetails = {
              name: value?.toUpperCase(),
              address: "",
              gst: "",
              state: "",
            };
          }
        }
      } else {
        if (isBillTo) {
          values.buyerDetails = {
            ...values.buyerDetails,
            [type]: value?.toUpperCase(),
          };
          if (type === "gst" && value) {
            const state = getStateNameByGstCode(value?.trim()?.substring(0, 2));
            values.buyerDetails.state = state;
            values.buyerDetails.placeOfSupply = state;
          }
        } else {
          values.shipToDetails = {
            ...values.shipToDetails,
            [type]: value?.toUpperCase(),
          };
          if (type === "gst" && value) {
            const state = getStateNameByGstCode(value?.trim()?.substring(0, 2));
            values.shipToDetails.state = state;
          }
        }
      }
    }
    if (type === "isShiptoBDSame") {
      values[type] = value;
    } else {
      values[type] = value?.toUpperCase();
      if (type === "vehicleNo") {
        let input = value
          .toUpperCase()
          .replace(/\s+/g, "")
          .replace(/[^A-Z0-9]/g, "");
        let formatted = "";
        let parts = [];

        // Define the lengths of each part in the vehicle number
        const partLengths = [2, 2, 2, 4];
        let i = 0;

        for (let len of partLengths) {
          if (input.length > i) {
            parts.push(input.substr(i, len));
            i += len;
          }
        }

        formatted = parts.join(" ");
        values[type] = formatted;
      }
    }
    setFormValues(values);
  };
  const getUpdatedItemsSellValue = (values) => {
    setItemsSell(values);
  };
  const handleGenerateInvoice = () => {
    payload = JSON.parse(
      JSON.stringify({
        billType,
        ...formValues,
        shipToDetails: formValues?.isShiptoBDSame
          ? formValues?.buyerDetails
          : formValues?.shipToDetails,
        ...(billType === "invoice" && {
          invoiceNo: invoiceDetails?.nextInvoiceNo,
        }),
        ...(billType !== "invoice" && {
          deliveryChNo: invoiceDetails?.nextDeliveryChNo,
        }),
        productsSellDetails: {
          productsSell: itemsSell?.rowFields,
          [itemsSell?.gstType?.type]: itemsSell["gstType"].value,
          gstAmount: Number(itemsSell["gstType"].gstAmount).toFixed(2),
          otherExpenses: Number(itemsSell.otherExpenses).toFixed(2),
          otherExpensesText: itemsSell.otherExpensesText,
          otherExpensesGST: Number(itemsSell.otherExpensesGST).toFixed(2),
          otherExpensesGSTText: itemsSell.otherExpensesGSTText,
          totalProductAmount: Number(itemsSell.totalProductAmount).toFixed(2),
          grandTotal: Number(itemsSell.grandTotal).toFixed(2),
          roundOff: itemsSell.roundOff,
        },
      }),
    );
    dispatch(
      saveInvoiceDetails({
        method: "post",
        endpoint: API_ENDPOINTS.saveInvoiceDetails,
        payload,
      }),
    );
  };

  const handleUpdateInvoice = () => {
    payload = JSON.parse(
      JSON.stringify({
        billType,
        ...formValues,
        shipToDetails: formValues?.isShiptoBDSame
          ? formValues?.buyerDetails
          : formValues?.shipToDetails,
        ...(billType === "invoice" && { invoiceNo: data?.invoiceNo }),
        ...(billType !== "invoice" && { deliveryChNo: data?.deliveryChNo }),
        productsSellDetails: {
          productsSell: itemsSell?.rowFields,
          [itemsSell?.gstType?.type]: itemsSell["gstType"].value,
          gstAmount: Number(itemsSell["gstType"].gstAmount).toFixed(2),
          otherExpenses: Number(itemsSell.otherExpenses).toFixed(2),
          otherExpensesText: itemsSell.otherExpensesText,
          otherExpensesGST: Number(itemsSell.otherExpensesGST).toFixed(2),
          otherExpensesGSTText: itemsSell.otherExpensesGSTText,
          totalProductAmount: Number(itemsSell.totalProductAmount).toFixed(2),
          grandTotal: Number(itemsSell.grandTotal).toFixed(2),
          roundOff: itemsSell.roundOff,
        },
        isWholeInvoiceUpdate: true,
      }),
    );
    dispatch(
      updateInvoice({
        method: "patch",
        endpoint: API_ENDPOINTS.updateInvoice,
        payload,
      }),
    );
  };

  const downloadPdf = async () => {
    const fileName = `${payload?.invoiceNo ? payload?.invoiceNo : payload?.deliveryChNo}_${payload?.invoiceDate}_${payload?.buyerDetails?.name}.pdf`;
    const blob = await pdf(<BillPdf data={payload} />).toBlob();
    saveAs(blob, fileName);
  };

  const onClickPdfView = () => {
    navigate(ROUTES_LIST.pdfViewer, { state: payload });
  };
  const handleOnInvoiceDateChange = (e) => {
    const values = { ...formValues };
    values.invoiceDate = formatDate(new Date(e));
    setFormValues(values);
  };

  const handleOnDateChange = (e) => {
    const values = { ...formValues };
    values.date = formatDate(new Date(e));
    setFormValues(values);
  };

  const isDisabled = (values) => {
    const checkItemsQuantity = itemsSell?.rowFields.every(
      (item) =>
        item.quantity && item.ratePMT && item.description && item.hsnCode,
    );
    return !(
      values?.buyerDetails?.name &&
      // values?.vehicleNo &&
      values?.destination &&
      checkItemsQuantity
    );
  };

  const onTypeChange = (e) => {
    setBillType(e?.target?.value);
  };

  return (
    <div
      className={cx(
        "w-full flex gap-8 min-w-[80rem] overflow-auto mobile:pr-4",
        className,
      )}
    >
      <Grid container className="bg-[#fff]">
        <Grid xs={3} className="form-border no-right-border">
          {/* <div className="text-center py-[20px] flex items-center"> */}
          <img
            src={logo}
            alt="logo"
            className=" mx-[4px] w-[98px] h-[88px] mobile:w-[45px]"
          />
          {/* </div> */}
        </Grid>
        <Grid
          xs={6}
          className="pl-1 pb-1 text-center form-border no-left-border no-right-border flex flex-col gap-0"
        >
          <h2 className="underline underline-offset-2">
            {billType === "invoice" ? "TAX INVOICE" : "DELIVERY CHALLAN"}
          </h2>
          <strong className="text-[26px] font-serif font-extrabold">
            Rocksunn Private Limited
          </strong>
          <span>NEAR VIVEKANAND COLLEGE, AMAMRMOU, SHAHGARH,</span>
          <span> SAGAR, MADHYA PRADESH - 470339</span>
          <span>PAN: AAPCR7561K</span>
          <strong>GSTIN/UIN: 23AAPCR7561K1ZT</strong>
        </Grid>
        <Grid xs={3} className="form-border no-left-border pr-[4px] text-right">
          <span>Original Copy</span>
        </Grid>
        <Grid xs={6} className="left-border bottom-border">
          <div className="pl-1 pb-1  bottom-border">
            <p>Invoice No.</p>
            <strong>
              {billType === "invoice"
                ? data?.invoiceNo || invoiceDetails?.nextInvoiceNo
                : data?.deliveryChNo || invoiceDetails?.nextDeliveryChNo}
            </strong>
          </div>
          <div className="pl-1 pb-1">
            <input
              type="text"
              className="outline-none max-w-[7.5rem]"
              placeholder="Buyer Order No."
              onChange={(e) => {
                handleChange(e, e?.target?.value, "buyerOrderNoText");
              }}
              value={formValues.buyerOrderNoText}
            />
            -
            <input
              type="text"
              className="outline-none w-[7rem] pl-1"
              onChange={(e) => {
                handleChange(e, e?.target?.value, "buyerOrderNoValue");
              }}
              value={formValues.buyerOrderNoValue}
            />
          </div>
          <div className="pl-1 pb-1 ">
            {/* <div className="pb-[0.4rem] bottom-border"> */}
            <p>Date</p>
            <div className="flex">
              <DatePickerComp
                value={formValues.date}
                onDateChange={handleOnDateChange}
              />
            </div>
            {/* </div> */}
          </div>
          {/* <div className="pl-1 pb-1">Dispatched through</div> */}
        </Grid>
        <Grid xs={6} className="form-border no-top-border">
          <div className="pb-[0.4rem] bottom-border">
            <p className="pl-1">Invoice Date</p>
            <div className="mx-1 flex">
              <DatePickerComp
                value={formValues.invoiceDate}
                onDateChange={handleOnInvoiceDateChange}
              />
            </div>
          </div>
          {/* <div className="pb-1 bottom-border flex">
            <span className="pl-1 min-w-[3.7rem]">Dated -</span>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "dated");
              }}
              ddValue={formValues.dated}
              ddOptions={DATED_OPTIONS}
            />
          </div> */}
          <div className="pb-1 flex">
            <span className="pl-1 min-w-[9rem]">Dispatch Through -</span>
            <input
              type="text"
              value={formValues?.dispatchThrough}
              onChange={(e) => {
                handleChange(e, e?.target?.value, "dispatchThrough");
              }}
              className="outline-none ml-1 w-[calc(100%_-_106px)]"
            />
          </div>
          <div className="pb-1 flex pl-1">
            <span className="min-w-[5.9rem]">Destination -</span>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "destination");
              }}
              ddValue={formValues.destination}
              ddOptions={destinationsDDOptions}
            />
          </div>
        </Grid>
        <Grid xs={6} className="pl-1 pb-1 form-border no-top-border">
          <div className="flex items-center">
            <strong className="min-w-[7rem]">Buyer (Bill To) -</strong>
            <strong className="w-[50%]">
              <SearchableDD
                onInputChangeDDSearch={(e, value) => {
                  handleChange(e, value, "name");
                }}
                ddValue={formValues?.buyerDetails.name}
                ddOptions={buyersNameDDOptions}
              />
            </strong>
            <div className="flex">
              <span>Keep Ship To as Bill To</span>
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
                  handleChange(
                    e,
                    !formValues?.isShiptoBDSame,
                    "isShiptoBDSame",
                  );
                }}
              />
            </div>
          </div>
          <span className="min-w-[7.3rem]">Address -</span>
          <input
            type="text"
            placeholder="Bill Address"
            value={formValues?.buyerDetails?.address}
            onChange={(e) => {
              handleChange(e, e?.target?.value, "address");
            }}
            className="w-[28rem] outline-none pl-2"
          />

          <div className="flex">
            <strong className="w-[3rem]">GST -</strong>
            <input
              type="text"
              value={formValues?.buyerDetails?.gst}
              onChange={(e) => {
                handleChange(e, e?.target?.value, "gst");
              }}
              className="outline-none font-bold"
            />
          </div>
          <div className="flex">
            <strong className="w-[3.4rem]">State -</strong>
            <span>{formValues?.buyerDetails.state}</span>
          </div>

          <div className="flex">
            <strong className="w-[7.8rem]">Place Of Supply - </strong>
            <span>{formValues?.buyerDetails.placeOfSupply}</span>
          </div>
        </Grid>
        <Grid xs={6} className="pl-1  bottom-border right-border">
          <div className="flex">
            <strong className="min-w-[3.5rem]">Consignee (Ship To) -</strong>
            <strong>
              <SearchableDD
                onInputChangeDDSearch={(e, value) => {
                  handleChange(e, value, "name", false);
                }}
                ddValue={
                  formValues?.isShiptoBDSame
                    ? formValues?.buyerDetails?.name
                    : formValues?.shipToDetails.name
                }
                ddOptions={buyersNameDDOptions}
              />
            </strong>
          </div>
          <span className="min-w-[7.3rem]">Address -</span>
          <input
            type="text"
            placeholder="Bill Address"
            value={
              formValues?.isShiptoBDSame
                ? formValues?.buyerDetails?.address
                : formValues?.shipToDetails.address
            }
            onChange={(e) => {
              handleChange(e, e?.target?.value, "address", false);
            }}
            className="w-[28rem] outline-none pl-2"
          />

          <div className="flex">
            <strong className="w-[3rem]">GST -</strong>
            <input
              type="text"
              value={
                formValues?.isShiptoBDSame
                  ? formValues?.buyerDetails?.gst
                  : formValues?.shipToDetails.gst
              }
              onChange={(e) => {
                handleChange(e, e?.target?.value, "gst", false);
              }}
              className="outline-none font-bold"
            />
          </div>
          <div className="flex">
            <strong className="w-[3.4rem]">State -</strong>
            <span>
              {formValues?.isShiptoBDSame
                ? formValues?.buyerDetails?.state
                : formValues?.shipToDetails.state}
            </span>
          </div>
        </Grid>
        {/* <Grid xs={3} className="form-border no-top-border">
          <div className="flex flex-col pl-1 pb-1">
            <div className="flex">
              <span className="min-w-[fit-content]">Transport Company -</span>
              <SearchableDD
                onInputChangeDDSearch={(e, value) => {
                  handleChange(e, value, "transportCompany");
                }}
                ddValue={formValues.transportCompany}
                ddOptions={transportCompaniesDDOptions}
              />
            </div>
            <div className="flex">
              <span className="min-w-[5.5rem]">Vechile No -</span>
              <SearchableDD
                onInputChangeDDSearch={(e, value) => {
                  handleChange(e, value, "vehicleNo");
                }}
                ddValue={formValues.vehicleNo}
                ddOptions={vehiclesDDOptions}
              />
            </div>
          </div>
        </Grid> */}
        <ItemsSell
          getUpdatedItemsSellValue={getUpdatedItemsSellValue}
          productsSellDetails={data?.productsSellDetails} // update invoice det
          formValues={formValues}
          billType={billType}
        />
        {billType === "invoice" ? (
          <>
            <Grid
              xs={7}
              className="pl-1 pb-1 form-border no-top-border flex flex-col justify-end"
            >
              <span>
                {/* <u>Declaration</u> */}
                <u>Terms and Condition</u>
              </span>
              <p>
                a) This Bill is payable by Electronic transfer/ DD/ Cheque in
                favor of Rocksunn Private Limited. Please make payment within 15
                days of receipt of this invoice.
              </p>
              <p>
                b) Bank Details: Central Bank Of India, Bus Stand, Shahgarh,
                Sagar, Madhya Pradesh - 470339. Account Number: 5986045772, IFSC
                Code: CBIN0282030
              </p>
              <p>
                c) For payment made by electronic fund transfer, please send
                details to receipt@rseverbound.com (Invoice number, Invoice
                amount, Rocksunn Bank name and Account number, Payment date,
                Amount paid, TDS). Queries can be sent to us at
                receipt@rseverbound.com.
              </p>
            </Grid>
            <Grid xs={5} className="form-border no-left-border no-top-border">
              <div className="pl-1 pb-1 flex flex-col">
                <span>Company's Bank Details</span>
                <strong>A/c Holder's Name: Rock Sunn</strong>
                <strong>Bank Name: Central Bank of India</strong>
                <strong>A/c No.: 5986045772</strong>
                <strong>
                  Branch & IFSC Code: SHAHGARH, SAGAR (M.P.) & CBIN0282030
                </strong>
              </div>
              <div className="pr-1 pb-1 flex flex-col text-right top-border">
                <strong>for Rock Sunn</strong>
                <div className="flex justify-end">
                  <img src={signature} width="100px" />
                </div>
                <span>Authorised Signatory</span>
              </div>
            </Grid>
          </>
        ) : (
          <Grid xs={12} className="form-border no-top-border">
            <div className="pr-1 pb-1 flex flex-col text-right">
              <strong>for Rock Sunn</strong>
              <div className="flex justify-end">
                <img src={signature} width="100px" />
              </div>
              <span>Authorised Signatory</span>
            </div>
          </Grid>
        )}
        {/* <Grid
          xs={12}
          className="mt-2 mb-1 flex flex-col justify-center items-center"
        >
          <span>SUBJECT TO SAGAR JURISDICTION</span>
          <span>This is a computer generated invoice</span>
        </Grid> */}
      </Grid>
      <div className="mt-2 flex flex-col gap-4">
        <div className="mx-1 p-1 rounded form-border">
          <strong>Type</strong>
          <RadioGroup
            sx={{
              padding: "0",
              "& .MuiRadio-root": {
                color: "#5a298b",
              },
              "& .MuiRadio-root.Mui-checked": {
                color: "#5a298b",
              },
            }}
            // defaultValue="invoice"
            value={billType}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="invoice"
              control={<Radio />}
              label="Invoice"
              onChange={onTypeChange}
              disabled={data?.invoiceNo || data?.deliveryChNo}
            />
            <FormControlLabel
              value="deliveryChallan"
              control={<Radio />}
              label="Delivery Challan"
              onChange={onTypeChange}
              disabled={data?.invoiceNo || data?.deliveryChNo}
            />
          </RadioGroup>
        </div>
        <Button
          variant="contained"
          className={cx(
            "w-[220px] mobile:text-[12px] mobile:h-[30px]",
            //   componentLoader && "bg-none",
            "bg-primary hover:bg-primary",
          )}
          disabled={isDisabled(formValues)}
          onClick={
            data?.invoiceNo || data?.deliveryChNo
              ? handleUpdateInvoice
              : handleGenerateInvoice
          }
        >
          {data?.invoiceNo
            ? "Update Invoice"
            : data?.deliveryChNo
              ? "Update Delivery Challan"
              : "Generate Invoice"}
        </Button>
        {(isInvoiceSave || isInvoiceUpdated) && (
          <>
            <Button
              variant="contained"
              className={cx(
                "w-[220px] mobile:text-[12px] mobile:h-[30px]",
                "bg-primary hover:bg-primary",
              )}
              onClick={downloadPdf}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              className={cx(
                "w-[220px] mobile:text-[12px] mobile:h-[30px]",
                //   componentLoader && "bg-none",
                "bg-primary hover:bg-primary",
              )}
              // disabled={!validator.isEmail(email) || componentLoader}
              onClick={onClickPdfView}
            >
              View PDF
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default BillForm;
