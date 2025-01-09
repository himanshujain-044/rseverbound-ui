import { useEffect } from "react";
import BillForm from "../../components/feature/bill-form/BillForm";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Madhuvan Minerals - Dashbaord";
  }, []);

  return (
    <div className="h-[calc(100%_-_1rem)] flex justify-center gap-12 my-2 mx-6 mobile:h-[calc(100%_-_2.5rem)] mobile:mx-0">
      <div className="w-full">
        <BillForm />
      </div>
    </div>
  );
};
export default Dashboard;
