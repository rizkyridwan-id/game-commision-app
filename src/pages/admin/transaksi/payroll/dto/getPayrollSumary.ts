export interface GetPayrollPegawaiSummaryDtoProps {
  nama_pegawai: string;
  jabatan: string;
  gaji_pokok: number;
  tunjangan_jabatan: number;
  tgl_lahir: number;
  bonus_sales: number;
  status_kehadiran: {
    is_late_weekly: boolean;
    is_late_monthly: boolean;
  };
  potongan: {
    kasbon: number;
    potongan_lain: number;
  };
  konversi_cuti: number;
}
