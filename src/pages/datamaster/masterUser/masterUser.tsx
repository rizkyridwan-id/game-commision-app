import { ModalGlobal, PanelContent } from "@/components";
import TabelMasterUser from "./tabel";
import FormMasterUser from "./form";
import { useAppSelector } from "@/reduxStore";

const MasterUsesr = () => {
  const utiliy = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Master User">
      <TabelMasterUser />
      <ModalGlobal
        title={`${utiliy.getModal.namaForm}`}
        namaForm={"FormMasterUser"}
      >
        <FormMasterUser />
      </ModalGlobal>
    </PanelContent>
  );
};

export default MasterUsesr;
