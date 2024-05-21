const MenuPusat = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
    is_show: false,
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Data Master",
    is_show: false,
    children: [
      { path: "/app/data-pegawai", title: "Data Pegawai", is_show: false },
      { path: "/app/data-jabatan", title: "Data Jabatan", is_show: false },
      { path: "#", title: "Data Hari Libur Toko", is_show: false },
      { path: "/app/data-user", title: "Data User", is_show: false },
    ],
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Parameter",
    is_show: false,
    children: [
      { path: "#", title: "Bonus Sales", is_show: false },
      { path: "#", title: "Target Sales", is_show: false },
      { path: "#", title: "Target Toko", is_show: false },
      { path: "#", title: "Parameter Cuti", is_show: false },
      { path: "#", title: "Parameter Konversi CUti", is_show: false },
      { path: "#", title: "Parameter Shift Kerja", is_show: false },
    ],
  },
  {
    path: "#",
    icon: "fa fa-business-time",
    title: "Time Keeping",
    is_show: false,

    children: [
      { path: "#", title: "Time Keeping Kehadiran", is_show: false },
      { path: "#", title: "Time Keeping Break", is_show: false },
      { path: "#", title: "Time Keeping Istirahat", is_show: false },
      { path: "#", title: "Time Keeping Sholat", is_show: false },
    ],
  },
  {
    path: "#",
    icon: "fa fa-calendar-check",
    title: "Transaksi",
    is_show: false,
    children: [
      { path: "#", title: "Pengajuan Cuti", is_show: false },
      { path: "#", title: "Review Cuti", is_show: false },
      { path: "#", title: "Kas Bon", is_show: false },
      { path: "#", title: "Potongan Lain", is_show: false },
      { path: "#", title: "Pelanggaran Pegawai", is_show: false },
      { path: "#", title: "Payroll", is_show: false },
    ],
  },
  {
    path: "#",
    icon: "fa fa-folder-open",
    title: "Laporan",
    is_show: false,
    children: [
      { path: "#", title: "Laporan Time Keeping", is_show: false },
      { path: "#", title: "Laporan Pengajuan Cuti", is_show: false },
      { path: "#", title: "Laporan Kas Bon" },
      { path: "#", title: "Laporan Potongan Lain", is_show: false },
      { path: "#", title: "Laporan Payroll", is_show: false },
      { path: "#", title: "Laporan Pelanggaran Pegawai", is_show: false },
      { path: "#", title: "Laporan Global Payroll", is_show: false },
    ],
  },
];

export default MenuPusat;
