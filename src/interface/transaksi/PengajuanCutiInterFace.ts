/**
 * Antarmuka untuk menggambarkan data pengajuan cuti.
 */
export interface PengajuanCutiInterFace {
  input_by: string;
  input_date: string; // ISO 8601 date string
  kode_pegawai: string;
  nama_pegawai: string;
  kode_toko: string;
  leave_description: string;
  leave_end_date: string; // ISO 8601 date string
  leave_start_date: string; // ISO 8601 date string
  status_validasi: string;
  tgl_system: string; // ISO 8601 date string
  tgl_validasi: string; // ISO 8601 date string
  validasi_by: string; // ISO 8601 date string
  reject_description: string;
  _id: string;
}
