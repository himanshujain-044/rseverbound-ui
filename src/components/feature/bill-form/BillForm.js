import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import {
  getAllBuyers,
  getInvoiceDetails,
  saveInvoiceDetails,
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { DATED_OPTIONS } from "../../../constants/common";
import {
  formatDate,
  getStateNameByGstCode,
} from "../../../utils/helperFunction";
import ItemsSell from "./ItemsSell";
import BillPdf from "../gen-pdf/BillPdf";
import { ROUTES_LIST } from "../../../constants/routes";
import DatePickerComp from "../../common/DatePickerComp/DatePickerComp";
let payload = {};
const formInitValues = {
  buyerDetails: { name: "", address: "", gst: "", state: "MP" },
  dated: DATED_OPTIONS[1],
  date: formatDate(new Date()),
  etpNo: "",
  ewayBillNo: "",
  vehicleNo: "",
  destination: "",
  buyerOrderNoText: "Buyer's Order No.",
  buyerOrderNoValue: "",
};
const BillForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(formInitValues);
  const [itemsSell, setItemsSell] = useState();
  const { invoiceDetails, allBuyers, isInvoiceSave } = useSelector(
    (state) => state.api
  );
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [vehiclesDDOptions, setVehiclesDDOptions] = useState([]);
  const [destinationsDDOptions, setDestinationsDDOptions] = useState([]);

  useEffect(() => {
    if (!invoiceDetails) {
      dispatch(
        getInvoiceDetails({
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
  }, [invoiceDetails]);

  const handleChange = (e, value, type) => {
    const values = { ...formValues };
    if (["name", "address", "gst", "state"].includes(type)) {
      if (type === "name" && value) {
        const buyerDetails = allBuyers.find((buyer) => buyer.name === value);
        if (buyerDetails) {
          values.buyerDetails = buyerDetails;
        } else {
          values.buyerDetails = {
            name: value?.toUpperCase(),
            address: "",
            gst: "",
            state: "",
          };
        }
      } else {
        values.buyerDetails = {
          ...values.buyerDetails,
          [type]: value?.toUpperCase(),
        };
        if (type === "gst" && value) {
          values.buyerDetails.state = getStateNameByGstCode(
            value.substring(0, 2)
          );
        }
      }
    }
    values[type] = value?.toUpperCase();
    setFormValues(values);
  };
  const getUpdatedItemsSellValue = (values) => {
    setItemsSell(values);
  };
  const handleGenerateInvoice = () => {
    payload = {
      ...formValues,
      invoiceNo: invoiceDetails?.nextInvoiceNo || 1,
      productsSellDetails: {
        productsSell: itemsSell?.rowFields,
        [itemsSell?.gstType?.type]: itemsSell["gstType"].value,
        gstAmount: Number(itemsSell["gstType"].gstAmount),
        otherExpenses: Number(itemsSell.otherExpenses),
        otherExpensesText: itemsSell.otherExpensesText,
        grandTotal: Number(itemsSell.grandTotal),
      },
    };
    dispatch(
      saveInvoiceDetails({
        method: "post",
        endpoint: API_ENDPOINTS.saveInvoiceDetails,
        payload,
      })
    );
  };

  const downloadPdf = async () => {
    const fileName = `${payload.buyerDetails.name}_${payload.date}.pdf`;
    const blob = await pdf(<BillPdf data={payload} />).toBlob();
    saveAs(blob, fileName);
  };

  const onClickPdfView = () => {
    navigate(ROUTES_LIST.pdfViewer, { state: payload });
  };
  const handleOnDateChange = (e) => {
    const values = { ...formValues };
    values.date = formatDate(new Date(e));
    setFormValues(values);
  };

  const isDisabled = (values) => {
    const checkItemsQuantity = itemsSell?.rowFields.every(
      (item) => item.quantity && item.ratePMT
    );
    return !(
      values?.buyerDetails?.name &&
      values?.vehicleNo &&
      values?.destination &&
      checkItemsQuantity
    );
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
          <h2 className="form-border text-center py-1 underline underline-offset-2">
            TAX INVOICE
          </h2>
        </Grid>
        <Grid
          xs={6}
          className="pl-1 pb-1 form-border no-top-border flex flex-col"
        >
          <strong>MADHUVAN MINERALS & INDUSTRIES</strong>
          <span>WARD 31, NADI KE PASS, MAIN ROAD,</span>
          <span>SHAHGARH, SAGAR - 470339, MP, INDIA</span>
          <strong>GSTIN/UIN: 23ABAFM01191ZF</strong>
          <span>Contact: 7000042043, 9755421008</span>
        </Grid>
        <Grid xs={3} className="bottom-border">
          <div className="pl-1 pb-1  bottom-border">
            <p>Invoice No.</p>
            <strong>{invoiceDetails?.nextInvoiceNo}</strong>
          </div>
          <div className="pl-1 pb-1">
            <input
              type="text"
              className="outline-none max-w-32"
              placeholder="Buyer's Order No."
              onChange={(e) => {
                handleChange(e, e?.target?.value, "buyerOrderNoText");
              }}
              value={formValues.buyerOrderNoText}
            />
            -
            <input
              type="text"
              className="outline-none w-28 pl-1"
              onChange={(e) => {
                handleChange(e, e?.target?.value, "buyerOrderNoValue");
              }}
              value={formValues.buyerOrderNoValue}
            />
          </div>
          {/* <div className="pl-1 pb-1">Dispatched through</div> */}
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="pb-[0.4rem] bottom-border">
            <p className="pl-1">Date</p>
            <div className="mx-1">
              <DatePickerComp
                value={formValues.date}
                onDateChange={handleOnDateChange}
              />
            </div>
          </div>
          <div className="pb-1 bottom-border flex">
            <span className="pl-1 min-w-[3.7rem]">Dated -</span>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "dated");
              }}
              ddValue={formValues.dated}
              ddOptions={DATED_OPTIONS}
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
          <div className="flex">
            <span className="min-w-[7.3rem]">Buyer's Name -</span>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "name");
              }}
              ddValue={formValues?.buyerDetails.name}
              ddOptions={buyersNameDDOptions}
            />
          </div>
          {/* <input placeholder="Enter " className="outline-none block" /> */}

          {/* <SearchableDD
            onInputChangeDDSearch={(e, value) => {
              handleChange(e, value, "address");
            }}
            ddValue={formValues?.buyerDetails.address}
          /> */}
          <span className="min-w-[7.3rem]">Address -</span>
          <input
            type="text"
            placeholder="Bill Address"
            value={formValues?.buyerDetails?.address}
            onChange={(e) => {
              handleChange(e, e?.target?.value, "address");
            }}
            className="outline-none pl-2"
          />

          <div className="flex">
            <h6 className="w-[3rem]">GST -</h6>
            <input
              type="text"
              value={formValues?.buyerDetails?.gst}
              onChange={(e) => {
                handleChange(e, e?.target?.value, "gst");
              }}
              className="outline-none"
            />
          </div>
          <div className="flex">
            <strong className="w-[3.4rem]">State -</strong>
            {/* <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "state");
              }}
              ddValue={formValues?.buyerDetails.state}
            /> */}
            <span>{formValues?.buyerDetails.state}</span>
          </div>
        </Grid>
        <Grid xs={3} className="bottom-border">
          <div className="pl-1 pb-1 ">
            <span className="w-[60px]">ETP No.</span>
            <input
              type="text"
              value={formValues?.etpNo}
              onChange={(e) => {
                handleChange(e, e?.target?.value, "etpNo");
              }}
              className="outline-none ml-1 w-[calc(100%_-_64px)]"
            />
          </div>
          <div className="pl-1 pb-1 ">
            <span className="w-[102px]">E-way Bill No.</span>
            <input
              type="text"
              value={formValues?.ewayBillNo}
              onChange={(e) => {
                handleChange(e, e?.target?.value, "ewayBillNo");
              }}
              className="outline-none ml-1 w-[calc(100%_-_106px)]"
            />
          </div>
        </Grid>
        <Grid xs={3} className="form-border no-top-border">
          <div className="flex pl-1 pb-1 ">
            <span className="min-w-[5.5rem]">Vechile No -</span>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "vehicleNo");
              }}
              ddValue={formValues.vehicleNo}
              ddOptions={vehiclesDDOptions}
            />
          </div>
        </Grid>
        <ItemsSell
          getUpdatedItemsSellValue={getUpdatedItemsSellValue}
          invoiceDetails={invoiceDetails}
        />
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
            <span className="mt-[3rem]">Authorised Signatory</span>
          </div>
        </Grid>
        <Grid
          xs={12}
          className="mt-2 mb-1 flex flex-col justify-center items-center"
        >
          <span>SUBJECT TO SAGAR JURISDICTION</span>
          <span>This is a computer generated invoice</span>
        </Grid>
      </Grid>
      <div className="mt-2 flex flex-col gap-4">
        <Button
          variant="contained"
          className={cx(
            "w-[220px] mobile:text-[12px] mobile:h-[30px]",
            //   componentLoader && "bg-none",
            "bg-primary hover:bg-primary"
          )}
          disabled={isDisabled(formValues)}
          onClick={handleGenerateInvoice}
        >
          Generate Invoice
        </Button>
        {isInvoiceSave && (
          <>
            <Button
              variant="contained"
              className={cx(
                "w-[220px] mobile:text-[12px] mobile:h-[30px]",
                "bg-primary hover:bg-primary"
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
                "bg-primary hover:bg-primary"
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
