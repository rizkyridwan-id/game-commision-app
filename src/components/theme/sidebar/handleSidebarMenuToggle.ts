import { slideToggle } from "@/utils/helper/slideToggle";
import { slideUp } from "@/utils/helper/slideUp";

export const handleSidebarMenuToggle = function (menus: any, expandTime: any) {
  menus.map(function (menu: any) {
    menu.onclick = function (e: any) {
      e.preventDefault();
      const target = this.nextElementSibling;

      menus.map(function (m: any) {
        const otherTarget = m.nextElementSibling;
        if (otherTarget !== target) {
          slideUp(otherTarget, expandTime);
          otherTarget.closest(".menu-item").classList.remove("expand");
          otherTarget.closest(".menu-item").classList.add("closed");
        }
        return true;
      });

      const targetItemElm = target.closest(".menu-item");

      if (
        targetItemElm.classList.contains("expand") ||
        (targetItemElm.classList.contains("active") && !target.style.display)
      ) {
        targetItemElm.classList.remove("expand");
        targetItemElm.classList.add("closed");
        slideToggle(target, expandTime);
      } else {
        targetItemElm.classList.add("expand");
        targetItemElm.classList.remove("closed");
        slideToggle(target, expandTime);
      }
    };

    return true;
  });
};
