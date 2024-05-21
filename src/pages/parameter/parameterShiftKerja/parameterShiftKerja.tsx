import { ModalGlobal, PanelContent } from "@/components";
import TableParameterShiftKerja from "./table";
import FormShiftKerja from "./form";
import { useAppSelector } from "@/reduxStore";

const ParameterShiftKerja = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Shift Kerja">
      <TableParameterShiftKerja />
      <ModalGlobal
        namaForm="FormTargetSales"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormShiftKerja />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterShiftKerja;
