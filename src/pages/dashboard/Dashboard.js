import { useEffect } from "react";
import BillForm from "../../components/feature/bill-form/BillForm";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { sellData } = useSelector((state) => state.api);
  useEffect(() => {
    document.title = "Madhuvan Minerals - Dashbaord";
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
