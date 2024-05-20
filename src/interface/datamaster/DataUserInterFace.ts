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
  level: "OWN" | "ADMIN" | "SPV";
}

// Contoh pembuatan objek DataUserInterFace
export const contohDataUserInterFace: DataUserInterFace[] = [
  {
    _id: "664ae9bfff589214d3e53090",
    user_id: "USR001",
    user_name: "johndoe",
    password: "securepassword123",
    hak_akses_json: '{"read": true, "write": false, "delete": false}',
    level: "ADMIN",
  },
  {
    _id: "664ae9bfff589214d3e53090",
    user_id: "USR002",
    user_name: "sam",
    password: "password",
    hak_akses_json: '{"read": true, "write": false, "delete": false}',
    level: "ADMIN",
  },
];
