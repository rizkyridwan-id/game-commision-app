/**
 * Antarmuka untuk menggambarkan data pengajuan cuti.
 */
export interface PengajuanCutiInterFace {
  /**
   * Kode unik untuk setiap toko.
   * @example "MKT"
   */
  kode_toko: string;

  /**
   * Tanggal pengajuan cuti.
   * @example new Date("2024-05-01")
   */
  tanggal: Date;

  /**
   * Kode unik untuk setiap karyawan.
   * @example "AG01"
   */
  kode_pegawai: string;

  /**
   * Tanggal mulai cuti.
   * @example new Date("2024-06-01")
   */
  cuti_dari: Date;

  /**
   * Tanggal akhir cuti.
   * @example new Date("2024-06-01")
   */
  cuti_sampai: Date;

  /**
   * Alasan pengajuan cuti.
   * @example "Healing"
   */
  alasan_cuti: string;

  /**
   * Tanggal validasi pengajuan cuti.
   * @example new Date("2024-05-05")
   */
  tanggal_validasi: Date;

  /**
   * Nama validator pengajuan cuti.
   * @example "HRD"
   */
  validasi_by: string;

  /**
   * Tanggal penolakan pengajuan cuti.
   * @example null
   */
  tanggal_tolak: Date | null;

  /**
   * Alasan penolakan pengajuan cuti.
   * @example null
   */
  alasan_tolak: string | null;

  /**
   * Nama penolak pengajuan cuti.
   * @example null
   */
  tolak_by: string | null;

  /**
   * Status pengajuan cuti.
   * @example "OPEN"
   */
  status: string;

  /**
   * Nama pengguna yang menginput data pengajuan cuti.
   * @example "admin"
   */
  input_by: string;

  /**
   * Tanggal dan waktu input data pengajuan cuti.
   * @example new Date("2024-05-01T01:01:01")
   */
  input_date: Date;
}

// Contoh pembuatan objek PengajuanCutiInterFace
export const contohPengajuanCuti: PengajuanCutiInterFace = {
  kode_toko: "MKT",
  tanggal: new Date("2024-05-01"),
  kode_pegawai: "AG01",
  cuti_dari: new Date("2024-06-01"),
  cuti_sampai: new Date("2024-06-01"),
  alasan_cuti: "Healing",
  tanggal_validasi: new Date("2024-05-05"),
  validasi_by: "HRD",
  tanggal_tolak: null,
  alasan_tolak: null,
  tolak_by: null,
  status: "OPEN",
  input_by: "admin",
  input_date: new Date("2024-05-01T01:01:01"),
};
