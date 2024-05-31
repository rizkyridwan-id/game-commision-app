import { doDecrypt, doEncrypt } from "./encrypt";
import { CryptoJS, useEffect, useState } from "../../package";
import {
  DataTokoInterFace,
  LocalStorageItem,
  UserLoginInterFace,
} from "@/interface";
import * as XLSX from "xlsx";
import moment from "moment-timezone";

export const { VITE_APP_SECRETKEY, VITE_APP_KEY } = import.meta.env;

interface GlobalConfig {
  VITE_APP_BE?: string;
  VITE_APP_FIREBASE_NAME?: string;
  VITE_APP_KODE_TOKO?: string;
  VITE_APP_VERSION?: string;
}

let globalConfigEnv: string = "";
let globalConfig: GlobalConfig = (window as any).globalConfig || {};

globalConfigEnv = doDecrypt(globalConfig);
globalConfig = JSON?.parse(globalConfigEnv?.replaceAll("~", ""));
export const VITE_APP_BE: string | undefined = globalConfig.VITE_APP_BE;
export const VITE_APP_KODE_TOKO: string | undefined =
  globalConfig.VITE_APP_KODE_TOKO;
export const VITE_APP_FIREBASE_NAME: string | undefined =
  globalConfig.VITE_APP_FIREBASE_NAME;
export const VITE_APP_VERSION: string | undefined =
  globalConfig.VITE_APP_VERSION;

interface LoadingContentProps {
  loading?: boolean;
}

export const isPusat = VITE_APP_VERSION === "PUSAT" ? true : false;

export const filterKodeToko = (kodeToko: string) => {
  const datatoko = getItem<DataTokoInterFace[]>("dataToko").find(
    (list) => list.kode_toko === kodeToko
  );
  return datatoko;
};

export const speak = (text: string): void => {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Ensure voices are loaded
  const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  };

  loadVoices().then((voices) => {
    // Filter voices for Indonesian language
    const indonesianVoices = voices.filter((voice) => voice.lang === "id-ID");

    if (indonesianVoices.length > 0) {
      utterance.voice = indonesianVoices[0]; // Choose the first Indonesian voice
    } else {
      console.warn("No Indonesian voice found");
    }

    utterance.lang = "id-ID";
    // Speak the text
    speechSynthesis.speak(utterance);
  });
};

export const LoadingContent: React.FC<LoadingContentProps> = (
  props: LoadingContentProps
) => {
  return (
    <div
      id="cover-spin"
      style={{ display: props.loading ? "block" : "none" }}
    ></div>
  );
};

export const setFocusField = (name: string) => {
  const element = document.getElementById(name);
  if (element) {
    element.focus();
  }
};

export const maskText = (text: string): string => {
  const visibleDigits = 4;
  const maskedSection = text.slice(0, -visibleDigits).replace(/\d/g, "*");
  const visibleSection = text.slice(-visibleDigits);
  return maskedSection + visibleSection;
};

export const calculateWindowSize = (): string => {
  let currentSize = "";
  if (!currentSize) {
    currentSize =
      window.innerWidth >= 1200
        ? "lg"
        : window.innerWidth >= 600
          ? "md"
          : window.innerWidth >= 375
            ? "sm"
            : window.innerWidth >= 300
              ? "xs"
              : "xxs";

    window.addEventListener("resize", function () {
      const newSize =
        window.innerWidth >= 1200
          ? "lg"
          : window.innerWidth >= 600
            ? "md"
            : window.innerWidth >= 375
              ? "sm"
              : window.innerWidth >= 300
                ? "xs"
                : "xxs";

      if (newSize !== currentSize) {
        currentSize = newSize;
      }
    });
  }

  return currentSize;
};

export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string); // Cast to string
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("kr-KO").format(number);
};
export const maskPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return "";

  const visibleDigits = 4; // Jumlah digit nomor yang tetap ditampilkan (misal: 0812-xxxx-xxxx, visibleDigits = 4)
  const maskedLength = phoneNumber.length - visibleDigits;
  const maskedChars = "*".repeat(maskedLength);

  return phoneNumber.substr(0, visibleDigits) + maskedChars;
};

export const renderStatus = (value?: string) => {
  return value === "hampir_habis" ? "HAMPIR HABIS" : value?.toUpperCase();
};
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getItem = <T,>(nama: string): T => {
  if (typeof window !== "undefined") {
    const encryptedNama = doEncrypt(nama);
    const item = localStorage.getItem(encryptedNama);

    if (item !== null) {
      const decryptedData = doDecrypt(JSON.parse(item));
      return decryptedData as T;
    } else {
      return [] as T;
    }
  }
  return [] as T;
};

