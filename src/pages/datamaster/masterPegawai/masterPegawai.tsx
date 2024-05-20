import { ModalGlobal, PanelContent } from "@/components";
import TableDataPegawai from "./table";
import { useAppSelector } from "@/reduxStore";
import FormPegawai from "./form";

const MasterPegawai = () => {
  const utiliy = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Master Pegawai">
      <TableDataPegawai />
      <ModalGlobal
        namaForm="FormMasterKodePabrikan"
        title={`${utiliy.getModal.namaForm} Data`}
      >
        <FormPegawai />
      </ModalGlobal>
    </PanelContent>
  );
};

export default MasterPegawai;
