export interface PayrollInterFace {
  kode_toko: string; // Store code with specific string values
  nama_pegawai: string; // Employee code
  kode_pegawai: string; // Employee code
  jabatan: string; // Job title
  periode: string; // Payroll period (e.g., "Mei-2024")
  gaji_pokok: number; // Basic salary
  tunjangan_jabatan: number; // Position allowance
  bonus_target: number; // Target bonus
  bonus_absen: number; // Attendance bonus
  bonus_jabatan: number; // Attendance bonus
  bonus_lembur: number; // Attendance bonus
  kasbon: number; // Advance (debt)
  potongan_lain: number; // Other deductions
  grand_total: number; // Grand total
  total_yg_diterima: number; // Total amount received
  input_by: string; // Person who inputted the data
  input_date: string; // Input date as a datetime string in ISO 8601 format
}
