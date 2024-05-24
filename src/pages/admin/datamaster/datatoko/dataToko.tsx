import { ModalGlobal, PanelContent } from "@/components";
import TableDataToko from "./table";
import FormDataToko from "./form";
import { useAppSelector } from "@/reduxStore";

const DataToko = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Data Toko">
      <TableDataToko />

      <ModalGlobal
        namaForm="FormDataToko"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormDataToko />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataToko;