export const validateDateRange = (
  startDateString: string,
  endDateString: string
) => {
  const start = new Date(startDateString);
  const end = new Date(endDateString);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Memeriksa apakah tanggal awal lebih besar dari tanggal akhir
  if (start > end) {
    // console.log("Tanggal awal tidak boleh lebih besar dari tanggal akhir.");
    return {
      pesan: "Tanggal awal tidak boleh lebih besar dari tanggal akhir",
      status: false,
    };
  }
  // Set tanggal akhir ke akhir hari
  end.setHours(23, 59, 59, 999);

  // Menghitung tanggal 1 bulan setelah tanggal awal
  const minDate = new Date(start);
  minDate.setMonth(start.getMonth() + 1);

  // Memeriksa apakah rentang minimal kurang dari atau sama dengan 1 bulan
  if (end > minDate) {
    // console.log("Rentang tanggal tidak boleh lebih dari 1 bulan.");
    // return false;
    return {
      pesan: "Rentang tanggal tidak boleh lebih dari 1 bulan",
      status: false,
    };
  }

  // Rentang tanggal valid
  return {
    pesan: "",
    status: true,
  };
};

export function enterText(text: string, n: number) {
  const chunks = [];
  for (let i = 0; i < text.length; i += n) {
    chunks.push(text.slice(i, i + n));
  }
  return chunks.join("\n");
}
export const setItem = <T,>(nama: string, data: T) => {
  if (typeof window !== "undefined") {
    const item: LocalStorageItem<T> = {
      nama: doEncrypt(nama),
      data: doEncrypt(data),
    };
    localStorage.setItem(item.nama, JSON.stringify(item.data));
  }
};

export const removeItem = (nama: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(doEncrypt(nama));
  }
};

export const addTgl = (date: Date, day: number) => {
  date.setDate(date.getDate() + day);
  return convertDate(String(date));
};

export const playSound = (src: string): void => {
  try {
    const sound = new Audio();
    sound.src = src;
    sound.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  } catch (error) {
    console.log(error);
  }
};

export const pembulatan = (harga: number) => {
  const parameter = 500;
  const harga_calculated = harga || 0;

  const harga_modded = harga_calculated % Number(parameter);

  let harga_jual = harga_calculated;

  if (harga_modded !== 0) {
    harga_jual = harga_jual - harga_modded + Number(parameter);
  }
  return harga_jual || 0;
};

export const getCurrentDateTime = () => {
  const currentDate = new Date();

  // Mendapatkan informasi tanggal, bulan, dan tahun
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Ingat, indeks bulan dimulai dari 0
  const year = currentDate.getFullYear();

  // Mendapatkan informasi jam, menit, dan detik
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format tampilan tanggal dan waktu
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export const maskEmail = (email: string) => {
  if (!email) return "";

  const finalArr: string[] = [];
  const len: number = email.indexOf("@");

  email.split("").forEach((_item: string, pos: number) => {
    pos >= 1 && pos <= len - 2 ? finalArr.push("*") : finalArr.push(email[pos]);
  });

  return finalArr.join("");
};

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const ReplaceValue = (value: string) => {
  if (value) {
    return value.replace(" ", "_");
  } else {
    return value;
  }
};
export const dataURLtoFile = (dataurl: string, filename?: string): File => {
  // eslint-disable-next-line prefer-const
  let arr = dataurl.split(","),
    // eslint-disable-next-line prefer-const
    bstr = atob(arr[1]),
    n = bstr.length,
    // eslint-disable-next-line prefer-const
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], (filename || "file") + ".jpg", {
    type: "image/jpg",
  });
};

export const addOneDay = (date: Date): Date => {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + 1);
  return dateCopy;
};
export const userData: UserLoginInterFace =
  getItem<UserLoginInterFace>("userdata");

export const timestamp = new Date().toISOString();

export const capitalize = (str: string) => {
  return str
    .toLocaleLowerCase()
    .replace(/\b\w+\b/g, (c) => c.charAt(0).toUpperCase() + c.slice(1));
};

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      const base64String: string = (reader.result as string).split(",")[1];
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function convertDate(tgl: string, format?: boolean) {
  return moment(new Date(tgl)).format(format ? "DD-MM-YYYY" : "YYYY-MM-DD");
}
export function convertDateTime(tgl: string) {
  return moment(new Date(tgl), "Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss");
}

export const setTitle = (title: string) => {
  document.title = title + " | Time Keeping Management";
};
export const convertToJson = (csv: string): string => {
  const lines = csv.split("\n");
  const result: Record<string, string>[] = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: Record<string, string> = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].toLowerCase().replace(" ", "_")] = currentline[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
};

export const readAndParseFile = (
  file: File | null
): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = (evt: ProgressEvent<FileReader>) => {
        const bstr = evt.target?.result as string;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws);
        const hasil = JSON.parse(convertToJson(data)) as Record<
          string,
          string
        >[];
        resolve(hasil);
      };

      reader.onerror = () => {
        reject(new Error("Error reading the file."));
      };
    } else {
      reject(new Error("File is undefined."));
    }
  });
};

