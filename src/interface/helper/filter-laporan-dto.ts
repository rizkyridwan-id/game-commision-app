export interface FormFilterLaporanDto {
  tgl_system?: string;
  start_date?: string;
  kode_toko: string;
  end_date?: string;
  start_period?: string;
  end_period?: string;
  option_all?: boolean;
}

export type JenisLaporanType = "EXCEL" | "PDF" | "ALL";
