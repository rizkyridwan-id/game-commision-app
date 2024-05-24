import { ModalGlobal, PanelContent } from "@/components";
import TableParameterBonusSales from "./table";
import FormParameterBonus from "./form";
import { useAppSelector } from "@/reduxStore";

const ParameterBonusSales = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Bonus">
      <TableParameterBonusSales />
      <ModalGlobal
        namaForm="FormParameterBonus"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormParameterBonus />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterBonusSales;
