/**
 * Antarmuka untuk menggambarkan data hari libur.
 */
export interface HariLiburInterFace {
  _id: string;

  /**
   * Kode Toko.
   * Format: string
   * @example NQC
   */
  kode_toko: string;

  /**
   * Tanggal hari libur.
   * Format: YYYY-MM-DD
   * @example new Date("2024-05-01")
   */
  tgl_libur: string;

  /**
   * Deskripsi atau nama dari hari libur.
   * @example "Hari Buruh"
   */
  deskripsi: string;

  /**
   * Status aktif hari libur (true jika aktif, false jika tidak).
   * @example true
   */
  status_aktif: boolean;

  /**
   * Nama pengguna yang menginput data hari libur.
   * @example "admin"
   */
  input_by: string;

  /**
   * Tanggal dan waktu input data.
   * Format: YYYY-MM-DDTHH:mm:ss
   * @example new Date("2024-05-01T01:01:01")
   */
  input_date: Date;
}

// Contoh pembuatan objek HariLiburInterFace
export const contohHariLiburInterFace: HariLiburInterFace = {
  _id: "PS)0123p131",
  kode_toko: "NQC",
  tgl_libur: "2024-05-01",
  deskripsi: "Hari Buruh",
  status_aktif: true,
  input_by: "admin",
  input_date: new Date("2024-05-01T01:01:01"),
};
