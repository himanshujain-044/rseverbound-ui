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
  title: "TAX INVOICE",
};
// Create Document Component
const BillPdfGen = () => (
  <Document title="hima">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.title}</Text>
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
          <Text>67</Text>
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
          <Text>19-Dec-24</Text>
          <Text>Dated - Telephonic</Text>
          <Text>Destination - Alwar</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.senderDetails}>
          <Text>Name Of Buyer/Recipient - MAHABALI TRADERS</Text>
          <Text>SALEHABAD MAU U.P</Text>
          <Text>GSTIN/UIN: 09AQBPJ3640G1Z2</Text>
          <Text>State Name: Uttar Pradesh, Code: 09</Text>
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
          <Text>Vechicle No.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ width: "6%", paddingLeft: "2px", paddingTop: "2px" }}>
          <Text>S. No</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "10%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>Date</Text>
          <Text>12/12/2028</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "18%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>Description of Goods</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "12%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>Truck No.</Text>
          <Text>KA01AB1234</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "10%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>HSN Code</Text>
          <Text>1234</Text>
          <Text>2345</Text>
          <Text>3213</Text>
        </View>
        <View
          style={{
            width: "8%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>Quantity</Text>
          <Text>14.34</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "10%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>Rate PMT</Text>
          <Text>1234</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "10%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>IGST R/o</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View
          style={{
            width: "14%",
            borderLeft: "1px solid black",
            paddingLeft: "2px",
            paddingTop: "2px",
          }}
        >
          <Text>AMOUNT RS</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
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
          <Text>67576576578</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ width: "60%", paddingLeft: "2px", paddingTop: "2px" }}>
          <Text>Amount chargable</Text>
          <Text>Indian Rupees etrertb yug </Text>
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
          <Text>Company's PAN: SFD234DGF5656</Text>
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
          <Text>Branch & IFSC Code: SHAHGARH, SAGAR (M.P.) & CBIN0282030</Text>

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
      <View style={{ borderBottomWidth: 1, borderBottomColor: "black" }}></View>
    </Page>
  </Document>
);

export default BillPdfGen;
