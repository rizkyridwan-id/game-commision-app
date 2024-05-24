import { ModalGlobal, PanelContent } from "@/components";
import TableDataJabatan from "./table";
import FormDataJabatan from "./form";
import { useAppSelector } from "@/reduxStore";

const DataJabatan = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Data Jabatan">
      <TableDataJabatan />

      <ModalGlobal
        namaForm="FormDataJabatan"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormDataJabatan />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataJabatan;
