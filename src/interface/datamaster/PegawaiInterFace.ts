/**
 * Antarmuka untuk menggambarkan data karyawan.
 */
export interface PegawaiInterface {
  /**
   * No Urut.
   * @example "1"
   */
  no?: number;
  /**
   * Kode unik untuk setiap karyawan.
   * @example "001123123123"
   */
  _id: string;
  /**
   * Kode unik untuk setiap karyawan.
   * @example "001"
   */
  kode_pegawai: string;

  /**
   * Nama lengkap dari karyawan.
   * @example "Agnes"
   */
  nama_pegawai: string;

  /**
   * Tanggal lahir karyawan dalam format string.
   * @example "24-10-1992"
   */
  tgl_lahir: string;

  /**
   * Jabatan karyawan.
   * @example "KASIR"
   */
  jabatan: string;

  /**
   * Hari libur karyawan.
   * @example "SENIN"
   */
  hari_libur: string;

  /**
   * Tipe shift karyawan.
   * @example "1/2/3"
   */
  type_shift: string;

  /**
   * Total menit istirahat per hari.
   * @example 30
   */
  daily_rest_minute: number;

  /**
   * Total menit sholat per hari.
   * @example 15
   */
  daily_sholat_minute: number;

  /**
   * Total menit break per hari.
   * @example 10
   */
  daily_break_minute: number;

  /**
   * Jatah cuti tahunan.
   * @example 7
   */
  cuti_tahunan: number;

  /**
   * Gaji pokok per bulan.
   * @example 2000000
   */
  gaji_pokok: number;

  /**
   * Tunjangan jabatan per bulan.
   * @example 500000
   */
  tunjangan_jabatan: number;

  /**
   * Kode unik untuk setiap sales yang terkait dengan karyawan.
   * @example "AGN"
   */
  kode_sales: string;

  /**
   * Kode unik untuk setiap toko yang terkait dengan karyawan.
   * @example "KMT"
   */
  kode_toko: string;

  /**
   * PIN karyawan.
   * @example "123456"
   */
  pin: string;
}

// Contoh pembuatan objek Karyawan
export const contohKaryawan: PegawaiInterface = {
  _id: "001",
  kode_pegawai: "001",
  nama_pegawai: "Agnes",
  tgl_lahir: "24-10-1992",
  jabatan: "KASIR",
  hari_libur: "SENIN",
  type_shift: "1/2/3",
  daily_rest_minute: 30,
  daily_sholat_minute: 15,
  daily_break_minute: 10,
  cuti_tahunan: 7,
  gaji_pokok: 2000000,
  tunjangan_jabatan: 500000,
  kode_sales: "AGN",
  kode_toko: "KMT",
  pin: "123456",
};