export const JSONToCSVConvertor = (
  JSONData: Record<string, string>[] | string,
  ReportTitle: string,
  ShowLabel: boolean
): void => {
  // If JSONData is not an object then JSON.parse will parse the JSON string into an Object
  const arrData =
    typeof JSONData !== "object"
      ? JSON.parse(JSONData as string)
      : (JSONData as Record<string, string>[]);

  let CSV = "";

  // This condition will generate the Label/Header
  if (ShowLabel) {
    let name = "";

    // This loop will extract the label from the 1st index of an array
    for (const index in arrData[0]) {
      // Now convert each value to string and comma-separated
      name += index + ",";
    }

    name = name.slice(0, -1);

    // Append Label name with line break
    CSV += name + "\r\n";
  }

  // 1st loop is to extract each row
  for (let i = 0; i < arrData.length; i++) {
    let row = "";

    // 2nd loop will extract each column and convert it into a string, comma-separated
    for (const index in arrData[i]) {
      row += `"${arrData[i][index]}",`;
    }

    row = row.slice(0, row.length - 1);

    // Add a line break after each row
    CSV += row + "\r\n";
  }

  if (CSV === "") {
    alert("Invalid data");
    return;
  }

  // Generate a file name
  let fileName = "";
  // This will remove the blank spaces from the title and replace them with an underscore
  fileName += ReportTitle.replace(/ /g, "_");

  // Initialize the file format you want, either csv or xls
  const uri = "data:text/csv;charset=utf-8," + escape(CSV);

  // Now the little tricky part.
  // You can use either >> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension

  // This trick will generate a temp <a /> tag
  const link = document.createElement("a");
  link.href = uri;

  // Set the visibility hidden so it will not affect your web layout
  link.style.visibility = "hidden";
  link.download = fileName + ".csv";

  // This part will append the anchor tag and remove it after an automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatDate = (date: Date | string) => {
  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  } else {
    d = date;
  }

  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();

  return [year, month, day].join("-");
};

export const generateSignature = (timestampApp: string) => {
  const userData: UserLoginInterFace = getItem<UserLoginInterFace>("userdata");

  const signature = CryptoJS.SHA256(
    VITE_APP_KEY +
      VITE_APP_SECRETKEY +
      (userData?.access_token || "") +
      timestampApp
  ).toString();

  return signature;
};
export const generateSecret = () => {
  const seCret = CryptoJS.SHA256(VITE_APP_SECRETKEY).toString();

  return seCret;
};

export const LoadingApp = () => {
  return (
    <div
      id="loader-container"
      className="preloader flex-column justify-content-center align-items-center"
    >
      <img
        className="animation__shake"
        alt="AdminLTELogo"
        style={{ borderRadius: 10 }}
        height="100"
        src={""}
        width="100"
      />
    </div>
  );
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export const TextFile = (nama_file: string): void => {
  const element: HTMLAnchorElement = document.createElement("a");
  const elementValue: any = document.getElementById("nota_ganerate");
  if (elementValue) {
    const file: Blob = new Blob([elementValue?.value], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = nama_file + ".txt";
    document.body.appendChild(element);
    element.click();
  }
};
export const timeout = (time: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
export const removeWindowClass = (classList: string) => {
  const window: HTMLElement | null =
    document && document.getElementById("root");
  if (window) {
    window.classList.remove(classList);
  }
};

export const addWindowClass = (classList: string) => {
  const window: HTMLElement | null =
    document && document.getElementById("root");
  if (window) {
    window.classList.add(classList);
  }
};

interface StatusInput {
  type: "jam_datang" | "jam_pulang" | "isoma";
  status: string;
}

export function getBgColor({ type, status }: StatusInput): string {
  switch (type) {
    case "jam_datang":
      if (status === "ONTIME") {
        return "#D5E7D4";
      } else if (status === "LATE") {
        return "#F7CECC";
      } else if (status === "CUTI") {
        return "#FFDA78";
      } else if (status === "LIBUR") {
        return "#FFFFFF";
      } else {
        return "#F7CECC";
      }
    case "jam_pulang":
      if (status === "ONTIME") {
        return "#D5E7D4";
      } else if (status === "EARLY") {
        return "#ebc9b2";
      } else if (status === "CUTI") {
        return "#FFDA78";
      } else if (status === "LIBUR") {
        return "#FFFFFF";
      } else {
        return "#F7CECC";
      }
    case "isoma":
      if (status === "ONTIME") {
        return "#D5E7D4";
      } else if (status === "OVERTIME") {
        return "#FFE6CC";
      } else if (status === "CUTI") {
        return "#FFDA78";
      } else if (status === "LIBUR") {
        return "#FFFFFF";
      } else {
        return "#F7CECC";
      }
    default:
      return "#F7CECC";
  }
}
