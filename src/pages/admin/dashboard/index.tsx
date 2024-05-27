import DashbaordTimeKeeping from "./form/dashbaordTimeKeeping";
import DashbaordReviewCuti from "./form/dashboardReviewCuti";
import DashbaordUlangTahun from "./form/dashboardUlangTahun";
import { useDispatch } from "react-redux";
import { AppDispatch, actionMaster } from "@/reduxStore";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);
  return (
    <div className="row">
      <div className="col-6">
        <DashbaordUlangTahun />
      </div>
      <div className="col-6">
        <DashbaordReviewCuti />
      </div>
      <div className="col-12">
        <DashbaordTimeKeeping />
      </div>
    </div>
  );
};

export default Dashboard;
