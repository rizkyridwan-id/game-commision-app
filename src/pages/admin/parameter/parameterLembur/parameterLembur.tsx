import { ModalGlobal, PanelContent } from "@/components";
import TableParameterLembur from "./table";

import FormLembur from "./form";
import { useAppSelector } from "@/reduxStore";

const ParameterLembur = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Lembur">
      <TableParameterLembur />
      <ModalGlobal
        namaForm="FormTargetSales"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormLembur />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterLembur;
