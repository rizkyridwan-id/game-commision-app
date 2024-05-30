/**
 * Antarmuka untuk menggambarkan data DataUserInterFace.
 */
export interface DataUserInterFace {
  /**
   * ID unik untuk setiap DataUserInterFace.
   * @example ""
   */
  _id: string;

  /**
   * ID unik untuk setiap DataUserInterFace.
   * @example "USR001"
   */
  user_id: string;

  /**
   * Nama DataUserInterFace untuk login.
   * @example "johndoe"
   */
  user_name: string;

  /**
   * Kata sandi DataUserInterFace untuk login.
   * @example "securepassword123"
   */
  password: string;

  /**
   * Hak akses DataUserInterFace dalam format JSON.
   * @example '{"read": true, "write": false, "delete": false}'
   */
  hak_akses_json: string;

  /**
   * Level akses DataUserInterFace.
   * @example "admin"
   */
  level: string;

  kode_toko: string;
}
