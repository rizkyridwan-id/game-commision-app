import { VITE_APP_VERSION } from "@/utils";
import MenuPusat from "./menuPusat";
import MenuCabang from "./menuCabang";
console.log(VITE_APP_VERSION);

export default VITE_APP_VERSION === "PUSAT" ? MenuPusat : MenuCabang;
