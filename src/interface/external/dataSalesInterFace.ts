/**
 * Antarmuka untuk menggambarkan data sales.
 */
export interface DataSalesInterFace {
  /**
   * Fee atau komisi yang diterima oleh sales.
   * @example 50000
   */
  fee: number;

  /**
   * Kode unik untuk setiap sales.
   * @example "AGN"
   */
  kode_sales: string;

  /**
   * Nama lengkap dari sales.
   * @example "Agnes"
   */
  nama_sales: string;

  /**
   * Status aktif dari sales.
   * @example true
   */
  status_aktif: boolean;
}

// Contoh pembuatan objek DataSales
export const contohSales: DataSalesInterFace = {
  fee: 50000,
  kode_sales: "AGN",
  nama_sales: "Agnes",
  status_aktif: true,
};
