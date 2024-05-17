import { AppDispatch, themesActions } from "@/reduxStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePublic = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
    };
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Login
      </button>
    </div>
  );
};

export default HomePublic;
