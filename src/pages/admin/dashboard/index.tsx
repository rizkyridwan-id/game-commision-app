import { PanelContent } from "@/components";
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
    <PanelContent>
      <div className="row">
        <div className="colr-12">
          <DashbaordTimeKeeping />
        </div>
        <div className="colr-12">
          <DashbaordReviewCuti />
        </div>
        <div className="colr-12">
          <DashbaordUlangTahun />
        </div>
      </div>
    </PanelContent>
  );
};

export default Dashboard;
