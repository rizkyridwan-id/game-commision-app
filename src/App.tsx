import { ToastContainer } from "./package";
import { useAppSelector } from "./reduxStore";
import { Content, Header, Siderbar } from "./components";
import { LoadingContent } from "./utils";
import React, { useEffect } from "react";

const App = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    const body = document.body;
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
