import { ModalGlobal, PanelContent } from "@/components";
import TabelPotonganLainLain from "./table";
import { useAppSelector } from "@/reduxStore";
import FormPotonganLain from "./form";

const PotonganLainLain = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Potongan Lain Lain">
      <TabelPotonganLainLain />
      <ModalGlobal
        namaForm="FormTargetToko"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormPotonganLain />
      </ModalGlobal>
    </PanelContent>
  );
};

export default PotonganLainLain;
