/**
 * Antarmuka untuk menggambarkan parameter konversi cuti.
 */
export interface ParameterKonversiCutiInterFace {
  /**
   * Total nilai konversi cuti dalam Rupiah.
   * @example 123123
   */
  _id: string;
  /**
   * Total nilai konversi cuti dalam Rupiah.
   * @example 50000
   */
  total_rp: number;

  /**
   * Nama pengguna yang memperbarui data konversi cuti.
   * @example "admin"
   */
  update_by: string;

  /**
   * Tanggal dan waktu pembaruan data.
   * Format: YYYY-MM-DDTHH:mm:ss
   * @example new Date("2024-05-01T01:01:01")
   */
  update_date: Date;
}

// Contoh pembuatan objek ParameterKonversiCutiInterFace
export const contohKonversiCuti: ParameterKonversiCutiInterFace = {
  _id: "1231231",
  total_rp: 50000,
  update_by: "admin",
  update_date: new Date("2024-05-01T01:01:01"),
};
