/**
 * Antarmuka untuk menggambarkan data kehadiran karyawan.
 */
export interface TimeKeepingKehadiranInterFace {
  /**
   * ID unik untuk setiap data kehadiran.
   * @example "12345"
   */
  _id: string;

  /**
   * Kode unik untuk setiap toko.
   * @example "MKT"
   */
  kode_toko: string;

  /**
   * Tanggal kehadiran.
   * @example new Date("2024-05-01")
   */
  tanggal: Date;

  /**
   * Kode unik untuk setiap pegawai.
   * @example "001"
   */
  kode_pegawai: string;

  /**
   * Waktu kedatangan dalam format "HH:mm".
   * @example "08:00"
   */
  jam_datang: string;

  /**
   * Status kedatangan untuk indikator dashboard.
   * @example "green"
   */
  status_datang: string;

  /**
   * Waktu pulang dalam format "HH:mm".
   * @example "17:00"
   */
  jam_pulang: string;

  /**
   * Status pulang untuk indikator dashboard.
   * @example "green"
   */
  status_pulang: string;

  /**
   * Waktu mulai break dalam format "HH:mm".
   * @example "12:00"
   */
  jam_break_start: string;

  /**
   * Waktu selesai break dalam format "HH:mm".
   * @example "12:30"
   */
  jam_break_stop: string;

  /**
   * Total menit yang digunakan untuk break.
   * @example 30
   */
  total_break: number;

  /**
   * Status break untuk indikator dashboard.
   * @example "green"
   */
  status_break: string;

  /**
   * Waktu mulai istirahat dalam format "HH:mm".
   * @example "15:00"
   */
  jam_istirahat_start: string;

  /**
   * Waktu selesai istirahat dalam format "HH:mm".
   * @example "15:15"
   */
  jam_istirahat_stop: string;

  /**
   * Total menit yang digunakan untuk istirahat.
   * @example 15
   */
  total_istirahat: number;

  /**
   * Status istirahat untuk indikator dashboard.
   * @example "green"
   */
  status_istirahat: string;

  /**
   * Waktu mulai sholat dalam format "HH:mm".
   * @example "13:00"
   */
  jam_sholat_start: string;

  /**
   * Waktu selesai sholat dalam format "HH:mm".
   * @example "13:15"
   */
  jam_sholat_stop: string;

  /**
   * Total menit yang digunakan untuk sholat.
   * @example 15
   */
  total_sholat: number;

  /**
   * Status sholat untuk indikator dashboard.
   * @example "green"
   */
  status_sholat: string;

  /**
   * Nama pengguna yang menginput data kehadiran.
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

// Contoh pembuatan objek TimeKeepingKehadiranInterFace
export const contohKehadiran: TimeKeepingKehadiranInterFace[] = [
  {
    _id: "12345",
    kode_toko: "KMT",
    tanggal: new Date("2024-05-01"),
    kode_pegawai: "001",
    jam_datang: "08:00",
    status_datang: "green",
    jam_pulang: "17:00",
    status_pulang: "green",
    jam_break_start: "12:00",
    jam_break_stop: "12:30",
    total_break: 30,
    status_break: "green",
    jam_istirahat_start: "15:00",
    jam_istirahat_stop: "15:15",
    total_istirahat: 15,
    status_istirahat: "green",
    jam_sholat_start: "13:00",
    jam_sholat_stop: "13:15",
    total_sholat: 15,
    status_sholat: "green",
    input_by: "admin",
    input_date: new Date("2024-05-01T01:01:01"),
  },
];
