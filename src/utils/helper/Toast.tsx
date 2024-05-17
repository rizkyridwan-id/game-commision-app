import {
  toast,
  ToastContainer,
  ToastOptions,
  ToastPosition,
} from "react-toastify";
import toastMobile, { Toaster } from "react-hot-toast";
import { calculateWindowSize } from "./helpers";
import Swal, { SweetAlertPosition, SweetAlertResult } from "sweetalert2";

const screen = calculateWindowSize();

let isShow = false;

export const Toast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export const showConfirmation = (
  title: string,
  textBody: string,
  iconInfo: string,
  html?: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: title,
      text: textBody,
      html: html,
      icon: iconInfo as SweetAlertResult["value"], // Assume iconInfo is a valid SweetAlert icon type
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

export const NotifSuccess = (
  text: string,
  position: ToastPosition = "top-right"
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === "xs" || screen === "md" || screen === "sm"
    ? toastMobile.success(text)
    : toast.success(text, options);
};

export const NotifError = (
  text: string,
  position: ToastPosition = "top-right"
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === "xs" || screen === "md" || screen === "sm"
    ? toastMobile.error(text)
    : toast.error(text, options);
};
export const NotifInfo = (
  text: string,
  position: ToastPosition = "top-right"
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === "xs" || screen === "md" || screen === "sm"
    ? toastMobile(text, {
        icon: "ℹ️",
      })
    : toast.info(text, options);
};

export const NotifWarning = (
  text: string,
  position: ToastPosition = "top-right"
) => {
  if (isShow) {
    return;
  }
  isShow = true;
  const options: ToastOptions = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  setTimeout(() => {
    isShow = false;
  }, 5000);
  return screen === "xs" || screen === "md" || screen === "sm"
    ? toastMobile(text)
    : toast.warning(text, options);
};

export function NotifInfoModal(
  text: string,
  position?: SweetAlertPosition,
  width?: number | string
): Promise<string> {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Informasi !!!",
      html: text,
      icon: "info",
      position: position || "center",
      timer: 2000,
      width: width,
      showConfirmButton: false,
    })
      .then(() => resolve("berhasil"))
      .catch(() => reject("error"));
  });
}
