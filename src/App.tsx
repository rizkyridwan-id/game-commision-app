import { ToastContainer } from "./package";
import { AppDispatch, useAppSelector, utilityActions } from "./reduxStore";
import { Content, Header, Siderbar } from "./components";
import { LoadingContent, calculateWindowSize } from "./utils";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

const App = () => {
  const utility = useAppSelector((state) => state.utility);
  const helpers = useAppSelector((state) => state.helper);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // const body = document.body;
    const size = calculateWindowSize();
    if (utility.getScreenSize !== size) {
      dispatch(utilityActions.setScreenSize(size));
    }
    // if (!theme.handleSetPageHeader && !theme.handleSetPageSidebar) {
    //   body.style.backgroundColor = "white";
    // }
    // return () => {
    //   body.style.backgroundColor = "#dee2e6"; // Reset to default
    // };
  }, []);

  console.log(utility.getLoading);
  return (
    <React.Fragment>
      {helpers.getIsLogin ? (
        <div
          className={
            "app " +
            (theme.appSidebarEndMobileToggled
              ? "app-sidebar-mobile-toggled "
              : "") +
            (theme.appSidebarMinify ? "app-sidebar-minified " : "")
          }
        >
          {theme.handleSetPageHeader && <Header />}
          {theme.handleSetPageSidebar && <Siderbar />}
          {theme.handleSetContent && <Content />}
        </div>
      ) : (
        theme.handleSetContent && <Content />
      )}
      <LoadingContent loading={utility.getLoading.screen} />
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
    </React.Fragment>
  );
};

export default App;
