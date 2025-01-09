import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "#fff",
    padding: "8px",
    fontSize: "10px",
    lineHeight: "16px",
  },
  section: {
    flexDirection: "row",
    border: "1px solid black",
    margin: "0",
    borderBottom: "none",
    // width: "100%",
    // margin: 10,
    // padding: 4,
    // flexGrow: 1,
    // border: 1,
  },
  title: {
    textDecoration: "underline",
    // borderTop: "1px solid black",
    // borderBottom:"none",
    width: "100%",
    textAlign: "center",
    padding: "4px",
  },
  senderDetails: {
    width: "45%",
    paddingLeft: "2px",
    paddingTop: "2px",
  },
  invoiceNumberCol: {
    width: "30%",
  },
  dated: {
    width: "25%",
  },
});
const data = {
  buyerDetails: {
    name: "H.J Chemical Pvt Ltd",
    gst: "9AABCJ6679L1ZW",
    state: "Uttar Pradesh",
    address: "Janaura, Feijabad, U.P",
  },
  dated: "Telephonic",
  date: "8-Jan-25",
  vehicleNo: "UP95T359",
  destination: "sagar",
  name: "H.J Chemical Pvt Ltd",
  state: "Uttar Pradesh",
  invoiceNo: "1",
  productsSellDetails: {
    productsSell: [
      {
        sNo: 1,
        description: 0,
        hsnCode: "12",
        quantity: "22",
        ratePMT: "2",
        amount: 44,
      },
    ],
    igst: 5,
    gstAmount: 2.2,
    otherExpenses: 0,
    grandTotal: 0,
  },
};
const BillPdfGen = ({ data = {} }) => {
  console.log("49", data);
  return (
    <Document title={"H.J Chemical Pvt Ltd"}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>TAX INVOICE</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.senderDetails}>
            <Text>MADHUVAN MINERALS & INDUSTRIES</Text>
            <Text>WARD 31,NADI KE PASS,MAIN ROAD,</Text>
            <Text>SHAHGARH, SAGAR - 470339, MP, INDIA</Text>
            <Text>GSTIN/UIN: 23ABAFM01191ZF</Text>
            <Text>State Name: Madhya Pradesh, Code: 23</Text>
            <Text>Contact - 7000042043, 9685520593</Text>
          </View>
          <View
            style={{
              width: "30%",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Invoice No.</Text>
            <Text>{"1"}</Text>
            <Text>Buyer Order number</Text>
            <Text>Dispatched through</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Dated</Text>
            <Text>{"8-Jan-25"}</Text>
            <Text>Dated - {"Telephonic"}</Text>
            <Text>Destination - {"Sagar"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.senderDetails}>
            <Text>Buyer's Name - {"H.J Chemical Pvt Ltd"}</Text>
            <Text>{"Shahgarh, Amamrou, Sagar"}</Text>
            <Text>GSTIN/UIN: {"AAWQE342DREF"}</Text>
            <Text>State - {"Uttar Pradesh"}</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              width: "30%",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Bill of Loading / LR No.</Text>
          </View>
          <View
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Vechicle No. - {"UP 34 EE33"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "6%", paddingTop: "2px", textAlign: "center" }}>
            <Text>S. No</Text>
          </View>
          <View
            style={{
              width: "28%",
              borderLeft: "1px solid black",
              paddingTop: "2px",
              textAlign: "center",
            }}
          >
            <Text>Description of Goods</Text>
          </View>
          <View
            style={{
              width: "16%",
              borderLeft: "1px solid black",
              paddingTop: "2px",
              textAlign: "center",
            }}
          >
            <Text>HSN Code</Text>
          </View>
          <View
            style={{
              width: "12%",
              borderLeft: "1px solid black",
              paddingTop: "2px",
              textAlign: "center",
            }}
          >
            <Text>Quantity</Text>
          </View>
          <View
            style={{
              width: "13%",
              borderLeft: "1px solid black",
              paddingTop: "2px",
              textAlign: "center",
            }}
          >
            <Text>Rate PMT</Text>
          </View>
          <View
            style={{
              width: "25%",
              borderLeft: "1px solid black",
              paddingTop: "2px",
              textAlign: "center",
            }}
          >
            <Text>AMOUNT RS</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "6%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>1</Text>
          </View>
          <View
            style={{
              width: "28%",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>PQ</Text>
          </View>
          <View
            style={{
              width: "16%",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>1232</Text>
          </View>
          <View
            style={{
              width: "12%",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>11.2</Text>
          </View>
          <View
            style={{
              width: "13%",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>1200</Text>
          </View>
          <View
            style={{
              width: "25%",
              borderLeft: "1px solid black",
              paddingRight: "2px",
              paddingTop: "2px",
              textAlign: "right",
            }}
          >
            <Text>13453</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "50%", paddingTop: "2px" }}>
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
            }}
          >
            <View style={{ paddingLeft: "2px" }}>
              {" "}
              <Text>{"12,34,34,"}</Text>
              <Text>{"12,34,34,"}</Text>
              <Text>{"12,34,34,"}</Text>
            </View>

            <View>
              <Text>{"12,34,34,"}</Text>
              <Text>{"12,34,34,"}</Text>
              <Text>{"12,34,34,"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "60%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>Grand Total</Text>
          </View>
          <View
            style={{
              width: "40%",
              textAlign: "right",
              paddingRight: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>{"12,34,34,"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ width: "60%", paddingLeft: "2px", paddingTop: "2px" }}>
            <Text>Amount Chargable</Text>
            <Text>Indian Rupees: </Text>
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
            <Text>Company's PAN: ABAFM0119P</Text>
          </View>
          <View
            style={{
              width: "60%",
              marginLeft: "20px",
              borderLeft: "1px solid black",
              paddingLeft: "2px",
              paddingTop: "2px",
            }}
          >
            <Text>Company's Bank Details</Text>
            <Text>A/c Holder's Name: MADHUVAN MINERALS & INDUSTRIES</Text>
            <Text>Bank Name: Central Bank of India</Text>
            <Text>A/c No.: 3734793516</Text>
            <Text>
              Branch & IFSC Code: SHAHGARH, SAGAR (M.P.) & CBIN0282030
            </Text>

            <View
              style={{
                width: "100%",
                textAlign: "right",
                borderTop: "1px solid black",
                paddingRight: "2px",
                paddingTop: "2px",
              }}
            >
              <Text>for MADHUVAN MINERALS & INDUSTRIES</Text>
              <Text>Authorised Signatory</Text>
            </View>
          </View>
        </View>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
        ></View>
      </Page>
    </Document>
  );
};

export default BillPdfGen;
