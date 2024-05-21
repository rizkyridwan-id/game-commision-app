import {
  ApiResponse,
  RefresTokenInterFace,
  UserLoginInterFace,
} from "@/interface";
import { AxiosError, AxiosRequestConfig } from "axios";
import firebase from "./firebase";
import { getItem } from ".";
import {
  VITE_APP_BE,
  VITE_APP_FIREBASE_NAME,
  generateSecret,
  generateSignature,
  setItem,
} from "./helpers";
import { doEncrypt } from "./encrypt";
import { Axios } from "@/package";

// const userData: UserLoginInterFace = getItem<UserLoginInterFace>("userdata");

export interface ErrorResponse {
  status: number;
  message: string;
}

const errorRegex =
  /Unauthorized|Invalid token|Invalid signature|Token Tidak Ditemukan/i;

const getNewRefresToken = async () => {
  const userData: UserLoginInterFace = getItem<UserLoginInterFace>("userdata");

  try {
    const newToken: RefresTokenInterFace = await refreshToken();
    setItem("userdata", {
      ...userData,
      access_token: newToken.access_token,
      refresh_token: newToken.refresh_token,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    if (/Refresh Token is Expire/i.test(`${error}`)) {
      logout();
    } else {
      getNewRefresToken();
    }
  }
};

export const logout = async () => {
  const userData: UserLoginInterFace = getItem<UserLoginInterFace>("userdata");
  if (!userData.user_id) {
    return false;
  }
  try {
    await postData("auth/logout");
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};
export async function getData<T>(
  endpoint: string,
  params?: Record<string, number | string | boolean | undefined>
): Promise<ApiResponse<T>> {
  const userData: UserLoginInterFace = getItem<UserLoginInterFace>("userdata");
  const url = `${VITE_APP_BE}/${endpoint}`;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp);

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      Accept: "application/json",
      Authorization: userData.access_token
        ? `Bearer ${userData.access_token}`
        : undefined,
    },
    params: params,
  };

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    Axios.get<ApiResponse<T>>(url, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (Axios.isAxiosError(error)) {
          const errResponse = error as AxiosError<ErrorResponse>;

          if (errResponse.response) {
            const { data } = errResponse.response;
            const message =
              data && data.message ? data.message : "Unknown error";

            if (/Token is Expired/i.test(message)) {
              getNewRefresToken();
            }

            if (errorRegex.test(message)) {
              logout();
            }
            // Error response from the server
            reject(`${message}`);
          } else if (errResponse.request) {
            reject(errResponse.message);
          } else {
            reject(errResponse.message);
          }
        } else {
          reject("Tidak Terhubung Ke Server");
        }
      });
  });
}

export async function postData<T>(
  endpoint: string,
  data?: T
): Promise<ApiResponse<T>> {
  const url = `${VITE_APP_BE}/${endpoint}`;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp);
  const secret = generateSecret();
  const datauser = getItem<UserLoginInterFace>("userdata");

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      user_id: datauser?.user_id,
      Accept: "application/json",
      "secret-key": secret,
      Authorization:
        endpoint !== "auth/login"
          ? `Bearer ${datauser.access_token || ""}`
          : undefined,
    },
  };

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    Axios.post<ApiResponse<T>>(url, doEncrypt(data), config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(async (error) => {
        if (Axios.isAxiosError(error)) {
          const errResponse = error as AxiosError<ErrorResponse>;

          if (errResponse.response) {
            const { data } = errResponse.response;

            const message =
              data && data.message ? data.message : "Unknown error";

            if (/Token is Expired/i.test(message)) {
              getNewRefresToken();
            }

            if (errorRegex.test(message)) {
              logout();
            }

            // Error response from the server
            reject(`${message}`);
          } else if (errResponse.request) {
            // No response received
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          } else {
            // Other errors
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          }
        } else {
          reject("Tidak Terhubung Ke Server");
        }
      });
  });
}
export async function putData<T>(
  endpoint: string,
  data: T
): Promise<ApiResponse<T>> {
  const url = `${VITE_APP_BE}/${endpoint}`;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp);
  const datauser = getItem<UserLoginInterFace>("userdata");

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      Accept: "application/json",
      user_id: datauser?.user_id,
      Authorization: `Bearer ${datauser?.access_token || ""}`,
    },
  };

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    Axios.put<ApiResponse<T>>(url, doEncrypt(data), config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(async (error) => {
        if (Axios.isAxiosError(error)) {
          const errResponse = error as AxiosError<ErrorResponse>;

          if (errResponse.response) {
            const { data } = errResponse.response;

            const message =
              data && data.message ? data.message : "Unknown error";
            // Error response from the server
            if (/Token is Expired/i.test(message)) {
              getNewRefresToken();
            }

            if (errorRegex.test(message)) {
              logout();
            }

            reject(`${message}`);
          } else if (errResponse.request) {
            // No response received
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          } else {
            // Other errors
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          }
        } else {
          reject("Tidak Terhubung Ke Server");
        }
      });
  });
}

