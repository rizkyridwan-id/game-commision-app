import { ButtonCustom } from "./Button";
import indexedDBStorage from "./IndexDbStore";

import ButtonDelete from "./buttonDelete";
import HiddenText from "./hiddenText";
import KeyboardWrapper from "./keyboardWrapper";

import { toRupiah } from "./toRupiah";

const date = new Date().toLocaleDateString("id-ID", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const [day, month, year] = date.split("/");
const today = `${year}-${month}-${day}`;
export * from "./Axios";
export * from "./Toast";
export * from "./Field";
export * from "./helpers";
export * from "./exportPdfExcel";
export {
  HiddenText,
  toRupiah,
  ButtonCustom,
  today,
  ButtonDelete,
  indexedDBStorage,
  KeyboardWrapper,
};
