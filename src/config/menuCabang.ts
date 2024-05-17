const MenuCabang = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
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
    icon: "fa fa-sliders",
    title: "Utility",
    children: [
      { path: "#", title: "Data User" },
      { path: "#", title: "Hak Akses User" },
    ],
  },
];

export default MenuCabang;
