import { ModalGlobal, PanelContent } from "@/components";
import TableKasbon from "./table";
import { useAppSelector } from "@/reduxStore";
import FormKasBon from "./from";

const KasBon = () => {
  const utiliy = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Kas Bon">
      <TableKasbon />
      <ModalGlobal
        namaForm="FormMasterKodePabrikan"
        title={`${utiliy.getModal.title}`}
      >
        <FormKasBon />
      </ModalGlobal>
    </PanelContent>
  );
};

export default KasBon;
