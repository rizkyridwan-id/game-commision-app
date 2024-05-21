/**
 * Antarmuka untuk menggambarkan data target.
 */
export interface ParameterTargetInterFace {
  /**
   * ID unik untuk setiap data target.
   * @example "12345"
   */
  _id: string;

  /**
   * Tipe target, dapat berupa "FAKTUR", "GRAM", atau "RUPIAH".
   * @example "FAKTUR"
   */
  tipe_target: "FAKTUR" | "GRAM" | "RUPIAH";

  /**
   * Nilai target yang ditetapkan.
   * Contoh: 1000 untuk FAKTUR, 1000.000 untuk GRAM, 100,000,000 untuk RUPIAH.
   * @example 1000.0
   */
  target: number;

  /**
   * Nama pengguna yang memperbarui data target.
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

// Contoh pembuatan objek Target
export const contohTarget: ParameterTargetInterFace = {
  _id: "12345",
  tipe_target: "FAKTUR",
  target: 1000.0,
  update_by: "admin",
  update_date: new Date("2024-05-01T01:01:01"),
};
