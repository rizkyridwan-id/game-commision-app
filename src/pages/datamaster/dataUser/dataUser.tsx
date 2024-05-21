import { ModalGlobal, PanelContent } from "@/components";
import TableDataUser from "./table";
import FormDataUser from "./form";
import { useAppSelector } from "@/reduxStore";

const DataUser = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Data User">
      <TableDataUser />
      <ModalGlobal
        namaForm="FormDataUser"
        title={`${utility.getModal.title}`}
        width={1200}
      >
        <FormDataUser />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataUser;
