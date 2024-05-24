import { ModalGlobal, PanelContent } from "@/components";
import TableDataPegawai from "./table";
import { useAppSelector } from "@/reduxStore";
import { ModalFingerPrnit, ModalPegawai } from "./form";

const MasterPegawai = () => {
  const utiliy = useAppSelector((state) => state.utility);
  const fingerPrint = utiliy.getModal.title === "Fingerprint" ? true : false;
  return (
    <PanelContent title="Master Pegawai">
      <TableDataPegawai />
      <ModalGlobal
        namaForm="FormMasterKodePabrikan"
        title={`${utiliy.getModal.title}`}
        width={fingerPrint ? 500 : 1000}
      >
        {fingerPrint ? <ModalFingerPrnit /> : <ModalPegawai />}
      </ModalGlobal>
    </PanelContent>
  );
};

export default MasterPegawai;
