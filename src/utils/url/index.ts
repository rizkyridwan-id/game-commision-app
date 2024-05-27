const urlApi = {
  dataMaster: {
    user: "user",
    toko: "toko",
    jabatan: "jabatan",
    hariLibur: "hari-libur",
    pegawai: "pegawai",
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
  },
  timeKeeping: {
    kehadiran: "time-keeping/service/absen-kehadiran",
    istirahat: "time-keeping/service/absen-istirahat",
    break: "time-keeping/service/absen-break",
    sholat: "time-keeping/service/absen-sholat",
    validationPin: "pegawai/service/pin-validation",
    dataTimeKeeping: "time-keeping",
  },

  report: {
    timeKeeping: "time-keeping/report/pegawai-time-keeping",
  },
  login: "auth/login",
};

export { urlApi };
