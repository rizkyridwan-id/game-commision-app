/* eslint-disable @typescript-eslint/no-this-alias */
import { handleGetHiddenMenuHeight } from "./handleGetHiddenMenuHeight";
import { handleSidebarMinifyFloatMenuClick } from "./handleSidebarMinifyFloatMenuClick";

export function handleSidebarMinifyFloatMenu() {
  let appSidebarFloatSubmenuTimeout: any = "";
  let appSidebarFloatSubmenuDom: any = "";
  const elms = [].slice.call(
    document.querySelectorAll(
      ".app-sidebar .menu > .menu-item.has-sub > .menu-link"
    )
  ) as any;
  if (elms) {
    elms.map(function (elm: any) {
      elm.onmouseenter = function () {
        const appElm = document.querySelector(".app");
        if (appElm && appElm.classList.contains("app-sidebar-minified")) {
          clearTimeout(appSidebarFloatSubmenuTimeout);
          const targetMenu =
            this.closest(".menu-item").querySelector(".menu-submenu");
          if (
            appSidebarFloatSubmenuDom === this &&
            document.querySelector("#app-sidebar-float-submenu")
          ) {
            return;
          } else {
            appSidebarFloatSubmenuDom = this;
          }
          const targetMenuHtml = targetMenu.innerHTML;
          if (targetMenuHtml) {
            const bodyStyle = getComputedStyle(document.body);
            const sidebarOffset = document
              ?.querySelector("#sidebar")
              ?.getBoundingClientRect() as any;
            const sidebarWidth = parseInt(
              document?.querySelector("#sidebar")?.clientWidth as any
            ) as any;
            const sidebarX =
              !appElm.classList.contains("app-sidebar-end") &&
              bodyStyle.getPropertyValue("direction") !== "rtl"
                ? sidebarOffset.left + sidebarWidth
                : document.body.clientWidth - sidebarOffset.left;
            const targetHeight = handleGetHiddenMenuHeight(targetMenu);
            const targetOffset = this.getBoundingClientRect();
            const targetTop = targetOffset.top;
            const targetLeft =
              !appElm.classList.contains("app-sidebar-end") &&
              bodyStyle.getPropertyValue("direction") !== "rtl"
                ? sidebarX
                : "auto";
            const targetRight =
              !appElm.classList.contains("app-sidebar-end") &&
              bodyStyle.getPropertyValue("direction") !== "rtl"
                ? "auto"
                : sidebarX;
            const windowHeight = document.body.clientHeight;

            if (!document.querySelector("#app-sidebar-float-submenu")) {
              let overflowClass = "";
              if (targetHeight > windowHeight) {
                overflowClass = "overflow-scroll mh-100vh";
              }
              const html = document.createElement("div");
              html.setAttribute("id", "app-sidebar-float-submenu");
              html.setAttribute("class", "app-sidebar-float-submenu-container");
              html.setAttribute("data-offset-top", targetTop);
              html.setAttribute("data-menu-offset-top", targetTop);
              html.innerHTML =
                "" +
                '	<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>' +
                '	<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>' +
                '	<div class="app-sidebar-float-submenu ' +
                overflowClass +
                '">' +
                targetMenuHtml +
                "</div>";
              appElm.appendChild(html);

              const elm = document.getElementById(
                "app-sidebar-float-submenu"
              ) as any;
              elm.onmouseover = function () {
                clearTimeout(appSidebarFloatSubmenuTimeout);
              };
              elm.onmouseout = function () {
                appSidebarFloatSubmenuTimeout = setTimeout(() => {
                  document
                    ?.querySelector("#app-sidebar-float-submenu")
                    ?.remove();
                }, 250);
              };
            } else {
              const floatSubmenu = document.querySelector(
                "#app-sidebar-float-submenu"
              ) as any;
              const floatSubmenuInnerElm = document.querySelector(
                "#app-sidebar-float-submenu .app-sidebar-float-submenu"
              ) as any;

              if (targetHeight > windowHeight) {
                if (floatSubmenuInnerElm) {
                  const splitClass = "overflow-scroll mh-100vh".split(" ");
                  for (let i = 0; i < splitClass.length; i++) {
                    floatSubmenuInnerElm.classList.add(splitClass[i]);
                  }
                }
              }
              floatSubmenu.setAttribute("data-offset-top", targetTop);
              floatSubmenu.setAttribute("data-menu-offset-top", targetTop);
              floatSubmenuInnerElm.innerHTML = targetMenuHtml;
            }

            const targetSubmenuHeight = document?.querySelector(
              "#app-sidebar-float-submenu"
            )?.clientHeight as any;
            const floatSubmenuElm = document.querySelector(
              "#app-sidebar-float-submenu"
            ) as any;
            const floatSubmenuArrowElm = document.querySelector(
              "#app-sidebar-float-submenu-arrow"
            ) as any;
            const floatSubmenuLineElm = document.querySelector(
              "#app-sidebar-float-submenu-line"
            ) as any;
            if (windowHeight - targetTop > targetSubmenuHeight) {
              if (floatSubmenuElm) {
                floatSubmenuElm.style.top = targetTop + "px";
                floatSubmenuElm.style.left = targetLeft + "px";
                floatSubmenuElm.style.bottom = "auto";
                floatSubmenuElm.style.right = targetRight + "px";
              }
              if (floatSubmenuArrowElm) {
                floatSubmenuArrowElm.style.top = "20px";
                floatSubmenuArrowElm.style.bottom = "auto";
              }
              if (floatSubmenuLineElm) {
                floatSubmenuLineElm.style.top = "20px";
                floatSubmenuLineElm.style.bottom = "auto";
              }
            } else {
              const arrowBottom = windowHeight - targetTop - 21;
              if (floatSubmenuElm) {
                floatSubmenuElm.style.top = "auto";
                floatSubmenuElm.style.left = targetLeft + "px";
                floatSubmenuElm.style.bottom = 0;
                floatSubmenuElm.style.right = targetRight + "px";
              }
              if (floatSubmenuArrowElm) {
                floatSubmenuArrowElm.style.top = "auto";
                floatSubmenuArrowElm.style.bottom = arrowBottom + "px";
              }
              if (floatSubmenuLineElm) {
                floatSubmenuLineElm.style.top = "20px";
                floatSubmenuLineElm.style.bottom = arrowBottom + "px";
              }
            }
            handleSidebarMinifyFloatMenuClick();
          } else {
            document
              ?.querySelector("#app-sidebar-float-submenu-line")
              ?.remove();
            appSidebarFloatSubmenuDom = "";
          }
        }
      };
      elm.onmouseleave = function () {
        const elm = document.querySelector(".app");
        if (elm && elm.classList.contains("app-sidebar-minified")) {
          appSidebarFloatSubmenuTimeout = setTimeout(() => {
            const elm = document.querySelector(
              "#app-sidebar-float-submenu-line"
            );
            if (elm) {
              elm.remove();
            }
            appSidebarFloatSubmenuDom = "";
          }, 250);
        }
      };
      return true;
    });
  }
}
