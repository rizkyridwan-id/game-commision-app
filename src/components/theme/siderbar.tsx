import SidebarMenu from "./sidebar/sidebarMenu";
import { RootState, ThemeState, themesActions } from "../../reduxStore";
import {
  useSelector,
  useDispatch,
  useEffect,
  Link,
  PerfectScrollbar,
} from "../../package";
import { handleSidebarMenuToggle } from "./sidebar/handleSidebarMenuToggle";
import { handleSidebarMinifyFloatMenuClick } from "./sidebar/handleSidebarMinifyFloatMenuClick";
import { handleSidebarMinifyFloatMenu } from "./sidebar/handleSidebarMinifyFloatMenu";

const Siderbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector<RootState<string>, ThemeState>(
    (state) => state.theme
  );
  useEffect(() => {
    const targetSidebar = document.querySelector(
      ".app-sidebar:not(.app-sidebar-end)"
    );
    const expandTime =
      targetSidebar &&
      targetSidebar.getAttribute("data-disable-slide-animation")
        ? 0
        : 300;

    const menuBaseSelector = ".app-sidebar .menu > .menu-item.has-sub";
    const submenuBaseSelector = " > .menu-submenu > .menu-item.has-sub";

    // menu
    const menuLinkSelector = menuBaseSelector + " > .menu-link";
    const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
    handleSidebarMenuToggle(menus, expandTime);

    // submenu lvl 1
    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = [].slice.call(
      document.querySelectorAll(submenuLvl1Selector + " > .menu-link")
    );
    handleSidebarMenuToggle(submenusLvl1, expandTime);

    // submenu lvl 2
    const submenuLvl2Selector =
      menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = [].slice.call(
      document.querySelectorAll(submenuLvl2Selector + " > .menu-link")
    );
    handleSidebarMenuToggle(submenusLvl2, expandTime);
    handleSidebarMinifyFloatMenuClick();
    handleSidebarMinifyFloatMenu();
  });

  return (
    <>
      {/* BEGIN #sidebar */}
      <div id="sidebar" className="app-sidebar" data-bs-theme="dark">
        {/* BEGIN scrollbar */}
        <PerfectScrollbar
          className="app-sidebar-content"
          options={{ suppressScrollX: true }}
        >
          <SidebarMenu />
        </PerfectScrollbar>
        {/* END scrollbar */}
      </div>
      <div className="app-sidebar-bg" data-bs-theme="dark"></div>
      <div
        className="app-sidebar-mobile-backdrop"
        onClick={() =>
          dispatch(
            themesActions.appSidebarEndMobileToggled(
              !theme.appSidebarEndMobileToggled
            )
          )
        }
      >
        <Link to="#" className="stretched-link"></Link>
      </div>
      {/* END #sidebar */}
    </>
  );
};

export default Siderbar;
