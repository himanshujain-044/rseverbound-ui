import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
import {
  getAllBuyers,
  getAllProducts,
  getAllVehicles,
  getBillNumber,
  saveInvoiceDetails,
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { DATED_OPTIONS } from "../../../constants/common";
import { formatDate } from "../../../utils/helperFunction";
import ItemsSell from "./ItemsSell";
import BillPdfGen from "../bill-pdf/BillPdfGen";
import { ROUTES_LIST } from "../../../constants/routes";
let payload = {};
const formInitValues = {
  buyerDetails: { name: "", address: "", gst: "", state: "" },
  dated: DATED_OPTIONS[1],
  date: formatDate(new Date()),
  vehicleNo: "",
  destination: "",
};
const BillForm = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValue] = useState(formInitValues);
  const [itemsSell, setItemsSell] = useState();
  const { billNumber, allBuyers, allVehicles, allProducts, isInvoiceSave } =
    useSelector((state) => state.api);
  const [buyersNameDDOptions, setBuyersNameDDOptions] = useState([]);
  const [vehiclesDDOptions, setVehiclesDDOptions] = useState([]);

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
      allVehicles.forEach((vehicle) => {
        vehicles.push(vehicle?.vehicleNumber);
      });
      console.log("38", vehicles);
      setVehiclesDDOptions(vehicles);
    }
  }, [allVehicles]);

  const handleChange = (e, value, type) => {
    const values = { ...formValues };
    console.log("input value", e?.target?.value, value, type);
    if (["name", "address", "gst", "state"].includes(type)) {
      if (type === "name" && value) {
        const buyerDetails = allBuyers.find((buyer) => buyer.name === value);
        if (buyerDetails) {
          values.buyerDetails = buyerDetails;
        } else {
          values.buyerDetails = {
            name: value,
            address: "",
            gst: "",
            state: "",
          };
        }
      }
    }
    values[type] = value;
    setFormValue(values);
  };
  const getUpdatedItemsSellValue = (values) => {
    setItemsSell(values);
  };
  const handleGenerateInvoice = () => {
    payload = {
      ...formValues,
      invoiceNo: billNumber,
      productsSellDetails: {
        productsSell: itemsSell?.rowFields,
        [itemsSell?.gstType?.type]: itemsSell["gstType"].value,
        gstAmount: Number(itemsSell["gstType"].gstAmount),
        otherExpenses: Number(itemsSell.otherExpenses),
        grandTotal: Number(itemsSell.otherExpenses),
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
    console.log("140", payload);
    const fileName = `${payload.buyerDetails.name}_${formValues.date}.pdf`;
    const blob = await pdf(<BillPdfGen data={payload} />).toBlob();
    saveAs(blob, fileName);
  };

  const onClickPdfView = () => {
    navigate({
      pathname: ROUTES_LIST.pdfViewer,
      pdfData: new URLSearchParams(payload).toString(),
    });
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
          <span>WARD 31, NADI KE PASS, MAIN ROAD,</span>
          <span>SHAHGARH, SAGAR - 470339, MP, INDIA</span>
          <strong>GSTIN/UIN: 23ABAFM01191ZF</strong>
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
            <p className="pl-1">Date</p>
            <strong className="pl-1">{formValues.date}</strong>
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

          <SearchableDD
            onInputChangeDDSearch={(e, value) => {
              handleChange(e, value, "address");
            }}
            ddValue={formValues?.buyerDetails.address}
          />

          <div className="flex">
            <h6 className="w-[3rem]">GST -</h6>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "gst");
              }}
              ddValue={formValues?.buyerDetails.gst}
              ddOptions={buyersNameDDOptions}
            />
          </div>
          <div className="flex">
            <strong className="w-[4rem]">State -</strong>
            <SearchableDD
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "state");
              }}
              ddValue={formValues?.buyerDetails.state}
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
              onInputChangeDDSearch={(e, value) => {
                handleChange(e, value, "vehicleNo");
              }}
              ddValue={formValues.vehicleNo}
              ddOptions={vehiclesDDOptions}
            />
          </div>
        </Grid>
        <ItemsSell getUpdatedItemsSellValue={getUpdatedItemsSellValue} />
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
      <div className="mt-2 flex flex-col gap-4">
        <Button
          variant="contained"
          className={cx(
            "w-[220px] mobile:text-[12px] mobile:h-[30px]",
            //   componentLoader && "bg-none",
            "bg-primary hover:bg-primary"
          )}
          // disabled={!validator.isEmail(email) || componentLoader}
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
