/**
 * Antarmuka untuk menggambarkan data bonus.
 */
export interface ParameterBonusSalesInterFace {
  /**
   * ID unik untuk setiap data bonus.
   * @example "12345"
   */
  _id: string;

  /**
   * Bonus yang diberikan berdasarkan penjualan.
   * @example 500
   */
  bonus_jual: number;

  /**
   * Bonus yang diberikan berdasarkan pembelian.
   * @example 100
   */
  bonus_beli: number;

  /**
   * Bonus yang diberikan berdasarkan hutang.
   * @example 200
   */
  bonus_hutang: number;

  /**
   * Nama pengguna yang memperbarui data bonus.
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

// Contoh pembuatan objek Bonus
export const contohBonus: ParameterBonusSalesInterFace = {
  _id: "12345",
  bonus_jual: 500,
  bonus_beli: 100,
  bonus_hutang: 200,
  update_by: "admin",
  update_date: new Date("2024-05-01T01:01:01"),
};
