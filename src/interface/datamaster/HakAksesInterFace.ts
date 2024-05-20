/**
 * Antarmuka untuk menggambarkan item menu anak (sub-menu).
 */
interface ChildrenAkses {
  /**
   * Jalur atau path untuk navigasi.
   * @example "/app/data-pegawai"
   */
  path: string;

  /**
   * Judul dari item menu.
   * @example "Data Pegawai"
   */
  title: string;

  /**
   * Menentukan apakah item menu ini akan ditampilkan.
   * @example true
   */
  is_show: boolean;
}

/**
 * Antarmuka untuk menggambarkan item menu utama.
 */
export interface HakAksesInterFace {
  /**
   * Jalur atau path untuk navigasi.
   * @example "#"
   */
  path: string;

  /**
   * Ikon yang digunakan untuk item menu, biasanya mengikuti kelas ikon font.
   * @example "fa fa-database"
   */
  icon: string;

  /**
   * Judul dari item menu.
   * @example "Data Master"
   */
  title: string;

  /**
   * Menentukan apakah item menu ini akan ditampilkan.
   * @example true
   */
  is_show: boolean;

  /**
   * Daftar item menu anak (sub-menu).
   */
  children: ChildrenAkses[];

  /**
   * Menentukan apakah menu ini sedang diperluas atau tidak.
   * @example true
   */
  expanded: boolean;
}

// Contoh pembuatan objek MenuItem
export const contohMenu: HakAksesInterFace = {
  path: "#",
  icon: "fa fa-database",
  title: "Data Master",
  is_show: true,
  children: [
    {
      path: "/app/data-pegawai",
      title: "Data Pegawai",
      is_show: true,
    },
    {
      path: "#",
      title: "Data Jabatan",
      is_show: true,
    },
    {
      path: "#",
      title: "Data Hari Libur Toko",
      is_show: true,
    },
  ],
  expanded: true,
};
