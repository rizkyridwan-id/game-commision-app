import { ModalGlobal, PanelContent } from "@/components";
import TableTargetToko from "./table";
import FormTargetToko from "./form";
import { useAppSelector } from "@/reduxStore";

const ParameterTargetToko = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Target Toko">
      <TableTargetToko />
      <ModalGlobal
        namaForm="FormTargetToko"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormTargetToko />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterTargetToko;
