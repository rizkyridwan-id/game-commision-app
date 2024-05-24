export interface FormFilterLaporanDto {
  tgl_system?: string;
  start_date?: string;
  end_date?: string;
  option_all?: boolean;
}

export type JenisLaporanType = "EXCEL" | "PDF" | "ALL";
