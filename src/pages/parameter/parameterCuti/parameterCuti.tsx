import { ModalGlobal, PanelContent } from "@/components";
import TableParameterCuti from "./table";
import { useAppSelector } from "@/reduxStore";
import FormCuti from "./form";

const ParameterCuti = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Cuti">
      <TableParameterCuti />
      <ModalGlobal
        namaForm="FormTargetSales"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormCuti />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterCuti;
