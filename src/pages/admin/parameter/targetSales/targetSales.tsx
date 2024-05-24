import { ModalGlobal, PanelContent } from "@/components";
import TableTargetSales from "./table";
import { useAppSelector } from "@/reduxStore";
import FormTargetSales from "./form";

const ParameterTagetSales = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Target Sales">
      <TableTargetSales />
      <ModalGlobal
        namaForm="FormTargetSales"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormTargetSales />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterTagetSales;
