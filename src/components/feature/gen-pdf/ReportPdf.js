import { Page, Text, View, Document } from "@react-pdf/renderer";
const ReportPdf = ({ data = [], title }) => {
  return (
    <Document>
      <Page style={{ padding: "8px 2px" }}>
        <View
          style={{
            textAlign: "center",
            fontFamily: "Helvetica-Bold",
            fontSize: "18px",
            padding: "6px",
          }}
        >
          <Text>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            fontSize: "10",
            textAlign: "center",
            border: "1px solid black",
            fontFamily: "Helvetica-Bold",
          }}
        >
          <Text
            style={{
              width: "11%",
              borderRight: "1px solid black",
              padding: "6px",
            }}
          >
            Billing Date
          </Text>
          <Text
            style={{
              width: "8%",
              borderRight: "1px solid black",
              padding: "6px",
            }}
          >
            Bill No.
          </Text>
          <Text
            style={{
              width: "16%",
              borderRight: "1px solid black",
              padding: "6px",
              paddingTop: "12px",
            }}
          >
            GSTIN
          </Text>
          <Text
            style={{
              width: "14%",
              borderRight: "1px solid black",
              padding: "6px",
              paddingTop: "12px",
            }}
          >
            Name
          </Text>
          <Text
            style={{
              width: "8%",
              borderRight: "1px solid black",
              padding: "6px",
            }}
          >
            Weight (MT)
          </Text>
          <Text
            style={{
              width: "8%",
              borderRight: "1px solid black",
              padding: "6px",
            }}
          >
            Billing Amount
          </Text>
          <Text
            style={{
              width: "7%",
              borderRight: "1px solid black",
              padding: "6px",
            }}
          >
            Other Expenses (GST)
          </Text>
          <Text
            style={{
              width: "6%",
              borderRight: "1px solid black",
              padding: "6px",
              paddingTop: "12px",
            }}
          >
            SGST
          </Text>
          <Text
            style={{
              width: "6%",
              borderRight: "1px solid black",
              padding: "6px",
              paddingTop: "12px",
            }}
          >
            CGST
          </Text>
          <Text
            style={{
              width: "6%",
              borderRight: "1px solid black",
              padding: "6px",
              paddingTop: "12px",
            }}
          >
            IGST
          </Text>
          <Text style={{ width: "10%", padding: "6px" }}>
            Total (Bill + Tax)
          </Text>
        </View>
        {data?.map((reportItem) => {
          return (
            <View
              style={{
                flexDirection: "row",
                fontSize: "8",
                textAlign: "center",
                border: "1px solid black",
                borderTop: "none",
              }}
            >
              <Text
                style={{
                  width: "11%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.date}
              </Text>
              <Text
                style={{
                  width: "8%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.invoiceNo}
              </Text>
              <Text
                style={{
                  width: "16%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.gst}
              </Text>
              <Text
                style={{
                  width: "14%",
                  borderRight: "1px solid black",
                  padding: "6px",
                }}
              >
                {reportItem?.name}
              </Text>
              <Text
                style={{
                  width: "8%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.weight}
              </Text>
              <Text
                style={{
                  width: "8%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.amount}
              </Text>
              <Text
                style={{
                  width: "7%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.otherExpensesGST}
              </Text>
              <Text
                style={{
                  width: "6%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.["sgst"] ? reportItem?.gstAmount / 2 : ""}
              </Text>
              <Text
                style={{
                  width: "6%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.["sgst"] ? reportItem?.gstAmount / 2 : ""}
              </Text>
              <Text
                style={{
                  width: "6%",
                  borderRight: "1px solid black",
                  padding: "6px",
                  paddingTop: "12px",
                }}
              >
                {reportItem?.["igst"] ? reportItem?.gstAmount : ""}
              </Text>
              <Text
                style={{ width: "10%", padding: "6px", paddingTop: "12px" }}
              >
                {reportItem?.otherExpensesGST
                  ? reportItem?.amount +
                    reportItem?.gstAmount +
                    reportItem?.otherExpensesGST
                  : reportItem?.amount + reportItem?.gstAmount}
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
export default ReportPdf;
