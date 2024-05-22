/**
 * Antarmuka untuk menggambarkan data toko.
 */
export interface DataTokoInterFace {
  /**
   * ID unik untuk setiap data toko.
   * @example "12345"
   */
  _id: string;

  /**
   * Kode unik untuk setiap toko.
   * @example "KMT"
   */
  kode_toko: string;

  /**
   * Kode unik untuk setiap toko.
   * @example "HIDUP"
   */
  nama_toko: string;

  /**
   * Nama portal atau platform toko.
   * @example "Nagagold"
   */
  portal: string;

  /**
   * Alamat lengkap toko.
   * @example "Jl. Sudirman No.1, Jakarta"
   */
  alamat_toko: string;
}

// Contoh pembuatan objek DataTokoInterFace
export const contohToko: DataTokoInterFace = {
  _id: "12345",
  nama_toko: "HIDUP",
  kode_toko: "KMT",
  portal: "Nagagold",
  alamat_toko: "Jl. Sudirman No.1, Jakarta",
};
