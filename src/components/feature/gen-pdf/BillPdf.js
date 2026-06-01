import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { numberToWords } from "../../../utils/helperFunction";
import logo from "../../../assets/logo/logo.png";
import cancelled from "../../../assets/images/cancelled.png";
import signature from "../../../assets/images/signature.png";

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    border: "1px solid black",
    margin: "0",
    borderBottom: "none",
  },
});

const BillPdfGen = ({ data = {} }) => {
  console.log("pdf data", data);
  const pdfTitle = `${data?.invoiceNo ? data?.invoiceNo : data?.deliveryChNo}_${data?.invoiceDate}_${data?.buyerDetails?.name}`;
  return (
    <Document title={pdfTitle} key={pdfTitle}>
      <Page
        size="A4"
        style={{
          flexDirection: "col",
          backgroundColor: "#fff",
          padding: "8px",
          fontSize: "10px",
          lineHeight: "16px",
        }}
        key="pdf-page"
      >
        <View style={styles.section}>
          <Image style={{ padding: "2px", width: "45px" }} src={logo} />
          <Text
            style={{
              textDecoration: "underline",
              width: "80%",
              textAlign: "center",
              padding: "4px",
              paddingTop: "14px",
            }}
          >
            {data?.invoiceNo ? "TAX INVOICE" : "DELIVERY CHALLAN"}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={{ width: "45%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text style={{ fontFamily: "Times-Bold", fontSize: "13px" }}>
              Rocksunn Private Limited
            </Text>
            <Text>NEAR VIVEKANAND COLLEGE,</Text>
            <Text>AMAMRMOU, SHAHGARH, SAGAR - 470339, MP, INDIA</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              GSTIN/UIN: 23AAPCR7561K1ZT
            </Text>
            <Text>State Name: Madhya Pradesh, Code: 23</Text>
            <Text>Contact - 8349112391</Text>
          </View>
          <View
            style={{
              width: "30%",
              borderLeft: "1px solid black",

              paddingTop: "2px",
            }}
          >
            <View style={{ paddingLeft: "2px" }}>
              <Text>Invoice No.</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {data?.invoiceNo ? data?.invoiceNo : data?.deliveryChNo}
              </Text>
            </View>
            <View style={{ borderBottom: "1px solid black" }}></View>

            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              {data?.buyerOrderNoText} - {data?.buyerOrderNoValue}
            </Text>

            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Date - {data?.date}
            </Text>
          </View>

          <View
            style={{
              borderLeft: "1px solid black",
              width: "25%",
              paddingTop: "2px",
            }}
          >
            <View style={{ paddingLeft: "2px" }}>
              <Text>Invoice Date</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {data?.invoiceDate}
              </Text>
            </View>
            <View style={{ borderBottom: "1px solid black" }}></View>

            {/* <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Dated - {data?.dated}
            </Text> */}
            {/* <View style={{ borderBottom: "1px solid black" }}></View> */}
            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Dispatch Through - {data?.dispatchThrough}
            </Text>
            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Destination - {data?.destination}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "45%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              Buyer (Bill To) - {data?.buyerDetails?.name}
            </Text>
            <Text>Address - {data?.buyerDetails?.address}</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              GSTIN/UIN: {data?.buyerDetails?.gst}
            </Text>
            <Text>State - {data?.buyerDetails?.state}</Text>
            <Text>Place Of Supply - {data?.buyerDetails?.placeOfSupply}</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              width: "50%",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              Consignee (Ship To) - {data?.shipToDetails?.name}
            </Text>
            <Text>Address - {data?.shipToDetails?.address}</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              GSTIN/UIN: {data?.shipToDetails?.gst}
            </Text>
            <Text>State - {data?.shipToDetails?.state}</Text>
          </View>
          {/* <View
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text style={{ maxWidth: "24%" }}>
              Transport Company - {data?.transportCompany}
            </Text>
            <Text>Vechicle No. - {data?.vehicleNo}</Text>
          </View> */}
        </View>

        <View style={{ ...styles.section, fontFamily: "Helvetica-Bold" }}>
          <View style={{ width: "6%", paddingTop: "5px", textAlign: "center" }}>
            <Text>S. No</Text>
          </View>
          {/* {data?.productsSellDetails?.productsSell[0]?.bagsCount &&
            data?.productsSellDetails?.productsSell[0]?.bagWeight && (
              <View
                style={{
                  width: "26%",
                  borderLeft: "1px solid black",
                  paddingTop: "5px",
                  textAlign: "center",
                }}
              >
                <Text>Bag Count & Weight (K.G)</Text>
              </View>
            )} */}
          <View
            style={{
              width: "30%",
              // data?.productsSellDetails?.productsSell[0]?.bagsCount &&
              // data?.productsSellDetails?.productsSell[0]?.bagWeight
              //   ? "22%"
              //   : "30%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Description of Goods</Text>
          </View>
          <View
            style={{
              width: "13%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>HSN Code</Text>
          </View>
          <View
            style={{
              width: "16%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Quantity</Text>
          </View>
          <View
            style={{
              width: "26%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Unit</Text>
          </View>
          <View
            style={{
              width: "13%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Rate</Text>
          </View>
          <View
            style={{
              width: "30%",
              // data?.productsSellDetails?.productsSell[0]?.bagsCount &&
              // data?.productsSellDetails?.productsSell[0]?.bagWeight
              //   ? "12%"
              //   : "30%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Amount Rs</Text>
          </View>
        </View>

        {data?.productsSellDetails?.productsSell?.map((productSell) => {
          return (
            <View style={styles.section}>
              <View
                style={{
                  width: "6%",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.sNo}</Text>
              </View>
              {/* {productSell?.bagsCount && productSell?.bagWeight && (
                <View
                  style={{
                    width: "26%",
                    borderLeft: "1px solid black",
                    paddingLeft: "2px",
                    paddingTop: "5px",
                    textAlign: "center",
                  }}
                >
                  <Text>
                    {productSell?.bagsCount} & {productSell?.bagWeight}
                  </Text>
                </View>
              )} */}
              <View
                style={{
                  width: "30%",
                  // data?.productsSellDetails?.productsSell[0]?.bagsCount &&
                  // data?.productsSellDetails?.productsSell[0]?.bagWeight
                  //   ? "22%"
                  //   : "30%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  fontFamily: "Helvetica-Bold",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.description}</Text>
              </View>
              <View
                style={{
                  width: "13%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.hsnCode}</Text>
              </View>
              <View
                style={{
                  width: "16%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  fontFamily: "Helvetica-Bold",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.quantity}</Text>
              </View>
              <View
                style={{
                  width: "26%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  fontFamily: "Helvetica-Bold",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.unit}</Text>
              </View>
              <View
                style={{
                  width: "13%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  textAlign: "center",
                }}
              >
                <Text>{productSell?.ratePMT}</Text>
              </View>
              <View
                style={{
                  width: "30%",
                  // data?.productsSellDetails?.productsSell[0]?.bagsCount &&
                  // data?.productsSellDetails?.productsSell[0]?.bagWeight
                  //   ? "12%"
                  //   : "30%",
                  borderLeft: "1px solid black",
                  paddingRight: "2px",
                  paddingTop: "5px",
                  textAlign: "center",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                <Text>{productSell?.amount}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.section}>
          <View
            style={{
              width: "61.9%",
              paddingTop: "2px",
              paddingBottom: `${220 - data?.productsSellDetails?.productsSell?.length * 10}px`,
            }}
          >
            <Text></Text>
          </View>
          {data?.invoiceNo ? (
            <View
              style={{
                width: "38%",
                borderLeft: "1px solid black",
                paddingRight: "2px",
                paddingTop: "2px",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ paddingLeft: "2px" }}>
                <Text style={{ marginTop: "2px" }}>
                  {data?.productsSellDetails?.otherExpensesGSTText}
                </Text>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  Taxable Value
                </Text>
                {data?.productsSellDetails?.igst && (
                  <Text>{`IGST - ${data?.productsSellDetails?.igst} %`}</Text>
                )}
                {data?.productsSellDetails?.sgst && (
                  <>
                    <Text>{`SGST - ${
                      Number(data?.productsSellDetails?.sgst) / 2
                    }  %`}</Text>
                    <Text>{`CGST - ${Number(
                      data?.productsSellDetails?.sgst / 2,
                    )} %`}</Text>
                  </>
                )}
                <Text>{data?.productsSellDetails?.otherExpensesText}</Text>
                <Text>Round Off</Text>
              </View>

              <View style={{ fontFamily: "Times-Italic", fontStyle: "italic" }}>
                <Text style={{ marginTop: "2px" }}>
                  {data?.productsSellDetails?.otherExpensesGST > 0
                    ? data?.productsSellDetails?.otherExpensesGST
                    : ""}
                </Text>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  {Number(
                    data?.productsSellDetails?.totalProductAmount +
                      data?.productsSellDetails?.otherExpensesGST,
                  ).toFixed(2)}
                </Text>

                {data?.productsSellDetails?.igst && (
                  <Text>{data?.productsSellDetails?.gstAmount}</Text>
                )}
                {data?.productsSellDetails?.sgst && (
                  <>
                    <Text>
                      {Number(data?.productsSellDetails?.gstAmount) / 2}
                    </Text>
                    <Text>
                      {Number(data?.productsSellDetails?.gstAmount) / 2}
                    </Text>
                  </>
                )}
                <Text>
                  {data?.productsSellDetails?.otherExpenses > 0
                    ? data?.productsSellDetails?.otherExpenses
                    : ""}
                </Text>

                <Text>
                  {data?.productsSellDetails?.roundOff?.added ? "+" : "-"}
                  {data?.productsSellDetails?.roundOff?.amountInPaise}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: "38%",
                borderLeft: "1px solid black",
                paddingRight: "2px",
                paddingTop: "2px",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ paddingLeft: "2px" }}>
                <Text style={{ marginTop: "2px" }}>
                  {data?.productsSellDetails?.otherExpensesGSTText}
                </Text>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  Total Value
                </Text>
              </View>
              <View style={{ fontFamily: "Times-Italic", fontStyle: "italic" }}>
                <Text style={{ marginTop: "2px" }}>
                  {data?.productsSellDetails?.totalProductAmount}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ ...styles.section, fontFamily: "Helvetica-Bold" }}>
          <View
            style={{
              width: "61.9%",
              paddingRight: "2px",
              paddingTop: "5px",
              justifyContent: "flex-end",
              textAlign: "right",
            }}
          >
            <Text>Grand Total</Text>
          </View>
          <View
            style={{
              width: "38%",
              borderLeft: "1px solid black",
              textAlign: "right",
              paddingRight: "2px",
              paddingTop: "5px",
            }}
          >
            <Text>
              {data?.invoiceNo
                ? data?.productsSellDetails?.grandTotal
                : data?.productsSellDetails?.totalProductAmount}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "85%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>Amount in words</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              INDIAN RUPEE:{" "}
              {data?.invoiceNo
                ? numberToWords(data?.productsSellDetails?.grandTotal)
                : numberToWords(data?.productsSellDetails?.totalProductAmount)}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              textAlign: "right",
              paddingRight: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>E. & O.E</Text>
          </View>
        </View>

        {data?.invoiceNo ? (
          <View style={styles.section}>
            <View
              style={{
                width: "60%",
                // marginTop: "48px",
                justifyContent: "flex-end",
                paddingLeft: "2px",
                paddingTop: "2px",
              }}
            >
              <Text>Terms and Condition</Text>
              <Text>
                a) This Bill is payable by Electronic transfer/ DD/ Cheque in
                favor of Rocksunn Private Limited. Please make payment within 15
                days of receipt of this invoice.
              </Text>
              <Text>
                b) Bank Details: Central Bank Of India, Bus Stand, Shahgarh,
                Sagar, Madhya Pradesh - 470339. Account Number: 5986045772, IFSC
                Code: CBIN0282030
              </Text>
              <Text>
                c) For payment made by electronic fund transfer, please send
                details to receipt@rseverbound.com (Invoice number, Invoice
                amount, Rocksunn Bank name and Account number, Payment date,
                Amount paid, TDS). Queries can be sent to us at
                receipt@rseverbound.com.
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                marginLeft: "20px",
                borderLeft: "1px solid black",

                paddingTop: "2px",
              }}
            >
              <View
                style={{ paddingLeft: "2px", fontFamily: "Helvetica-Bold" }}
              >
                <Text>Company's Bank Details</Text>
                <Text>A/c Holder's Name: Rock Sunn</Text>
                <Text>Bank Name: Central Bank of India</Text>
                <Text>A/c No.: 5986045772</Text>
                <Text>
                  Branch & IFSC Code: SHAHGARH, SAGAR (M.P.) & CBIN0282030
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  textAlign: "right",
                  borderTop: "1px solid black",
                  paddingRight: "2px",
                  paddingTop: "2px",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  for Rock Sunn
                </Text>
                <Image style={{ width: "80px" }} src={signature} />
                <Text>Authorised Signatory</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            {/* <View
              style={{
                width: "40%",
                marginLeft: "20px",
                // borderLeft: "1px solid black",

                paddingTop: "2px",
              }}
            > */}
            <View
              style={{
                width: "100%",
                textAlign: "right",
                // borderTop: "1px solid black",
                paddingRight: "2px",
                paddingTop: "2px",
                justifyContent: "flex-end",
                alignContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                for Rock Sunn
              </Text>
              <Image style={{ width: "80px" }} src={signature} />
              <Text>Authorised Signatory</Text>
              {/* </View> */}
            </View>
          </View>
        )}
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
        ></View>
        {/* <View
          style={{
            width: "100%",
            marginTop: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>SUBJECT TO SAGAR JURISDICTION</Text>
          <Text>This is a computer generated invoice</Text>
        </View> */}

        {data?.isInvoiceCancel && (
          <Image
            style={{
              position: "absolute",
              display: "block",
              height: "100%",
              width: "100%",
              zIndex: "-1",
            }}
            src={cancelled}
          />
        )}
      </Page>
    </Document>
  );
};

export default BillPdfGen;
