import { ModalGlobal, PanelContent } from "@/components";
import TableDataPegawai from "./table";
import { useAppSelector } from "@/reduxStore";
import { ModalFingerPrnit, ModalPegawai, ModalUpdatePin } from "./form";

const MasterPegawai = () => {
  const utiliy = useAppSelector((state) => state.utility);
  // const fingerPrint = utiliy.getModal.title === "Fingerprint" ? true : false;

  const width =
    utiliy.getModal.title === "Fingerprint" ||
    utiliy.getModal.title === "Update Pin"
      ? 500
      : 1000;
  return (
    <PanelContent title="Master Pegawai">
      <TableDataPegawai />
      <ModalGlobal
        namaForm="FormMasterKodePabrikan"
        title={`${utiliy.getModal.title}`}
        width={width}
      >
        {utiliy.getModal.title === "Fingerprint" ? (
          <ModalFingerPrnit />
        ) : utiliy.getModal.title === "Update Pin" ? (
          <ModalUpdatePin />
        ) : (
          <ModalPegawai />
        )}
      </ModalGlobal>
    </PanelContent>
  );
};

export default MasterPegawai;
