const MenuPusat = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
    is_show: true,
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Data Master",
    is_show: false,
    children: [
      { path: "/app/data-pegawai", title: "Data Pegawai", is_show: false },
      { path: "/app/data-jabatan", title: "Data Jabatan", is_show: false },
      {
        path: "/app/data-hari-libur",
        title: "Data Hari Libur Toko",
        is_show: false,
      },
      { path: "/app/data-user", title: "Data User", is_show: false },
    ],
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Parameter",
    is_show: false,
    children: [
      { path: "/app/parameter-bonus", title: "Bonus Sales", is_show: false },
      {
        path: "/app/parameter-target-sales",
        title: "Target Sales",
        is_show: false,
      },
      {
        path: "/app/parameter-target-toko",
        title: "Target Toko",
        is_show: false,
      },
      { path: "/app/parameter-cuti", title: "Parameter Cuti", is_show: false },
      {
        path: "/app/parameter-koversi-cuti",
        title: "Parameter Konversi Cuti",
        is_show: false,
      },
      {
        path: "/app/parameter-shift-kerja",
        title: "Parameter Shift Kerja",
        is_show: false,
      },
    ],
  },
  {
    path: "/app/time-keeping",
    icon: "fa fa-business-time",
    title: "Time Keeping",
    is_show: false,
  },
  {
    path: "#",
    icon: "fa fa-calendar-check",
    title: "Transaksi",
    is_show: false,
    children: [
      // { path: "/app/pengajuan-cuti", title: "Pengajuan Cuti", is_show: false },
      // { path: "/app/kas-bon", title: "Kas Bon", is_show: false },
      // {
      //   path: "/app/potongan-lain-lain",
      //   title: "Potongan Lain Lain",
      //   is_show: false,
      // },
      // {
      //   path: "/app/pelanggaran-pegawai",
      //   title: "Pelanggaran Pegawai",
      //   is_show: false,
      // },
      { path: "/app/payroll", title: "Payroll", is_show: false },
      { path: "/app/review-cuti", title: "Review Cuti", is_show: false },
      {
        path: "/app/sinkron-data-pegawai",
        title: "Sinkron Data Pegawai",
        is_show: false,
      },
    ],
  },
  {
    path: "#",
    icon: "fa fa-folder-open",
    title: "Laporan",
    is_show: false,
    children: [
      {
        path: "/app/laporan-time-keeping",
        title: "Laporan Time Keeping",
        is_show: false,
      },
      {
        path: "/app/laporan-pengajuan-cuti",
        title: "Laporan Pengajuan Cuti",
        is_show: false,
      },
      { path: "/app/laporan-kas-bon", title: "Laporan Kas Bon" },
      {
        path: "/app/laporan-potongan-lain-lain",
        title: "Laporan Potongan Lain",
        is_show: false,
      },
      {
        path: "/app/laporan-payroll",
        title: "Laporan Payroll",
        is_show: false,
      },
      {
        path: "/app/laporan-pelangaran-pegawai",
        title: "Laporan Pelanggaran Pegawai",
        is_show: false,
      },
      {
        path: "/app/laporan-global-payroll",
        title: "Laporan Global Payroll",
        is_show: false,
      },
      {
        path: "/app/laporan-data-pegawai",
        title: "Laporan Data Pegawai",
        is_show: false,
      },
    ],
  },
  {
    path: "#",
    icon: "fa fa-folder-open",
    title: "Utility",
    is_show: false,
    children: [
      {
        path: "/app/setting-member",
        title: "Setting Member",
        is_show: false,
      },
      {
        path: "/app/cetak-member",
        title: "Cetak Member",
        is_show: false,
      },
      {
        path: "/app/setting-system",
        title: "Setting System",
        is_show: false,
      },
    ],
  },
];

export default MenuPusat;
