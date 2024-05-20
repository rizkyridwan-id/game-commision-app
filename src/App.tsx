import { ToastContainer } from "./package";
import { AppDispatch, useAppSelector, utilityActions } from "./reduxStore";
import { Content, Header, Siderbar } from "./components";
import { LoadingContent, calculateWindowSize } from "./utils";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const body = document.body;
    const size = calculateWindowSize();
    if (utility.getScreenSize !== size) {
      dispatch(utilityActions.setScreenSize(size));
    }
    if (!theme.handleSetPageHeader && !theme.handleSetPageSidebar) {
      body.style.backgroundColor = "white";
    }
    return () => {
      body.style.backgroundColor = "#dee2e6"; // Reset to default
    };
  }, [theme]);
  return (
    <React.Fragment>
      {utility.getIsLogin ? (
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
          <LoadingContent loading={utility.getLoading.screen} />
        </div>
      ) : (
        theme.handleSetContent && <Content />
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
