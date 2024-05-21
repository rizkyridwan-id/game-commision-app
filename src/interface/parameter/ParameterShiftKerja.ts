/**
 * Antarmuka untuk menggambarkan data shift.
 */
export interface ParameterShiftKerja {
  /**
   * ID unik untuk setiap data shift.
   * @example "12345"
   */
  _id: string;

  /**
   * Tipe shift, dapat berupa "1", "2", atau "3".
   * @example "1"
   */
  type_shift: "1" | "2" | "3";

  /**
   * Penentuan shift.
   * @example "Penentuan Shift"
   */
  penentuan_shift: string;

  /**
   * Waktu awal kedatangan yang diharapkan dalam format "HH:mm".
   * @example "08:00"
   */
  dari_jam_datang: string;

  /**
   * Acuan tepat waktu.
   * @example "Acuan Tepat Waktu"
   */
  acuan_tepat_waktu: string;

  /**
   * Waktu batas terakhir kedatangan dalam format "HH:mm".
   * @example "09:00"
   */
  sampai_jam_datang: string;

  /**
   * Acuan batas terakhir kehadiran.
   * @example "Acuan Batas Terakhir Kehadiran"
   */
  acuan_batas_terakhir_kehadiran: string;

  /**
   * Waktu batas pulang dalam format "HH:mm".
   * @example "17:00"
   */
  jam_pulang: string;

  /**
   * Acuan batas waktu pulang.
   * @example "Acuan Batas Waktu Pulang"
   */
  acuan_batas_waktu_pulang: string;

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
export const contohShift: ParameterShiftKerja = {
  _id: "12345",
  type_shift: "1",
  penentuan_shift: "Penentuan Shift",
  dari_jam_datang: "08:00",
  acuan_tepat_waktu: "Acuan Tepat Waktu",
  sampai_jam_datang: "09:00",
  acuan_batas_terakhir_kehadiran: "Acuan Batas Terakhir Kehadiran",
  jam_pulang: "17:00",
  acuan_batas_waktu_pulang: "Acuan Batas Waktu Pulang",
  update_by: "admin",
  update_date: new Date("2024-05-01T01:01:01"),
};
