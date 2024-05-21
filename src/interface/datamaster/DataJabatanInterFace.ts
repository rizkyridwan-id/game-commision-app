/**
 * Antarmuka untuk menggambarkan data jabatan.
 */
export interface DataJabatanInterFace {
  /**
   * Nama jabatan atau posisi di perusahaan.
   * Hanya bisa bernilai "SALES", "KASIR", atau "KEPALA TOKO".
   * @example "KASIR"
   */
  _id: string;

  jabatan: string;

  /**
   * Status aktif jabatan (true jika aktif, false jika tidak).
   * @example true
   */
  status_aktif: boolean;

  /**
   * Nama pengguna yang menginput data jabatan.
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

// Contoh pembuatan objek Jabatan
export const contohJabatan: DataJabatanInterFace[] = [
  {
    _id: "idoajd1031030123",
    jabatan: "KASIR",
    status_aktif: true,
    input_by: "admin",
    input_date: new Date("2024-05-01T01:01:01"),
  },
];
