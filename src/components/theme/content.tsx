import { AppRoute } from "@/config";
import { RootState, ThemeState } from "../../reduxStore";
import { useSelector, useEffect, Outlet, useLocation } from "../../package";
const Content = () => {
  const theme = useSelector<RootState<string>, ThemeState>(
    (state) => state.theme
  );

  const location = useLocation();

  const setTitle = (path: string, routeArray: any) => {
    let appTitle;

    routeArray.forEach((row: any) => {
      row.children.forEach((el: any) => {
        if (el.path === path) {
          appTitle = el.title;
        }
      });
    });
    document.title =
      (appTitle ? appTitle : "Halaman Admin") + " | Color Admin Base";
  };

  useEffect(() => {
    const { pathname } = location;

    setTitle(pathname, AppRoute);
  });

  return (
    <div className={theme.handleSetPageSidebar ? "app-content " : ""}>
      <Outlet />
    </div>
  );
};

export default Content;
