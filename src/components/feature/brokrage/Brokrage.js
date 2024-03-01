import DataTable from "../../common/DataTable/DataTable";

const Brokrage = ({ data }) => {
  return (
    <div className="bg-[#fff] w-1/2 rounded-md p-4">
      <strong
        className="text-primary text-[24px] underline decoration-2"
        style={{ textUnderlineOffset: "10px" }}
      >
        Brokrage
      </strong>
      <div style={{ height: "85%", width: "100%", marginTop: "32px" }}>
        <DataTable />
      </div>
    </div>
  );
};
export default Brokrage;
