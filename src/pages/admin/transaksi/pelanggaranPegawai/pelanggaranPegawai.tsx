import { ModalGlobal, PanelContent } from "@/components";
import TablePelanggaranPegawai from "./table";
import { useAppSelector } from "@/reduxStore";
import FormPelanggaranPegawai from "./form";

const PelanggaranPegawai = () => {
  const utiliy = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Pelanggaran Pegawai">
      <TablePelanggaranPegawai />
      <ModalGlobal
        namaForm="FormMasterKodePabrikan"
        title={`${utiliy.getModal.title}`}
      >
        <FormPelanggaranPegawai />
      </ModalGlobal>
    </PanelContent>
  );
};

export default PelanggaranPegawai;
