import {
  useResolvedPath,
  useMatch,
  NavLink,
  useLocation,
  matchPath,
} from "../../../package";
import { Menu } from "@/config";

const SidebarMenu = () => {
  const handleSidebarSearch = (e: any) => {
    let targetValue = e.target.value;
    targetValue = targetValue.toLowerCase();

    if (targetValue) {
      const elms = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item"
        )
      );
      if (elms) {
        elms.map(function (elm: any) {
          elm?.classList.add("d-none");
          return true;
        });
      }
      const elms2 = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .has-text"
        )
      );
      if (elms2) {
        elms2.map(function (elm: any) {
          elm.classList.remove("has-text");
          return true;
        });
      }
      const elms3 = [].slice.call(
        document.querySelectorAll(".app-sidebar:not(.app-sidebar-end) .expand")
      );
      if (elms3) {
        elms3.map(function (elm: any) {
          elm.classList.remove("expand");
          return true;
        });
      }
      const elms4 = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link"
        )
      );
      if (elms4) {
        elms4.map(function (elm: any) {
          let targetText = elm.textContent;
          targetText = targetText.toLowerCase();
          if (targetText.search(targetValue) > -1) {
            const targetElm = elm.closest(".menu-item");
            if (targetElm) {
              targetElm.classList.remove("d-none");
              targetElm.classList.add("has-text");
            }

            const targetElm2 = elm.closest(".menu-item.has-sub");
            if (targetElm2) {
              const targetElm3 = targetElm.querySelector(
                ".menu-submenu .menu-item.d-none"
              );
              if (targetElm3) {
                targetElm3.classList.remove("d-none");
              }
            }

            const targetElm4 = elm.closest(".menu-submenu");
            if (targetElm4) {
              targetElm4.style.display = "block";

              const targetElm5 = targetElm.querySelector(
                ".menu-item:not(.has-text)"
              );
              if (targetElm5) {
                targetElm5.classList.add("d-none");
              }

              const targetElm6 = elm.closest(".has-sub:not(.has-text)");
              if (targetElm6) {
                targetElm6.classList.remove("d-none");
                targetElm6.classList.add("expand");

                const targetElm7 = targetElm.closest(".has-sub:not(.has-text)");
                if (targetElm7) {
                  targetElm7.classList.remove("d-none");
                  targetElm7.classList.add("expand");
                }
              }
            }
          }
          return true;
        });
      }
    } else {
      const elms5 = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu"
        )
      );
      if (elms5) {
        elms5.map(function (elm: any) {
          elm.removeAttribute("style");
          return true;
        });
      }

      const elms6 = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)"
        )
      );
      if (elms6) {
        elms6.map(function (elm: any) {
          elm.classList.remove("d-none");
          return true;
        });
      }

      const elms7 = [].slice.call(
        document.querySelectorAll(
          ".app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item"
        )
      );
      if (elms7) {
        elms7.map(function (elm: any) {
          elm.classList.remove("d-none");
          return true;
        });
      }

      const elms8 = [].slice.call(
        document.querySelectorAll(".app-sidebar:not(.app-sidebar-end) .expand")
      );
      if (elms8) {
        elms8.map(function (elm: any) {
          elm.classList.remove("expand");
          return true;
        });
      }
    }
  };

  return (
    <div className="menu">
      <div className="menu-search mb-n3">
        <input
          type="text"
          className="form-control"
          placeholder="Sidebar menu filter..."
          onKeyUp={handleSidebarSearch}
        />
      </div>
      <div className="menu-header">Navigation</div>
      {Menu.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
};

function NavItem({ menu, ...props }: any) {
  const resolved = useResolvedPath(menu.path);
  const match = useMatch({ path: resolved.pathname });

  const location = useLocation();
  const match2 = matchPath({ path: menu.path, end: false }, location.pathname);

  const icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  const img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  const caret = menu.children && !menu.badge && (
    <div className="menu-caret"></div>
  );
  const label = menu.label && (
    <span className="menu-label ms-5px">{menu.label}</span>
  );
  const badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  const highlight = menu.highlight && (
    <i className="fa fa-paper-plane text-theme"></i>
  );
  const title = menu.title && (
    <div className="menu-text">
      {menu.title} {label} {highlight}
    </div>
  );

  return (
    <div
      className={
        "menu-item" +
        (match || match2 ? " " : "") +
        (menu.children ? " has-sub" : "")
      }
    >
      <NavLink className="menu-link" to={menu.path} {...props}>
        {img} {icon} {title}
        {caret} {badge}
      </NavLink>

      {menu.children && (
        <div className="menu-submenu">
          {menu.children.map((submenu: any, i: number) => (
            <NavItem key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarMenu;
