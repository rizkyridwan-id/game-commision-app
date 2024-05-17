const Menu = [
  {
    path: "/admin/dashboard",
    icon: "fa fa-home",
    title: "Dashboard",
  },
  {
    path: "#",
    icon: "fa fa-database",
    title: "Data Master",
    children: [{ path: "/admin/master-user", title: "Master User" }],
  },
];

export default Menu;
