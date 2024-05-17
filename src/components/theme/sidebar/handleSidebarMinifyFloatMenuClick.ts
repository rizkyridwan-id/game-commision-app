import { slideToggle } from "@/utils/helper/slideToggle";

export function handleSidebarMinifyFloatMenuClick() {
  const elms = [].slice.call(
    document.querySelectorAll(
      "#app-sidebar-float-submenu .menu-item.has-sub > .menu-link"
    )
  );
  if (elms) {
    elms.map(function (elm: any) {
      elm.onclick = function (e: any) {
        e.preventDefault();
        const targetItem = this.closest(".menu-item");
        const target = targetItem.querySelector(".menu-submenu");
        const targetStyle = getComputedStyle(target);
        const close =
          targetStyle.getPropertyValue("display") !== "none" ? true : false;
        const expand =
          targetStyle.getPropertyValue("display") !== "none" ? false : true;

        slideToggle(target);

        const loopHeight = setInterval(function () {
          const targetMenu = document.querySelector(
            "#app-sidebar-float-submenu"
          ) as any;
          const targetMenuArrow = document.querySelector(
            "#app-sidebar-float-submenu-arrow"
          ) as any;
          const targetMenuLine = document.querySelector(
            "#app-sidebar-float-submenu-line"
          ) as any;
          const targetHeight = targetMenu.clientHeight;
          const targetOffset = targetMenu.getBoundingClientRect();
          const targetOriTop = targetMenu.getAttribute("data-offset-top");
          const targetMenuTop = targetMenu
            ? parseInt(targetMenu.getAttribute("data-menu-offset-top") || "0")
            : 0;

          let targetTop: number = targetOffset.top;
          const windowHeight: number = document.body.clientHeight;
          if (close) {
            if (targetTop > targetOriTop) {
              targetTop = targetTop > targetOriTop ? targetOriTop : targetTop;
              targetMenu.style.top = targetTop + "px";
              targetMenu.style.bottom = "auto";
              targetMenuArrow.style.top = "20px";
              targetMenuArrow.style.bottom = "auto";
              targetMenuLine.style.top = "20px";
              targetMenuLine.style.bottom = "auto";
            }
          }
          if (expand) {
            if (windowHeight - targetTop < targetHeight) {
              const arrowBottom = windowHeight - targetMenuTop - 22;
              targetMenu.style.top = "auto";
              targetMenu.style.bottom = 0;
              targetMenuArrow.style.top = "auto";
              targetMenuArrow.style.bottom = arrowBottom + "px";
              targetMenuLine.style.top = "20px";
              targetMenuLine.style.bottom = arrowBottom + "px";
            }
            const floatSubmenuElm = document.querySelector(
              "#app-sidebar-float-submenu .app-sidebar-float-submenu"
            );
            if (targetHeight > windowHeight) {
              if (floatSubmenuElm) {
                const splitClass = "overflow-scroll mh-100vh".split(" ");
                for (let i = 0; i < splitClass.length; i++) {
                  floatSubmenuElm.classList.add(splitClass[i]);
                }
              }
            }
          }
        }, 1);
        setTimeout(function () {
          clearInterval(loopHeight);
        }, 250);
      };
      return true;
    });
  }
}
