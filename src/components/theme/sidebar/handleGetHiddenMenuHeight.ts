export function handleGetHiddenMenuHeight(elm: HTMLElement) {
  elm.setAttribute(
    "style",
    "position: absolute; visibility: hidden; display: block !important"
  );
  const targetHeight = elm.clientHeight;
  elm.removeAttribute("style");
  return targetHeight;
}
