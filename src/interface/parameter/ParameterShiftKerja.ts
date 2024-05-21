/**
 * Antarmuka untuk menggambarkan data shift.
 */
export interface ParameterShiftKerjaInterFace {
  /**
   * ID unik untuk setiap data shift.
   * @example "12345"
   */
  _id: string;

  /**
   * Tipe shift, dapat berupa "1", "2", atau "3".
   * @example "1"
   */
  type_shift: string;

  /**
   * Waktu awal kedatangan yang diharapkan dalam format "HH:mm".
   * @example "08:00"
   */
  dari_jam_datang: string;

  /**
   * Waktu batas terakhir kedatangan dalam format "HH:mm".
   * @example "09:00"
   */
  sampai_jam_datang: string;

  /**
   * Waktu batas pulang dalam format "HH:mm".
   * @example "17:00"
   */
  jam_pulang: string;

  /**
   * Nama pengguna yang memperbarui data shift.
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

// Contoh pembuatan objek Shift
export const contohShift: ParameterShiftKerjaInterFace = {
  _id: "12345",
  type_shift: "1",
  dari_jam_datang: "08:00",
  sampai_jam_datang: "09:00",
  jam_pulang: "17:00",
  update_by: "admin",
  update_date: new Date("2024-05-01T01:01:01"),
};
