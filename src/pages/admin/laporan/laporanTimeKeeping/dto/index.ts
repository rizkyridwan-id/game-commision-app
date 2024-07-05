export interface LaporanTimeKeepingDto {
  start_date: string;
  end_date: string;
  kode_toko: string;
  tgl_system: string;
  type_time_keeping: "KEHADIRAN" | "ISTIRAHAT" | "BREAK" | "SHOLAT";
  type_shift: string;
}
