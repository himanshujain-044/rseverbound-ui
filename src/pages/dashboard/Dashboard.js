import { useEffect } from "react";
import BillForm from "../../components/feature/bill-form/BillForm";
import { useDispatch, useSelector } from "react-redux";
import { clearSomeStates } from "../../store/api";

const Dashboard = () => {
  const { sellData } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "RS Ever Bound - Dashbaord";
    dispatch(clearSomeStates({ stateKeys: ["sellsReportsData"] }));
  }, []);

  return (
    <div className="h-[calc(100%_-_1rem)] flex justify-center gap-12 my-2 mx-6 mobile:h-[calc(100%_-_2.5rem)] mobile:mx-0">
      <div className="w-full">
        <BillForm data={sellData} />
      </div>
    </div>
  );
};
export default Dashboard;
