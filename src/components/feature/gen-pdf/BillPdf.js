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
import cancelled from "../../../assets/images/cancelled.png";

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    border: "1px solid black",
    margin: "0",
    borderBottom: "none",
  },
});

const BillPdfGen = ({ data = {} }) => {
  return (
    <Document title={`${data?.buyerDetails?.name}_${data?.date}`}>
      <Page
        size="A4"
        style={{
          flexDirection: "col",
          backgroundColor: "#fff",
          padding: "8px",
          fontSize: "10px",
          lineHeight: "16px",
        }}
      >
        <View style={styles.section}>
          <Text
            style={{
              textDecoration: "underline",
              width: "100%",
              textAlign: "center",
              padding: "4px",
              paddingTop: "8px",
            }}
          >
            TAX INVOICE
          </Text>
        </View>

        <View style={styles.section}>
          <View style={{ width: "45%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              MADHUVAN MINERALS & INDUSTRIES
            </Text>
            <Text>WARD 31,NADI KE PASS,MAIN ROAD,</Text>
            <Text>SHAHGARH, SAGAR - 470339, MP, INDIA</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              GSTIN/UIN: 23ABAFM01191ZF
            </Text>
            <Text>State Name: Madhya Pradesh, Code: 23</Text>
            <Text>Contact - 7000042043, 9755421008</Text>
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
                {data?.invoiceNo}
              </Text>
            </View>
            <View style={{ borderBottom: "1px solid black" }}></View>

            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              {data?.buyerOrderNoText} - {data?.buyerOrderNoValue}
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
              <Text>Dated</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{data?.date}</Text>
            </View>
            <View style={{ borderBottom: "1px solid black" }}></View>

            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Dated - {data?.dated}
            </Text>
            <View style={{ borderBottom: "1px solid black" }}></View>
            <Text style={{ paddingLeft: "2px", paddingTop: "2px" }}>
              Destination - {data?.destination}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "45%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>Buyer's Name - {data?.buyerDetails?.name}</Text>
            <Text>{data?.buyerDetails?.address}</Text>
            <Text>GSTIN/UIN: {data?.buyerDetails?.gst}</Text>
            <Text>State - {data?.buyerDetails?.state}</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              width: "30%",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>ETP No. - {data?.etpNo}</Text>
            <Text>E-way Bill No. - {data?.ewayBillNo}</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Vechicle No. - {data?.vehicleNo}</Text>
          </View>
        </View>

        <View style={{ ...styles.section, fontFamily: "Helvetica-Bold" }}>
          <View style={{ width: "6%", paddingTop: "5px", textAlign: "center" }}>
            <Text>S. No</Text>
          </View>
          <View
            style={{
              width: "28%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Description of Goods</Text>
          </View>
          <View
            style={{
              width: "16%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>HSN Code</Text>
          </View>
          <View
            style={{
              width: "12%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Quantity (MT)</Text>
          </View>
          <View
            style={{
              width: "13%",
              borderLeft: "1px solid black",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Text>Rate PMT</Text>
          </View>
          <View
            style={{
              width: "25%",
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
              <View
                style={{
                  width: "28%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                <Text>{productSell?.description}</Text>
              </View>
              <View
                style={{
                  width: "16%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                }}
              >
                <Text>{productSell?.hsnCode}</Text>
              </View>
              <View
                style={{
                  width: "12%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",

                  fontFamily: "Helvetica-Bold",
                }}
              >
                <Text>{productSell?.quantity}</Text>
              </View>
              <View
                style={{
                  width: "13%",
                  borderLeft: "1px solid black",
                  paddingLeft: "2px",
                  paddingTop: "5px",
                }}
              >
                <Text>{productSell?.ratePMT}</Text>
              </View>
              <View
                style={{
                  width: "25%",
                  borderLeft: "1px solid black",
                  paddingRight: "2px",
                  paddingTop: "5px",
                  textAlign: "right",
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
            style={{ width: "50%", paddingTop: "2px", paddingBottom: "220px" }}
          >
            <Text></Text>
          </View>
          <View
            style={{
              width: "50%",
              borderLeft: "1px solid black",
              paddingRight: "2px",
              paddingTop: "2px",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: "220px",
            }}
          >
            <View style={{ paddingLeft: "2px" }}>
              {data?.productsSellDetails?.igst && (
                <Text>{`IGST - ${data?.productsSellDetails?.igst} %`}</Text>
              )}
              {data?.productsSellDetails?.sgst && (
                <>
                  <Text>{`SGST - ${
                    Number(data?.productsSellDetails?.sgst) / 2
                  }  %`}</Text>
                  <Text>{`CGST - ${Number(
                    data?.productsSellDetails?.sgst / 2
                  )} %`}</Text>
                </>
              )}
              <Text>{data?.productsSellDetails?.otherExpensesText}</Text>
            </View>

            <View style={{ fontFamily: "Times-Italic", fontStyle: "italic" }}>
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
            </View>
          </View>
        </View>

        <View style={{ ...styles.section, fontFamily: "Helvetica-Bold" }}>
          <View style={{ width: "60%", paddingLeft: "2px", paddingTop: "5px" }}>
            <Text>Grand Total</Text>
          </View>
          <View
            style={{
              width: "40%",
              textAlign: "right",
              paddingRight: "2px",
              paddingTop: "5px",
            }}
          >
            <Text>{data?.productsSellDetails?.grandTotal}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "60%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>Amount in words</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {numberToWords(data?.productsSellDetails?.grandTotal)}
            </Text>
          </View>
          <View
            style={{
              width: "40%",
              textAlign: "right",
              paddingRight: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>E. & O.E</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              width: "40%",
              marginTop: "48px",
              justifyContent: "flex-end",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Declaration</Text>
            <Text>
              We declare that this invoices shows the actaul price of the goods
              described and that all particulars are true and correct.
            </Text>
            <Text>
              Company's PAN:
              <Text style={{ fontFamily: "Helvetica-Bold" }}>ABAFM0119P</Text>
            </Text>
          </View>
          <View
            style={{
              width: "60%",
              marginLeft: "20px",
              borderLeft: "1px solid black",

              paddingTop: "2px",
            }}
          >
            <View style={{ paddingLeft: "2px", fontFamily: "Helvetica-Bold" }}>
              <Text>Company's Bank Details</Text>
              <Text>A/c Holder's Name: MADHUVAN MINERALS & INDUSTRIES</Text>
              <Text>Bank Name: Central Bank of India</Text>
              <Text>A/c No.: 3734793516</Text>
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
              }}
            >
              <Text
                style={{ fontFamily: "Helvetica-Bold", paddingBottom: "18px" }}
              >
                for MADHUVAN MINERALS & INDUSTRIES
              </Text>
              <Text>Authorised Signatory</Text>
            </View>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
        ></View>
        <View
          style={{
            width: "100%",
            marginTop: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>SUBJECT TO SAGAR JURISDICTION</Text>
          <Text>This is a computer generated invoice</Text>
        </View>

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
