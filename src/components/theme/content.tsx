import { AppRoute } from "@/config";
import { RootState, ThemeState } from "../../reduxStore";
import { useSelector, useEffect, Outlet, useLocation } from "../../package";
import { getItem, userData } from "@/utils";
import { PageNoteFound } from "@/pages";
import { MenuInterFace } from "@/interface";

const Content = () => {
  const theme = useSelector<RootState<string>, ThemeState>(
    (state) => state.theme
  );

  const location = useLocation();

  const setTitle = (path: string, routeArray: any) => {
    let appTitle;

    routeArray.forEach((row: any) => {
      if (row.path === path) {
        appTitle = row.title;
      } else if (row.children && row.children.length > 0) {
        row.children.forEach((el: any) => {
          if (el.path === path) {
            appTitle = el.title;
          }
          if (el.children?.length > 0) {
            el.children.forEach((el: any) => {
              if (el.path === path) {
                appTitle = el.title;
              }
            });
          }
        });
      }
    });
    document.title =
      (appTitle ? appTitle : "Halaman Admin") + " | Time Keeping Management";
  };

  const { pathname } = location;
  useEffect(() => {
    setTitle(pathname, AppRoute);
  });

  const checkAcces = (): number => {
    const feedback: MenuInterFace[] = getItem("hakAkses");
    const menu: string[] = [];

    feedback.forEach((row: MenuInterFace) => {
      menu.push(row.path || "");

      if (row.children) {
        row.children.forEach((el: MenuInterFace) => {
          if (el.children) {
            el.children.forEach((el2: MenuInterFace) => {
              menu.push(el2.path || "");
            });
          }
          menu.push(el.path || "");
        });
      }
    });

    const hasil: number = menu.findIndex((res: string) => res === pathname);

    return pathname === "/" ||
      pathname === "/login" ||
      pathname === "/test-public-page"
      ? 2
      : hasil;
  };

  const renderContent = () => {
    if (!userData.user_id) {
      return <Outlet />;
    }
    if (checkAcces() === -1) {
      if (userData.level === "SU" || userData.level === "OWNER") {
        return <Outlet />;
      } else {
        return <PageNoteFound />;
      }
    } else {
      return <Outlet />;
    }
  };
  return (
    <div className={theme.handleSetPageSidebar ? "app-content " : ""}>
      {renderContent()}
    </div>
  );
};

export default Content;

// import { AppRoute } from "@/config";
// import { RootState, ThemeState } from "../../reduxStore";
// import { useSelector, useEffect, Outlet, useLocation } from "../../package";
// const Content = () => {
//   const theme = useSelector<RootState<string>, ThemeState>(
//     (state) => state.theme
//   );

//   const location = useLocation();

//   const setTitle = (path: string, routeArray: any) => {
//     let appTitle;

//     routeArray.forEach((row: any) => {
//       row.children.forEach((el: any) => {
//         if (el.path === path) {
//           appTitle = el.title;
//         }
//       });
//     });
//     document.title =
//       (appTitle ? appTitle : "Halaman Admin") +
//       " | TIME KEEPING MANAGEMENT SOLUTION";
//   };

//   useEffect(() => {
//     const { pathname } = location;

//     setTitle(pathname, AppRoute);
//   });

//   return (
//     <div className={theme.handleSetPageSidebar ? "app-content " : ""}>
//       <Outlet />
//     </div>
//   );
// };

// export default Content;
