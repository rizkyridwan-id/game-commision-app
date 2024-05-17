const MenuPusat = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Data Master",
    children: [
      { path: "#", title: "Data Pegawai" },
      { path: "#", title: "Data Jabatan" },
      { path: "#", title: "Data Hari Libur Toko" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Parameter",
    children: [
      { path: "#", title: "Bonus Sales" },
      { path: "#", title: "Target Sales" },
      { path: "#", title: "Target Toko" },
      { path: "#", title: "Parameter Cuti" },
      { path: "#", title: "Parameter Konversi CUti" },
      { path: "#", title: "Parameter Shift Kerja" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-business-time",
    title: "Time Keeping",
    children: [
      { path: "#", title: "Time Keeping Kehadiran" },
      { path: "#", title: "Time Keeping Break" },
      { path: "#", title: "Time Keeping Istirahat" },
      { path: "#", title: "Time Keeping Sholat" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-calendar-check",
    title: "Transaksi",
    children: [
      { path: "#", title: "Pengajuan Cuti" },
      { path: "#", title: "Review Cuti" },
      { path: "#", title: "Kas Bon" },
      { path: "#", title: "Potongan Lain" },
      { path: "#", title: "Pelanggaran Pegawai" },
      { path: "#", title: "Payroll" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-folder-open",
    title: "Laporan",
    children: [
      { path: "#", title: "Laporan Time Keeping" },
      { path: "#", title: "Laporan Pengajuan Cuti" },
      { path: "#", title: "Laporan Kas Bon" },
      { path: "#", title: "Laporan Potongan Lain" },
      { path: "#", title: "Laporan Payroll" },
      { path: "#", title: "Laporan Pelanggaran Pegawai" },
      { path: "#", title: "Laporan Global Payroll" },
    ],
  },
  {
    path: "#",
    icon: "fa fa-sliders",
    title: "Utility",
    children: [
      { path: "#", title: "Data User" },
      { path: "#", title: "Hak Akses User" },
    ],
  },
];

export default MenuPusat;
