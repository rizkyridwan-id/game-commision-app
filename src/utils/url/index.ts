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
    parameterLembur: "parameter-lembur",
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
    batalcuti: "cuti-request/batal-cuti",
    pelanggaranPegawai: "pelanggaran-pegawai",
    kasbon: "kasbon",
    payroll: "payroll",
    payrollSummary: "payroll/pegawai-summary",
    potonganLain: "potongan-lain-lain",
    omzetSales: "omzet-sales/bulk",
    lembur: "transaksi-lembur",
  },

  report: {
    timeKeeping: "time-keeping/report/pegawai-time-keeping",
    cuti: "cuti-request/report/pengajuan-cuti",
    pelanggaranPegawai: "pelanggaran-pegawai/report",
    kasbon: "kasbon/report",
    potonganLain: "potongan-lain-lain/report",
    payroll: "payroll/report",
    globalPayroll: "payroll/report-global",
    getReportLembur: "transaksi-lembur/report",
  },
  login: "auth/login",
  otorisasi: "user/otorisasi",
  dashboard: {
    hbd: "dashboard/member-hbd",
    cuti: "dashboard/unreviewed-cuti-request",
  },

  utility: {
    memberCard: "member-card/cetak",
    getModule: "setup-system/get-module",
    createModule: "setup-system/create-module",
  },
};

export { urlApi };
