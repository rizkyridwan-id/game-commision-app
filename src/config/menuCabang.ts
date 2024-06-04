const MenuCabang = [
  {
    path: "/app/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
    is_show: true,
  },
  {
    icon: "fa fa-users",
    path: "/app/data-user",
    title: "Data User",
    is_show: false,
  },
  {
    path: "#",
    icon: "fa fa-calendar-check",
    title: "Transaksi",
    is_show: false,
    children: [
      { path: "/app/pengajuan-cuti", title: "Pengajuan Cuti", is_show: false },
      { path: "/app/kas-bon", title: "Kas Bon", is_show: false },
      {
        path: "/app/potongan-lain-lain",
        title: "Potongan Lain Lain",
        is_show: false,
      },
      {
        path: "/app/pelanggaran-pegawai",
        title: "Pelanggaran Pegawai",
        is_show: false,
      },
    ],
  },
];

export default MenuCabang;
