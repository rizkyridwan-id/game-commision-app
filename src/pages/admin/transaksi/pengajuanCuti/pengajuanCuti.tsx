import { ModalGlobal, PanelContent } from "@/components";
import TabelPengajuanCuti from "./table";
import { useAppSelector } from "@/reduxStore";
import FormPengajuanCuti from "./form";

const PengajuanCuti = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Pengajuan Cuti">
      <TabelPengajuanCuti />

      <ModalGlobal
        namaForm="FormTargetToko"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormPengajuanCuti />
      </ModalGlobal>
    </PanelContent>
  );
};

export default PengajuanCuti;
