/**
 * Antarmuka untuk menggambarkan data pegawai.
 */
export interface PegawaiInterface {
  /**
   * Kode unik untuk setiap pegawai.
   * @example "001"
   */
  kode_pegawai: string;

  /**
   * Nama lengkap pegawai.
   * @example "AGNES"
   */
  nama_pegawai: string;

  /**
   * Tanggal lahir pegawai.
   * Format: YYYY-MM-DD
   * @example new Date("1992-10-24")
   */
  tgl_lahir: Date;

  /**
   * Jabatan atau posisi pegawai di perusahaan.
   * @example "KASIR"
   */
  jabatan: string;

  /**
   * Hari libur pegawai, diwakili sebagai angka (0 untuk Minggu, 1 untuk Senin, dan seterusnya).
   * @example 1
   */
  hari_libur: number;

  /**
   * Shift kerja pegawai, bisa 1, 2, atau 3.
   * @example "1/2/3"
   */
  shift: string;

  /**
   * Durasi waktu istirahat dalam menit.
   * @example 30
   */
  jam_istirahat: number;

  /**
   * Durasi waktu untuk sholat dalam menit.
   * @example 15
   */
  jam_sholat: number;

  /**
   * Durasi waktu istirahat singkat dalam menit.
   * @example 10
   */
  jam_break: number;

  /**
   * Jatah cuti tahunan pegawai dalam hari.
   * @example 7
   */
  jatah_cuti: number;

  /**
   * Gaji pokok bulanan pegawai dalam Rupiah.
   * @example 2000000
   */
  gaji_pokok: number;

  /**
   * Tunjangan jabatan bulanan dalam Rupiah.
   * @example 500000
   */
  tunjangan_jabatan: number;

  /**
   * Kode sales yang berhubungan dengan pegawai.
   * @example "AGN"
   */
  kode_sales: string;

  /**
   * Kode toko tempat pegawai bekerja.
   * @example "KMT"
   */
  kode_toko: string;

  /**
   * PIN 6 digit untuk keamanan.
   * @example 123456
   */
  pin: number;

  /**
   * Status aktif pegawai (true jika aktif, false jika tidak).
   * @example true
   */
  status_aktif: boolean;

  /**
   * Nama pengguna yang menginput data pegawai.
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

//Contoh penggunaan Interface
export const exampleDataPegawai: PegawaiInterface[] = [
  {
    kode_pegawai: "001",
    nama_pegawai: "AGNES",
    tgl_lahir: new Date("1992-10-24"),
    jabatan: "KASIR",
    hari_libur: 1, // Misalkan 1 mewakili hari Senin
    shift: "1/2/3",
    jam_istirahat: 30,
    jam_sholat: 15,
    jam_break: 10,
    jatah_cuti: 7,
    gaji_pokok: 2000000,
    tunjangan_jabatan: 500000,
    kode_sales: "AGN",
    kode_toko: "KMT",
    pin: 123456,
    status_aktif: true,
    input_by: "admin",
    input_date: new Date("2024-05-01T01:01:01"),
  },
  {
    kode_pegawai: "002",
    nama_pegawai: "ZIANKA",
    tgl_lahir: new Date("1992-10-24"),
    jabatan: "KASIR",
    hari_libur: 1, // Misalkan 1 mewakili hari Senin
    shift: "1/2/3",
    jam_istirahat: 30,
    jam_sholat: 15,
    jam_break: 10,
    jatah_cuti: 7,
    gaji_pokok: 2000000,
    tunjangan_jabatan: 500000,
    kode_sales: "AGN",
    kode_toko: "KMT",
    pin: 123456,
    status_aktif: true,
    input_by: "admin",
    input_date: new Date("2024-05-01T01:01:01"),
  },
];
