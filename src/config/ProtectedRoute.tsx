import { Navigate } from "react-router-dom";
import { themesActions, useAppSelector } from "@/reduxStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const ProtectedRoute = ({ children }: any) => {
  const helpers = useAppSelector((state) => state.helper);
  const dispatch = useDispatch();

  useEffect(() => {
    if (helpers.getIsLogin) {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
      dispatch(themesActions.handleSetFooter(true));
      dispatch(themesActions.handleSetContent(true));
    }
  }, [dispatch, helpers.getIsLogin]);

  if (!helpers.getIsLogin) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};
