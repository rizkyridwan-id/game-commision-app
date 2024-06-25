const urlApi = {
  dataMaster: {
    user: "user",
    toko: "toko",
    jabatan: "jabatan",
    hariLibur: "hari-libur",
    pegawai: "pegawai",
    updatePinPegawai: "pegawai/service/change-pin",
  },
  paramter: {
    bonusSales: "parameter-bonus-sales",
    targetSales: "parameter-target-sales",
    targetToko: "parameter-target-toko",
    parameterCuti: "parameter-gap-cuti",
    parameterKonversiCuti: "parameter-konversi-cuti",
    parameterShiftKerja: "parameter-shift-kerja",
  },
  externalApi: {
    dataSales: "external/sales",
    omzetSales: "external/sales/monthly-omzet",
  },
  timeKeeping: {
    kehadiran: "time-keeping/service/absen-kehadiran",
    istirahat: "time-keeping/service/absen-istirahat",
    break: "time-keeping/service/absen-break",
    sholat: "time-keeping/service/absen-sholat",
    validationPin: "pegawai/service/pin-validation",
    dataTimeKeeping: "time-keeping",
  },

  transaksi: {
    cuti: "cuti-request",
    pelanggaranPegawai: "pelanggaran-pegawai",
    kasbon: "kasbon",
    payroll: "payroll",
    payrollSummary: "payroll/pegawai-summary",
    potonganLain: "potongan-lain-lain",
    omzetSales: "omzet-sales/bulk",
  },

  report: {
    timeKeeping: "time-keeping/report/pegawai-time-keeping",
    cuti: "cuti-request/report/pengajuan-cuti",
    pelanggaranPegawai: "pelanggaran-pegawai/report",
    kasbon: "kasbon/report",
    potonganLain: "potongan-lain-lain/report",
    payroll: "payroll/report",
    globalPayroll: "payroll/report-global",
  },
  login: "auth/login",
  dashboard: {
    hbd: "dashboard/member-hbd",
    cuti: "dashboard/unreviewed-cuti-request",
  },

  utility: {
    memberCard: "member-card/cetak",
  },
};

export { urlApi };
