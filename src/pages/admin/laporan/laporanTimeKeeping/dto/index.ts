export interface LaporanTimeKeepingDto {
  kode_toko: string;
  tgl_system: string;
  type_time_keeping: "KEHADIRAN" | "ISTIRAHAT" | "BREAK" | "SHOLAT";
  type_shift: string;
}
