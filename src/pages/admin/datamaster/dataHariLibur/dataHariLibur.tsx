import { ModalGlobal, PanelContent } from "@/components";
import TableHariLibur from "./table";
import { useAppSelector } from "@/reduxStore";
import FormHariLibur from "./form";
const DataHariLibur = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Data Hari Libur">
      <TableHariLibur />

      <ModalGlobal
        namaForm="FormHariLibur"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormHariLibur />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataHariLibur;
