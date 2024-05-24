import { ModalGlobal, PanelContent } from "@/components";
import TableKonversiCuti from "./table";
import { useAppSelector } from "@/reduxStore";
import FormKonversiCuti from "./form";

const ParameterKonversiCuti = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Parameter Konversi Cuti">
      <TableKonversiCuti />
      <ModalGlobal
        namaForm="FormKonversiCuti"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormKonversiCuti />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ParameterKonversiCuti;