export async function deleteData<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<ApiResponse<T>> {
  const url = `${VITE_APP_BE}/${endpoint}`;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp);
  const datauser = getItem<UserLoginInterFace>("userdata");

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      Accept: "application/json",
      user_id: datauser?.user_id,
      Authorization: `Bearer ${datauser?.access_token || ""}`,
    },
    params: params,
  };

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    Axios.delete<ApiResponse<T>>(url, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(async (error) => {
        if (Axios.isAxiosError(error)) {
          const errResponse = error as AxiosError<ErrorResponse>;

          if (errResponse.response) {
            const { data } = errResponse.response;

            const message =
              data && data.message ? data.message : "Unknown error";

            if (/Token is Expired/i.test(message)) {
              getNewRefresToken();
            }

            if (errorRegex.test(message)) {
              logout();
            }

            // Error response from the server
            reject(`${message}`);
          } else if (errResponse.request) {
            // No response received
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          } else {
            // Other errors
            reject(
              errResponse.message || "Terjadi kesalahan saat mengirim data"
            );
          }
        } else {
          reject("Tidak Terhubung Ke Server");
        }
      });
  });
}

export const refreshToken = async (): Promise<RefresTokenInterFace> => {
  const url = `${VITE_APP_BE}/auth/refresh`;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp);
  const datauser = getItem<UserLoginInterFace>("userdata");

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      Accept: "application/json",
      user_id: datauser.user_id,
      Authorization: `Bearer ${datauser?.access_token || ""}`,
    },
  };

  const bodyValue = {
    user_id: getItem<UserLoginInterFace>("userdata").user_id,
    refresh_token: getItem<UserLoginInterFace>("userdata").refresh_token,
  };
  const response = await Axios.post(url, doEncrypt(bodyValue), config);
  return response.data; // Mengembalikan access token baru
};

export function postImage(file: File, name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    const stoageRef = storage.ref(
      `NSIPIC/${VITE_APP_FIREBASE_NAME}/${name}.jpg`
    );
    stoageRef
      .put(file)
      .then(() => {
        stoageRef.getDownloadURL().then(function (url) {
          resolve(url);
        });
      })
      .catch((err) => {
        reject(JSON.parse(err));
      });
  });
}
export function getImage(file: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    const stoageRef = storage.ref(
      `NSIPIC/${VITE_APP_FIREBASE_NAME}/${file}.jpg`
    );
    stoageRef
      .getDownloadURL()
      .then(function (url) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = async function () {
          resolve(xhr.response);
        };
        xhr.onerror = async function () {
          reject("error");
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((err) => {
        reject((err.customData.serverResponse as any).error);
      });
  });
}

export function deleteImage(name: string) {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const desertRef = storageRef.child(`${name}.jpg`);
    desertRef
      .delete()
      .then(function () {
        resolve("behasil");
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
