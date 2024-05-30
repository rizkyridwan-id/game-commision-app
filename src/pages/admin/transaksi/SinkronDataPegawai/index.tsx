import { PanelContent } from "@/components";
import FormSinkronDataPegawai from "./form";
import TableSinkronDataPegawai from "./table";
const SinkronDataPegawai = () => {
  return (
    <PanelContent title="Sinkron Data Pegawai">
      <FormSinkronDataPegawai />
      <TableSinkronDataPegawai />
    </PanelContent>
  );
};

export default SinkronDataPegawai;
