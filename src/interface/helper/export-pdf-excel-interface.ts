type FormatType = "RP" | "GR" | "DATE" | "DATETIME" | "";
type HalignType = "center" | "right" | "left" | "";
export interface ColumnGenarator<T> {
  key: keyof T;
  label?: string;
  options?: {
    format?: FormatType;
    halign?: HalignType;
    disabledColumn?: boolean;
    disabledFooter?: boolean;
  };
}
export interface DataItemGenerator {
  [key: string]: any;
}

export interface GenaratorExportPdfExcel<T> {
  title: string;
  grouping: string[];
  columns: ColumnGenarator<T>[];
  data: DataItemGenerator[];
  type: "EXCEL" | "PDF" | "ALL";
  dataToko?: {
    nama_toko: string;
    alamat_toko: string;
    kode_tok?: string;
  };
  formatPdf: {
    orientation: "p" | "portrait" | "l" | "landscape";
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    width?: number;
    height?: number;
    fontSIze?: number;
  };
  date?: {
    tgl_system?: string;
    start_date?: string;
    end_date?: string;
  };
  grandTotalSetting?: {
    disableGrandTotal?: boolean;
    colSpan?: number;
  };
}
