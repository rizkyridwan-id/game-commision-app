/**
 * Antarmuka untuk menggambarkan data laporan kehadiran.
 */
export interface IReportTimeKeeping {
  /**
   * Nama pengguna yang menginput data laporan kehadiran.
   * @example "SYSTEM"
   */
  input_by: string;

  /**
   * Tanggal dan waktu input data laporan kehadiran.
   * @example "2024-05-27T06:41:23.929Z"
   */
  input_date: string; // ISO 8601 string format

  /**
   * Waktu akhir break.
   * @example "--:--"
   */
  jam_break_end: string;

  /**
   * Waktu mulai break.
   * @example "--:--"
   */
  jam_break_start: string;

  /**
   * Waktu kedatangan.
   * @example "--:--"
   */
  jam_datang: string;

  /**
   * Waktu akhir istirahat.
   * @example "--:--"
   */
  jam_istirahat_end: string;

  /**
   * Waktu mulai istirahat.
   * @example "--:--"
   */
  jam_istirahat_start: string;

  /**
   * Waktu pulang.
   * @example "--:--"
   */
  jam_pulang: string;

  /**
   * Waktu akhir sholat.
   * @example "--:--"
   */
  jam_sholat_end: string;

  /**
   * Waktu mulai sholat.
   * @example "--:--"
   */
  jam_sholat_start: string;

  /**
   * Kode unik untuk setiap karyawan.
   * @example "03"
   */
  kode_pegawai: string;

  /**
   * Kode unik untuk setiap toko.
   * @example "TOKO1"
   */
  kode_toko: string;

  /**
   * Nama karyawan.
   * @example "ROBOT"
   */
  nama_pegawai: string;

  /**
   * Status break.
   * @example "TIDAK HADIR"
   */
  status_break: string;

  /**
   * Status kedatangan.
   * @example "TIDAK HADIR"
   */
  status_datang: string;

  /**
   * Status istirahat.
   * @example "TIDAK HADIR"
   */
  status_istirahat: string;

  /**
   * Status pulang.
   * @example "TIDAK HADIR"
   */
  status_pulang: string;

  /**
   * Status sholat.
   * @example "TIDAK HADIR"
   */
  status_sholat: string;

  /**
   * Tanggal sistem laporan kehadiran.
   * @example "2024-05-27"
   */
  tgl_system: string;

  /**
   * Total menit yang digunakan untuk break.
   * @example 0
   */
  total_break: number;

  /**
   * Total menit yang digunakan untuk istirahat.
   * @example 0
   */
  total_istirahat: number;

  /**
   * Total menit yang digunakan untuk sholat.
   * @example 0
   */
  total_sholat: number;
}
