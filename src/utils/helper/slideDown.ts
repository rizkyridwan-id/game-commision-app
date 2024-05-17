export function slideDown(elm: HTMLElement, duration = 300) {
  if (!elm.classList.contains("transitioning")) {
    elm.classList.add("transitioning");
    elm.style.removeProperty("display");
    let display = window.getComputedStyle(elm).display;
    if (display === "none") display = "block";
    elm.style.display = display;
    const height = elm.offsetHeight;
    elm.style.overflow = "hidden";
    elm.style.height = "0px";
    elm.style.paddingTop = "0px";
    elm.style.paddingBottom = "0px";
    elm.style.marginTop = "0px";
    elm.style.marginBottom = "0px";
    elm.offsetHeight;
    elm.style.boxSizing = "border-box";
    elm.style.transitionProperty = "height, margin, padding";
    elm.style.transitionDuration = duration + "ms";
    elm.style.height = height + "px";
    elm.style.removeProperty("padding-top");
    elm.style.removeProperty("padding-bottom");
    elm.style.removeProperty("margin-top");
    elm.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      elm.style.removeProperty("height");
      elm.style.removeProperty("overflow");
      elm.style.removeProperty("transition-duration");
      elm.style.removeProperty("transition-property");
      elm.classList.remove("transitioning");
    }, duration);
  }
}
