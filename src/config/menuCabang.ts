const MenuCabang = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
    is_show: false,
  },
  {
    icon: "fa fa-users",
    path: "/app/data-user",
    title: "Data User",
    is_show: false,
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
];

export default MenuCabang;
